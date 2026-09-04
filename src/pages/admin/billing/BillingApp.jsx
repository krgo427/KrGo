import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../config/supabaseClient';
import BillingDashboard from './BillingDashboard';
import InvoiceEditor from './InvoiceEditor';
import BillingSettings from './BillingSettings';
import InvoicePreview from './InvoicePreview';
import { FaFileInvoice, FaCog, FaChartBar } from 'react-icons/fa';
import { getCachedData, setCachedData, invalidateCacheKey, safeSupabaseQuery } from '../../../utils/adminCache';

const STORAGE_KEY_INVOICES = 'krgo_invoices_fallback';
const STORAGE_KEY_SETTINGS = 'krgo_billing_settings';

const BillingApp = () => {
  const cachedInvoices = getCachedData('invoices');
  const cachedSettings = getCachedData('billing_settings');

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, create, edit, settings
  const [invoices, setInvoices] = useState(cachedInvoices || []);
  const [settings, setSettings] = useState(cachedSettings || null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(!cachedInvoices || !cachedSettings);
  
  // Ref for hidden printing
  const printRef = useRef(null);
  const [printingInvoice, setPrintingInvoice] = useState(null);
  
  // Delete Modal state
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!cachedInvoices || !cachedSettings) setIsLoading(true);
    
    try {
      const result = await safeSupabaseQuery(() =>
        Promise.all([
          supabase.from('billing_settings').select('*').limit(1).single(),
          supabase.from('invoices').select('*, invoice_items(*)').or('is_deleted.is.null,is_deleted.eq.false').order('created_at', { ascending: false })
        ]),
        800
      );

      if (result.data) {
        const [settingsRes, invoicesRes] = result.data;
        if (settingsRes?.data) {
          setSettings(settingsRes.data);
          setCachedData('billing_settings', settingsRes.data);
        }
        if (invoicesRes?.data) {
          setInvoices(invoicesRes.data);
          setCachedData('invoices', invoicesRes.data);
        }
      } else {
        const localSettings = getCachedData('billing_settings') || getDefaultSettings();
        setSettings(localSettings);

        const localInvoices = getCachedData('invoices') || [];
        setInvoices(localInvoices);
      }
    } catch (err) {
      console.error("Error loading billing data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultSettings = () => ({
    business_name: 'KrGo Technology Solutions',
    business_address: '',
    business_email: '',
    business_phone: '',
    business_website: 'https://krgo.vercel.app/',
    invoice_prefix: 'KRGO-INV-2026-',
    default_currency: 'INR',
    default_notes: 'Thank you for choosing KrGo Technology Solutions.',
    default_terms: 'Payment is due by the stated due date. Services are provided according to the agreed scope of work.',
  });

  const handleSaveSettings = async (newSettings) => {
    setSettings(newSettings);
    setCachedData('billing_settings', newSettings);
    try {
      const { error } = await supabase.from('billing_settings').upsert(newSettings);
      if (error) throw error;
    } catch (err) {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    }
    alert('Settings saved successfully!');
  };

  const handleSaveInvoice = async (invoiceData) => {
    let savedInvoice = { ...invoiceData };
    
    // Optimistically update state
    if (!savedInvoice.id) {
      savedInvoice.id = 'temp_' + Date.now();
      const newInvoices = [savedInvoice, ...invoices];
      setInvoices(newInvoices);
      setCachedData('invoices', newInvoices);
    } else {
      const newInvoices = invoices.map(i => i.id === savedInvoice.id ? savedInvoice : i);
      setInvoices(newInvoices);
      setCachedData('invoices', newInvoices);
    }

    setActiveTab('dashboard');
    setEditingInvoice(null);
    invalidateCacheKey('dashboard_stats');
    
    // Save to Supabase in background
    try {
      if (savedInvoice.id.toString().startsWith('temp_')) {
        const { items, ...invoiceMeta } = savedInvoice;
        delete invoiceMeta.id;
        const { data: insertedInv, error: err1 } = await supabase.from('invoices').insert([invoiceMeta]).select().single();
        if (err1) throw err1;
        
        if (items && items.length > 0) {
          const itemsToInsert = items.map(item => ({ ...item, invoice_id: insertedInv.id }));
          await supabase.from('invoice_items').insert(itemsToInsert);
        }
      } else {
        const { items, ...invoiceMeta } = savedInvoice;
        const { error: updateErr } = await supabase.from('invoices').update(invoiceMeta).eq('id', invoiceMeta.id);
        if (updateErr) throw updateErr;
        
        await supabase.from('invoice_items').delete().eq('invoice_id', invoiceMeta.id);
        if (items && items.length > 0) {
           const itemsToInsert = items.map(item => ({ ...item, invoice_id: invoiceMeta.id, id: undefined }));
           await supabase.from('invoice_items').insert(itemsToInsert);
        }
      }
      loadData();
    } catch (err) {
      console.log('Falling back to local storage for invoices.', err.message);
      localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(invoices));
    }
  };

  const handleDeleteInvoice = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteConfirmationText('');
  };

  const executeDeleteInvoice = async () => {
    if (!invoiceToDelete) return;

    const targetId = invoiceToDelete.id;
    // Optimistic delete
    const newInvoices = invoices.filter(i => i.id !== targetId);
    setInvoices(newInvoices);
    setCachedData('invoices', newInvoices);
    invalidateCacheKey('trash');
    invalidateCacheKey('dashboard_stats');
    setInvoiceToDelete(null);

    try {
      const { error } = await supabase.from('invoices').update({ is_deleted: true }).eq('id', targetId);
      if (error) throw error;
    } catch (err) {
      localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic status update
    const newInvoices = invoices.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setInvoices(newInvoices);
    setCachedData('invoices', newInvoices);

    try {
      const { error } = await supabase.from('invoices').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
    } catch (err) {
      localStorage.setItem(STORAGE_KEY_INVOICES, JSON.stringify(newInvoices));
    }
  };

  const handlePrint = (invoice) => {
    setPrintingInvoice(invoice);
    // Allow React to render the hidden component before calling print
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintingInvoice(null), 1000); // clear after printing
    }, 200);
  };

  if (isLoading) {
    return <div className="text-white">Loading Billing System...</div>;
  }

  return (
    <div className="min-h-screen relative">
      
      {/* Navigation Tabs - Hidden when printing */}
      <div className="print:hidden mb-8 flex flex-wrap gap-2 border-b border-gray-800 pb-4">
        <button 
          onClick={() => { setActiveTab('dashboard'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaChartBar /> Dashboard
        </button>
        <button 
          onClick={() => { setActiveTab('create'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'create' || activeTab === 'edit' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaFileInvoice /> {activeTab === 'edit' ? 'Edit Invoice' : 'Create Invoice'}
        </button>
        <button 
          onClick={() => { setActiveTab('settings'); setEditingInvoice(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
        >
          <FaCog /> Settings
        </button>
      </div>

      {/* Main Content Area - Hidden when printing */}
      <div className="print:hidden">
        {activeTab === 'dashboard' && (
          <BillingDashboard 
            invoices={invoices} 
            onNavigate={setActiveTab}
            onEdit={(inv) => { setEditingInvoice(inv); setActiveTab('edit'); }}
            onDuplicate={(inv) => { 
              const duplicate = { ...inv, id: undefined, invoice_number: settings?.invoice_prefix + Date.now().toString().slice(-4), status: 'Draft' };
              setEditingInvoice(duplicate); 
              setActiveTab('create'); 
            }}
            onDelete={handleDeleteInvoice}
            onPrint={handlePrint}
            onStatusChange={handleStatusChange}
          />
        )}

        {(activeTab === 'create' || activeTab === 'edit') && (
          <InvoiceEditor 
            initialData={editingInvoice} 
            settings={settings}
            onSave={handleSaveInvoice}
            onCancel={() => { setActiveTab('dashboard'); setEditingInvoice(null); }}
          />
        )}

        {activeTab === 'settings' && (
          <BillingSettings 
            settings={settings} 
            onSave={handleSaveSettings}
          />
        )}
      </div>

      {/* Hidden Print Container - Only visible during window.print() */}
      <div className="hidden print:flex print:justify-center print:w-full print:bg-white print:m-0 print:p-0">
        {printingInvoice && <InvoicePreview ref={printRef} invoice={printingInvoice} settings={settings} />}
      </div>

      {/* Delete Confirmation Modal */}
      {invoiceToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in print:hidden">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Move Invoice to Trash?</h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Move invoice <strong className="text-white">{invoiceToDelete.invoice_number}</strong> to Trash? You can restore it anytime from the Admin Trash Bin.
            </p>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setInvoiceToDelete(null)} 
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDeleteInvoice}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all"
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingApp;
