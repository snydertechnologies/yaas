import { AbilitySubject, CustomerAction } from '@bigcapital/webapp/constants/abilityOption';
// @ts-nocheck
import intl from 'react-intl-universal';

import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { RESOURCES_TYPES } from '@bigcapital/webapp/constants/resourcesTypes';

function CustomerUniversalSearchSelectComponent({
  resourceType,
  resourceId,
  onAction,

  // #withDrawerActions
  openDrawer,
}) {
  if (resourceType === RESOURCES_TYPES.CUSTOMER) {
    openDrawer(DRAWERS.CUSTOMER_DETAILS, { customerId: resourceId });
    onAction && onAction();
  }
  return null;
}

const CustomerUniversalSearchSelectAction = withDrawerActions(CustomerUniversalSearchSelectComponent);

/**
 * Transformes customers to search.
 * @param {*} contact
 * @returns
 */
const customersToSearch = (contact) => ({
  id: contact.id,
  text: contact.display_name,
  label: contact.formatted_balance,
  reference: contact,
});

/**
 * Binds universal search invoice configure.
 */
export const universalSearchCustomerBind = () => ({
  resourceType: RESOURCES_TYPES.CUSTOMER,
  optionItemLabel: intl.get('customers'),
  selectItemAction: CustomerUniversalSearchSelectAction,
  itemSelect: customersToSearch,
  permission: {
    ability: CustomerAction.View,
    subject: AbilitySubject.Customer,
  },
});
