import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useVendor } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const VendorDetailDrawerContext = React.createContext();

/**
 * Contact detail provider.
 */
function VendorDetailsDrawerProvider({ vendorId, ...props }) {
  // Handle fetch vendor details.
  const { data: vendor, isLoading: isVendorLoading } = useVendor(vendorId, {
    enabled: !!vendorId,
  });
  // Provider.
  const provider = {
    vendor,
    vendorId,
    isVendorLoading,
  };

  return (
    <DrawerLoading loading={isVendorLoading}>
      <DrawerHeaderContent name={DRAWERS.VENDOR_DETAILS} title={vendor?.display_name} />
      <VendorDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useVendorDetailsDrawerContext = () => React.useContext(VendorDetailDrawerContext);

export { VendorDetailsDrawerProvider, useVendorDetailsDrawerContext };
