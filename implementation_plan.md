# Implementation Plan - Admin Client Portal Enhancements & Trash/Restore System

This plan outlines the implementation for simplifying client request collection, expanding client profiling for invoicing, auto-filling invoices with editable client data, database cleanup, and implementing a Soft Delete Trash/Recycle Bin system with restore and authenticated permanent deletion.

## User Review Required

> [!IMPORTANT]
> **Key Architectural Decisions & Authentication:**
> 1. **Soft Delete System**: Items deleted in Requests, Clients, or Invoices will be marked as deleted (`is_deleted: true` or `deleted_at`) and moved to a central **Admin Trash / Bin** instead of permanent removal.
> 2. **Restore Capability**: Any deleted item in the Trash can be restored back to its active tab with 1-click.
> 3. **Authentication on Permanent Deletion**: Permanent deletion from Trash will require entering an Admin Passcode (default: `ADMIN123` or `DELETE`).
> 4. **Database Schema Update**: We will add `is_deleted` (boolean, default false) columns to `contact_requests`, `clients`, and `invoices` tables in Supabase.

---

## Open Questions

> [!NOTE]
> 1. **Default Admin Security Passcode**: We plan to set the authentication passcode for permanent deletion to **`ADMIN123`**. Would you like a custom passcode?
> 2. **Database Clean-up**: Do you want to purge all existing test data currently in Supabase `contact_requests`, `clients`, and `invoices` tables to start completely fresh?

---

## Proposed Changes

### 1. Client Contact Request Form
#### [MODIFY] [Contact.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/components/Contact.jsx)
- Ensure the public contact form collects only essential basic info: **Name**, **Email**, **Phone**, and **Message / Project Need**.

---

### 2. Admin Requests & Client Onboarding
#### [MODIFY] [Requests.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/Requests.jsx)
- When a request is accepted by the team (after calling the client), create a client record in `clients` with basic details and mark request status.
- Update delete functionality to perform **Soft Delete** (`is_deleted = true`), moving the request to the Trash bin.

---

### 3. Expanded Client Management & Full Profiles
#### [MODIFY] [Clients.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/Clients.jsx)
- Support full client profiles: Name, Company, Email, Phone, Address, City/State/Pincode, GSTIN/Tax ID, and Notes.
- Add an **Edit Client** modal to update full client details after calling them.
- Support adding clients manually with complete info.
- Update client deletion to perform **Soft Delete** (`is_deleted = true`).

---

### 4. Invoice Generator Auto-Fill & Editability
#### [MODIFY] [InvoiceEditor.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/billing/InvoiceEditor.jsx)
- Fetch active clients from Supabase (`clients` table).
- Add a **"Select Saved Client"** dropdown at the top of Client Details in `InvoiceEditor.jsx`.
- When selected, auto-fill `client_name`, `client_company`, `client_email`, `client_phone`, and `client_address`.
- Keep all fields 100% editable for custom modifications.

---

### 5. Central Admin Trash / Recycle Bin & Authentication
#### [NEW] [Trash.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/Trash.jsx)
- A dedicated **Trash / Recycle Bin** page in the Admin Portal.
- Tabs for **Deleted Requests**, **Deleted Clients**, and **Deleted Invoices**.
- **Restore Button**: Restores item back to active lists (`is_deleted = false`).
- **Permanent Delete Button**: Requires entering the Admin Authentication Security Passcode (`ADMIN123`) to permanently remove from Supabase.

#### [MODIFY] [AdminLayout.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/AdminLayout.jsx) & [App.jsx](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/App.jsx)
- Add "Trash / Bin" to the Admin sidebar navigation with badge count of trashed items.

---

### 6. Database Migration & Cleanup Script
#### [MODIFY] [supabase_schema.sql](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/supabase_schema.sql)
- Add SQL migration statements to add `is_deleted` (BOOLEAN DEFAULT FALSE) to `contact_requests`, `clients`, and `invoices`.
- Script to clear existing test/dummy data if confirmed.

---

## Verification Plan

### Manual Verification
1. **Submit Basic Request**: Submit a contact form request with basic info (Name, Email, Phone, Message) from website.
2. **Accept & Transfer Request**: In Admin Requests, click Accept. Verify basic client created.
3. **Complete Client Details**: In Admin Clients, edit client profile and add full billing address & company info.
4. **Auto-Fill Invoice**: Open Invoice Generator, select the client from dropdown. Confirm all fields fill automatically and remain editable.
5. **Soft Delete & Trash**: Delete a request, a client, and an invoice. Verify they disappear from main lists and appear in Trash Bin.
6. **Restore & Authentication**:
   - Test 1-click **Restore** on a trashed item. Verify it returns to main list.
   - Test **Permanent Delete** with wrong passcode (verify rejection) and correct passcode `ADMIN123` (verify permanent removal).
