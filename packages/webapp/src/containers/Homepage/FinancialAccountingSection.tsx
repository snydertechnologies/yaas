import { financialAccounting } from '@bigcapital/webapp/constants/homepageOptions';
// @ts-nocheck
import React from 'react';
import ShortcutBoxesSection from './ShortcutBoxesSection';

export default function FinancialAccountingSection() {
  return <ShortcutBoxesSection section={financialAccounting} />;
}
