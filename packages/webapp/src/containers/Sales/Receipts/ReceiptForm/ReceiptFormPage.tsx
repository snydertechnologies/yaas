// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';

import '@bigcapital/webapp/style/pages/SaleReceipt/PageForm.scss';

import { AutoExchangeRateProvider } from '@bigcapital/webapp/containers/Entries/AutoExchangeProvider';
import ReceiptFrom from './ReceiptForm';
import { ReceiptFormProvider } from './ReceiptFormProvider';

/**
 * Receipt form page.
 */
export default function ReceiptFormPage() {
  const { id } = useParams();
  const idInt = parseInt(id, 10);

  return (
    <ReceiptFormProvider receiptId={idInt}>
      <AutoExchangeRateProvider>
        <ReceiptFrom />
      </AutoExchangeRateProvider>
    </ReceiptFormProvider>
  );
}
