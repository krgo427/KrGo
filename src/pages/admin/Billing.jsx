import React from 'react';
import BillingApp from './billing/BillingApp';

// This file simply wraps the new BillingApp mini-SaaS so we don't have to 
// change routing inside App.jsx or AdminLayout.jsx
const Billing = () => {
  return (
    <div className="w-full">
      <BillingApp />
    </div>
  );
};

export default Billing;
