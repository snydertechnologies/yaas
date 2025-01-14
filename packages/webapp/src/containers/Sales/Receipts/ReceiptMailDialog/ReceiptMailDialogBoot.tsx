import { DialogContent } from '@bigcapital/webapp/components';
import { useSaleReceiptDefaultOptions } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext } from 'react';

interface ReceiptMailDialogBootValues {
  receiptId: number;
  mailOptions: any;
  redirectToReceiptsList: boolean;
}

const ReceiptMailDialogBootContext = createContext<ReceiptMailDialogBootValues>();

interface ReceiptMailDialogBootProps {
  receiptId: number;
  children: React.ReactNode;
  redirectToReceiptsList?: boolean;
}

/**
 * Receipt mail dialog boot provider.
 */
function ReceiptMailDialogBoot({ receiptId, redirectToReceiptsList = false, ...props }: ReceiptMailDialogBootProps) {
  const { data: mailOptions, isLoading: isMailOptionsLoading } = useSaleReceiptDefaultOptions(receiptId);

  const provider = {
    saleReceiptId: receiptId,
    mailOptions,
    isMailOptionsLoading,
    redirectToReceiptsList,
  };

  return (
    <DialogContent isLoading={isMailOptionsLoading}>
      <ReceiptMailDialogBootContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useReceiptMailDialogBoot = () => React.useContext<ReceiptMailDialogBootValues>(ReceiptMailDialogBootContext);

export { ReceiptMailDialogBoot, useReceiptMailDialogBoot };
