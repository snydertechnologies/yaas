import { DashboardInsider, For } from '@bigcapital/webapp/components';
import { financialReportMenus } from '@bigcapital/webapp/constants/financialReportsMenu';
// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import useFilterFinancialReports from './FilterFinancialReports';

import '@bigcapital/webapp/style/pages/FinancialStatements/FinancialSheets.scss';

function FinancialReportsItem({ title, desc, link }) {
  return (
    <div className="financial-reports__item">
      <Link className="title" to={link}>
        {title}
      </Link>
      <p className="desc">{desc}</p>
    </div>
  );
}

function FinancialReportsSection({ sectionTitle, reports }) {
  return (
    <div className="financial-reports__section">
      <div className="section-title">{sectionTitle}</div>

      <div className="financial-reports__list">
        <For render={FinancialReportsItem} of={reports} />
      </div>
    </div>
  );
}

/**
 * Financial reports.
 */
export default function FinancialReports() {
  const financialReportMenu = useFilterFinancialReports(financialReportMenus);

  return (
    <DashboardInsider name={'financial-reports'}>
      <div className="financial-reports">
        <For render={FinancialReportsSection} of={financialReportMenu} />
      </div>
    </DashboardInsider>
  );
}
