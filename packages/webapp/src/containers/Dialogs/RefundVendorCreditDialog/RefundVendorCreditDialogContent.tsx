// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/RefundVendorCredit/RefundVendorCredit.scss';

import RefundVendorCreditForm from './RefundVendorCreditForm';
import { RefundVendorCreditFormProvider } from './RefundVendorCreditFormProvider';

export default function RefundVendorCreditDialogContent({
  // #ownProps
  dialogName,
  vendorCreditId,
}) {
  return (
    <RefundVendorCreditFormProvider vendorCreditId={vendorCreditId} dialogName={dialogName}>
      <RefundVendorCreditForm />
    </RefundVendorCreditFormProvider>
  );
}
