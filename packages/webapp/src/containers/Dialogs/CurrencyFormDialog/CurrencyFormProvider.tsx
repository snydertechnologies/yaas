import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateCurrency, useEditCurrency } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext } from 'react';

const CurrencyFormContext = createContext();

/**
 * Currency Form page provider.
 */
function CurrencyFormProvider({ isEditMode, currency, dialogName, ...props }) {
  // Create and edit item currency mutations.
  const { mutateAsync: createCurrencyMutate } = useCreateCurrency();
  const { mutateAsync: editCurrencyMutate } = useEditCurrency();

  // Provider state.
  const provider = {
    createCurrencyMutate,
    editCurrencyMutate,
    dialogName,
    currency,
    isEditMode,
  };

  return (
    <DialogContent name={'currency-form'}>
      <CurrencyFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useCurrencyFormContext = () => React.useContext(CurrencyFormContext);

export { CurrencyFormProvider, useCurrencyFormContext };
