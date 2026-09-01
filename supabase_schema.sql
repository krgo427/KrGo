-- Supabase Schema & Migration for KrGo Platform
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

-- 1. Create / Update Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(20),
    gstin VARCHAR(50),
    notes TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Add is_deleted and extra profile columns if table already exists
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS pincode VARCHAR(20);
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS gstin VARCHAR(50);
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- 2. Create / Update Contact Requests Table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'unread',
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.contact_requests ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- 3. Create / Update Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number VARCHAR(255) NOT NULL UNIQUE,
    invoice_date DATE NOT NULL,
    due_date DATE,
    status VARCHAR(50) DEFAULT 'Pending',
    
    -- Client Info
    client_name VARCHAR(255),
    client_company VARCHAR(255),
    client_email VARCHAR(255),
    client_phone VARCHAR(255),
    client_address TEXT,
    
    -- Project details
    project_name VARCHAR(255),
    reference_number VARCHAR(255),
    
    -- Financials
    currency VARCHAR(10) DEFAULT 'INR',
    subtotal DECIMAL(12,2) DEFAULT 0,
    discount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    advance_payment DECIMAL(12,2) DEFAULT 0,
    balance_due DECIMAL(12,2) DEFAULT 0,
    
    -- Tax
    tax_type VARCHAR(50),
    tax_rate DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    
    -- Additional text
    notes TEXT,
    terms TEXT,
    
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- 4. Create Invoice Items Table
CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity DECIMAL(10,2) DEFAULT 1,
    rate DECIMAL(12,2) DEFAULT 0,
    amount DECIMAL(12,2) DEFAULT 0,
    sort_order INTEGER DEFAULT 0
);

-- 5. Create Settings Table
CREATE TABLE IF NOT EXISTS public.billing_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Business Profile
    business_name VARCHAR(255) DEFAULT 'KrGo Technology Solutions',
    business_address TEXT,
    business_email VARCHAR(255),
    business_phone VARCHAR(255),
    business_website VARCHAR(255) DEFAULT 'https://krgo.vercel.app/',
    
    -- Invoice Defaults
    invoice_prefix VARCHAR(50) DEFAULT 'KRGO-INV-2026-',
    default_currency VARCHAR(10) DEFAULT 'INR',
    default_notes TEXT DEFAULT 'Thank you for choosing KrGo Technology Solutions.',
    default_terms TEXT DEFAULT 'Payment is due by the stated due date. Services are provided according to the agreed scope of work.',
    
    -- Payment Details
    bank_name VARCHAR(255),
    account_holder VARCHAR(255),
    account_number VARCHAR(255),
    ifsc_code VARCHAR(255),
    upi_id VARCHAR(255),
    
    -- Tax Configuration
    gst_enabled BOOLEAN DEFAULT FALSE,
    gstin VARCHAR(50),
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ======================================================
-- 🧹 OPTIONAL: DATABASE CLEANUP SCRIPT (UNCOMMENT TO RESET DATA)
-- ======================================================
-- DELETE FROM public.contact_requests;
-- DELETE FROM public.clients;
-- DELETE FROM public.invoice_items;
-- DELETE FROM public.invoices;
