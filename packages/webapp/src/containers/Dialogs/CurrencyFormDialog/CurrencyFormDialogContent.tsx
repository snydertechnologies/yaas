// @ts-nocheck
import React from 'react';
import { CurrencyFormProvider } from './CurrencyFormProvider';

import withCurrencyDetail from '@bigcapital/webapp/containers/Currencies/withCurrencyDetail';
import CurrencyForm from './CurrencyForm';

import { compose } from '@bigcapital/webapp/utils';
import '@bigcapital/webapp/style/pages/Currency/CurrencyFormDialog.scss';

function CurrencyFormDialogContent({
  // #ownProp
  action,
  currencyCode,
  dialogName,
}) {
  return (
    <CurrencyFormProvider isEditMode={action} currency={currencyCode} dialogName={dialogName}>
      <CurrencyForm />
    </CurrencyFormProvider>
  );
}

export default compose(withCurrencyDetail)(CurrencyFormDialogContent);
