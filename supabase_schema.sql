-- Supabase Schema for KrGo Invoice Generator
-- Run this in your Supabase SQL Editor

-- 1. Create Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_number VARCHAR(255) NOT NULL UNIQUE,
    invoice_date DATE NOT NULL,
    due_date DATE,
    status VARCHAR(50) DEFAULT 'Pending',
    
    -- Client Info (Stored directly so past invoices don't change if client changes)
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
    
    -- Tax (For future proofing, currently disabled in UI)
    tax_type VARCHAR(50),
    tax_rate DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    
    -- Additional text
    notes TEXT,
    terms TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Invoice Items Table
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

-- 3. Create Settings Table
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
    
    -- Tax Configuration (Hidden/Disabled by default)
    gst_enabled BOOLEAN DEFAULT FALSE,
    gstin VARCHAR(50),
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Note: Ensure you have a public.clients table already. 
-- If not, here is a basic schema for it:
/*
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
*/
