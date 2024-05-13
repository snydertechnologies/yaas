import { Alignment, Button, Classes, Intent, NavbarDivider, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { useHistory } from 'react-router-dom';

import {
  AdvancedFilterPopover,
  Can,
  DashboardActionViewsList,
  DashboardActionsBar,
  DashboardFilterButton,
  DashboardRowsHeightButton,
  Icon,
  If,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';

import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';
import withPaymentMade from './withPaymentMade';
import withPaymentMadeActions from './withPaymentMadeActions';

import { AbilitySubject, PaymentMadeAction } from '@bigcapital/webapp/constants/abilityOption';
import { useRefreshPaymentMades } from '@bigcapital/webapp/hooks/query/paymentMades';
import { usePaymentMadesListContext } from './PaymentMadesListProvider';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Payment made actions bar.
 */
function PaymentMadeActionsBar({
  // #withPaymentMadesActions
  setPaymentMadesTableState,

  // #withPaymentMades
  paymentMadesFilterConditions,

  // #withSettings
  paymentMadesTableSize,

  // #withDialogActions
  openDialog,

  // #withSettingsActions
  addSetting,
}) {
  const history = useHistory();

  // Payment receives list context.
  const { paymentMadesViews, fields } = usePaymentMadesListContext();

  // Payment receive refresh action.
  const { refresh } = useRefreshPaymentMades();

  // Handle new payment made button click.
  const handleClickNewPaymentMade = () => {
    history.push('/payment-mades/new');
  };

  // Handle tab changing.
  const handleTabChange = (viewSlug) => {
    setPaymentMadesTableState({ viewSlug });
  };

  // Handle click a refresh payment receives.
  const handleRefreshBtnClick = () => {
    refresh();
  };

  // Handle table row size change.
  const handleTableRowSizeChange = (size) => {
    addSetting('billPayments', 'tableSize', size);
  };

  // Handle the import button click.
  const handleImportBtnClick = () => {
    history.push('/payment-mades/import');
  };

  // Handle the export button click.
  const handleExportBtnClick = () => {
    openDialog(DialogsName.Export, { resource: 'bill_payment' });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <DashboardActionViewsList resourceName={'bill_payments'} views={paymentMadesViews} onChange={handleTabChange} />
        <NavbarDivider />
        <Can I={PaymentMadeAction.Create} a={AbilitySubject.PaymentMade}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'plus'} />}
            text={<T id={'new_payment_made'} />}
            onClick={handleClickNewPaymentMade}
          />
        </Can>
        <AdvancedFilterPopover
          advancedFilterProps={{
            conditions: paymentMadesFilterConditions,
            defaultFieldKey: 'payment_number',
            fields: fields,
            onFilterChange: (filterConditions) => {
              setPaymentMadesTableState({ filterRoles: filterConditions });
            },
          }}
        >
          <DashboardFilterButton conditionsCount={paymentMadesFilterConditions.length} />
        </AdvancedFilterPopover>

        <If condition={false}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            // onClick={handleBulkDelete}
          />
        </If>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'print-16'} iconSize={'16'} />}
          text={<T id={'print'} />}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'file-import-16'} />}
          text={<T id={'import'} />}
          onClick={handleImportBtnClick}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'file-export-16'} iconSize={'16'} />}
          text={<T id={'export'} />}
          onClick={handleExportBtnClick}
        />

        <NavbarDivider />
        <DashboardRowsHeightButton initialValue={paymentMadesTableSize} onChange={handleTableRowSizeChange} />
        <NavbarDivider />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="refresh-16" iconSize={14} />}
          onClick={handleRefreshBtnClick}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withPaymentMadeActions,
  withSettingsActions,
  withPaymentMade(({ paymentMadesTableState }) => ({
    paymentMadesFilterConditions: paymentMadesTableState.filterRoles,
  })),
  withSettings(({ billPaymentSettings }) => ({
    paymentMadesTableSize: billPaymentSettings?.tableSize,
  })),
  withDialogActions,
)(PaymentMadeActionsBar);
