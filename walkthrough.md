# Walkthrough - Client Workflow & Trash/Restore System

We have successfully implemented all requested client management workflows, invoice auto-fill capabilities, database schema updates, and a soft-delete Trash system with passcode-authenticated permanent deletion.

---

## 🛠️ Summary of Key Changes

### 1. Basic Request Collection & Onboarding Flow
- **Request Form**: Contact form ([`src/components/Contact.jsx`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/components/Contact.jsx)) collects basic information (Name, Email, Phone, Project Type/Message).
- **Request Acceptance**: When a team member accepts a request in [`Requests.jsx`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/Requests.jsx), a client profile is automatically initialized with the lead's basic info.

### 2. Full Client Profile Management
- **Complete Profiles**: [`Clients.jsx`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/Clients.jsx) now supports full billing details (Street Address, City, State, Pincode, GSTIN, Company Name, Email, Phone, and Internal Notes).
- **Post-Call Edit Modal**: After calling the client, team members can click **Edit Profile** to fill in complete billing information.
- **Manual Addition**: Allows adding new clients directly with full information.

### 3. Invoice Auto-Fill with Editable Inputs
- **Saved Client Selector**: In [`InvoiceEditor.jsx`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/src/pages/admin/billing/InvoiceEditor.jsx), selecting a client from the new **"Select Saved Client"** dropdown automatically populates `client_name`, `client_company`, `client_email`, `client_phone`, and formatted `client_address`.
- **100% Editable**: All filled fields remain editable for custom adjustments.

### 4. Admin Trash / Recycle Bin & Passcode Protection
- **Soft Delete**: Deleting a Request, Client, or Invoice moves it to the **Trash Bin** (`is_deleted: true`) instead of deleting it immediately.
- **1-Click Restore**: Trashed items can be restored back to active lists with a single click.
- **Passcode Protection for Permanent Deletion**: Permanently purging an item from the Trash Bin requires entering the **Admin Passcode** (`ADMIN123`).

### 5. Database Migration SQL
- Updated [`supabase_schema.sql`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/supabase_schema.sql) with SQL statements to add `is_deleted` and extra client profile fields.

---

## 📋 Database Setup Instructions

To apply the database updates to your Supabase instance:
1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** tab.
3. Copy and run the contents of [`supabase_schema.sql`](file:///c:/Users/LENOVO/OneDrive/Desktop/krgo/supabase_schema.sql).

*(Optional Database Cleanup: Uncomment the `DELETE FROM` lines at the bottom of `supabase_schema.sql` if you want to wipe test data to start fresh).*

---

## 🔍 How to Test

1. **Test Request & Acceptance**:
   - Submit a test request on the public website.
   - Go to `/admin/requests` and click **Accept**.
2. **Complete Client Profile**:
   - Go to `/admin/clients`, click the **Edit** icon on the new client, and add full billing address & GSTIN.
3. **Generate Invoice**:
   - Go to `/admin/billing`, click **New Invoice**.
   - Select your client from the **"Select Saved Client"** dropdown. Verify all fields auto-fill and remain editable.
4. **Test Soft Delete & Restore**:
   - Click **Delete** on a request, client, or invoice.
   - Confirm it moves to `/admin/trash`.
   - Click **Restore** to bring it back to active view.
   - Click **Permanent Delete** and verify that it prompts for the passcode (`ADMIN123`).
