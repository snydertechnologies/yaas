import { Features } from '@bigcapital/webapp/constants';
import {
  useBranches,
  useContact,
  useCreateVendor,
  useCurrencies,
  useEditVendor,
  useVendor,
} from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { omit } from 'lodash';
// @ts-nocheck
import React, { useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';

const VendorFormContext = createContext();

/**
 * Vendor form provider.
 */
function VendorFormProvider({ query, vendorId, ...props }) {
  const { state } = useLocation();
  const contactId = state?.action;

  // Features guard.
  const { featureCan } = useFeatureCan();
  const isBranchFeatureCan = featureCan(Features.Branches);

  // Handle fetch Currencies data table
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  // Handle fetch vendor details.
  const { data: vendor, isLoading: isVendorLoading } = useVendor(vendorId, {
    enabled: !!vendorId,
  });

  // Handle fetch contact duplicate details.
  const { data: contactDuplicate, isLoading: isContactLoading } = useContact(contactId, { enabled: !!contactId });

  // Fetches the branches list.
  const {
    data: branches,
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches(query, { enabled: isBranchFeatureCan });

  // Create and edit vendor mutations.
  const { mutateAsync: createVendorMutate } = useCreateVendor();
  const { mutateAsync: editVendorMutate } = useEditVendor();

  // Form submit payload.
  const [submitPayload, setSubmitPayload] = useState({});

  // determines whether the form new or duplicate mode.
  const isNewMode = contactId || !vendorId;

  const isFormLoading = isVendorLoading || isContactLoading || isCurrenciesLoading || isBranchesLoading;

  const provider = {
    vendorId,
    currencies,
    vendor,
    branches,
    contactDuplicate: { ...omit(contactDuplicate, ['opening_balance_at']) },
    submitPayload,

    isNewMode,
    isFormLoading,
    isBranchesSuccess,

    createVendorMutate,
    editVendorMutate,
    setSubmitPayload,
  };

  return <VendorFormContext.Provider value={provider} {...props} />;
}

const useVendorFormContext = () => React.useContext(VendorFormContext);

export { VendorFormProvider, useVendorFormContext };
