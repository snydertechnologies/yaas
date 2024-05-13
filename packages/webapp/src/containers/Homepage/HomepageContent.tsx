// @ts-nocheck
import React from 'react';
import AccountsPayableSection from './AccountsPayableSection';
import AccountsReceivableSection from './AccountsReceivableSection';
import FinancialAccountingSection from './FinancialAccountingSection';
import ProductsServicesSection from './ProductsServicesSection';
import '@bigcapital/webapp/style/pages/HomePage/HomePage.scss';

function HomepageContent() {
  return (
    <div className="financial-reports">
      <AccountsReceivableSection />
      <AccountsPayableSection />
      <FinancialAccountingSection />
      <ProductsServicesSection />
    </div>
  );
}

export default HomepageContent;
