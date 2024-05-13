// @ts-nocheck
import intl from 'react-intl-universal';

import { AbilitySubject, VendorAction } from '@bigcapital/webapp/constants/abilityOption';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';
import withDrawerActions from '../Drawer/withDrawerActions';

/**
 * Vendor univesal search item select action.
 */
function VendorUniversalSearchSelectComponent({
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.VENDOR) {
    openDrawer(DRAWERS.VENDOR_DETAILS, { vendorId: resourceId });
    onAction && onAction();
  }
  return null;
}

const VendorUniversalSearchSelectAction = withDrawerActions(VendorUniversalSearchSelectComponent);

/**
 * Transformes vendor resource item to search.
 */
const vendorToSearch = (contact) => ({
  id: contact.id,
  text: contact.display_name,
  label: contact.formatted_balance,
  reference: contact,
});

/**
 * Binds universal search invoice configure.
 */
export const universalSearchVendorBind = () => ({
  resourceType: RESOURCES_TYPES.VENDOR,
  optionItemLabel: intl.get('vendors'),
  selectItemAction: VendorUniversalSearchSelectAction,
  itemSelect: vendorToSearch,
  permission: {
    ability: VendorAction.View,
    subject: AbilitySubject.Vendor,
  },
});
