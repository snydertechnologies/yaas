import { DialogContent } from '@bigcapital/webapp/components';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { useTaxRate } from '@bigcapital/webapp/hooks/query/taxRates';
// @ts-nocheck
import React from 'react';

const TaxRateFormDialogContext = React.createContext();

interface TaxRateFormDialogBootProps {
  taxRateId: number;
  children?: JSX.Element;
}

interface TaxRateFormDialogBootContext {
  taxRateId: number;
  taxRate: any;
  isTaxRateLoading: boolean;
  isTaxRateSuccess: boolean;
  isNewMode: boolean;
}

/**
 * Money in dialog provider.
 */
function TaxRateFormDialogBoot({ taxRateId, ...props }: TaxRateFormDialogBootProps) {
  const {
    data: taxRate,
    isLoading: isTaxRateLoading,
    isSuccess: isTaxRateSuccess,
  } = useTaxRate(taxRateId, {
    enabled: !!taxRateId,
  });

  const isNewMode = !taxRateId;

  // Provider data.
  const provider = {
    taxRateId,
    taxRate,
    isTaxRateLoading,
    isTaxRateSuccess,
    isNewMode,
    dialogName: DialogsName.TaxRateForm,
  };
  const isLoading = isTaxRateLoading;

  return (
    <DialogContent isLoading={isLoading}>
      <TaxRateFormDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useTaxRateFormDialogContext = () => React.useContext<TaxRateFormDialogBootContext>(TaxRateFormDialogContext);

export { TaxRateFormDialogBoot, useTaxRateFormDialogContext };
