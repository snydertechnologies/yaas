import { DialogContent } from '@bigcapital/webapp/components';
import { usePaymentReceiveDefaultOptions } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext } from 'react';

interface PaymentMailDialogBootValues {
  paymentReceiveId: number;
  mailOptions: any;
}

const PaymentMailDialogBootContext = createContext<PaymentMailDialogBootValues>();

interface PaymentMailDialogBootProps {
  paymentReceiveId: number;
  redirectToPaymentsList: boolean;
  children: React.ReactNode;
}

/**
 * Payment mail dialog boot provider.
 */
function PaymentMailDialogBoot({ paymentReceiveId, ...props }: PaymentMailDialogBootProps) {
  const { data: mailOptions, isLoading: isMailOptionsLoading } = usePaymentReceiveDefaultOptions(paymentReceiveId);

  const provider = {
    mailOptions,
    isMailOptionsLoading,
    paymentReceiveId,
    redirectToPaymentsList,
  };

  return (
    <DialogContent isLoading={isMailOptionsLoading}>
      <PaymentMailDialogBootContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const usePaymentMailDialogBoot = () => React.useContext<PaymentMailDialogBootValues>(PaymentMailDialogBootContext);

export { PaymentMailDialogBoot, usePaymentMailDialogBoot };
