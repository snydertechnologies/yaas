import { DialogContent } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useAccounts, useBranches, useCreateRefundVendorCredit, useVendorCredit } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { pick } from 'lodash';
// @ts-nocheck
import React from 'react';

const RefundVendorCreditContext = React.createContext();

function RefundVendorCreditFormProvider({ vendorCreditId, dialogName, query, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();
  const isBranchFeatureCan = featureCan(Features.Branches);

  // Handle fetch accounts data.
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts();

  // Fetches the branches list.
  const {
    data: branches,
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches(query, { enabled: isBranchFeatureCan });

  // Handle fetch vendor credit details.
  const { data: vendorCredit, isLoading: isVendorCreditLoading } = useVendorCredit(vendorCreditId, {
    enabled: !!vendorCreditId,
  });

  // Create refund vendor credit mutations.
  const { mutateAsync: createRefundVendorCreditMutate } = useCreateRefundVendorCredit();

  // State provider.
  const provider = {
    vendorCredit: {
      ...pick(vendorCredit, ['id', 'credits_remaining', 'currency_code']),
      amount: vendorCredit.credits_remaining,
    },
    accounts,
    branches,
    dialogName,
    isBranchesSuccess,
    createRefundVendorCreditMutate,
  };

  return (
    <DialogContent isLoading={isAccountsLoading || isVendorCreditLoading || isBranchesLoading}>
      <RefundVendorCreditContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useRefundVendorCreditContext = () => React.useContext(RefundVendorCreditContext);

export { RefundVendorCreditFormProvider, useRefundVendorCreditContext };
