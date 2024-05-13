import { DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import {
  Button,
  Classes,
  NavbarDivider,
  NavbarGroup,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import classNames from 'classnames';

import NumberFormatDropdown from '@bigcapital/webapp/components/NumberFormatDropdown';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
import { useCustomersBalanceSummaryContext } from './CustomersBalanceSummaryProvider';
import { CustomerBalanceSummaryExportMenu } from './components';
import withCustomersBalanceSummary from './withCustomersBalanceSummary';
import withCustomersBalanceSummaryActions from './withCustomersBalanceSummaryActions';

/**
 * customer balance summary action bar.
 */
function CustomersBalanceSummaryActionsBar({
  // #ownProps
  numberFormat,
  onNumberFormatSubmit,

  //#withCustomersBalanceSummary
  isFilterDrawerOpen,

  //#withCustomersBalanceSummaryActions
  toggleCustomerBalanceFilterDrawer,

  // #withDialogActions
  openDialog,
}) {
  const { refetch, isCustomersBalanceLoading } = useCustomersBalanceSummaryContext();

  // Handle filter toggle click.
  const handleFilterToggleClick = () => {
    toggleCustomerBalanceFilterDrawer();
  };

  // Handle recalculate the report button.
  const handleRecalcReport = () => {
    refetch();
  };

  // Handle number format form submit.
  const handleNumberFormatSubmit = (values) => {
    saveInvoke(onNumberFormatSubmit, values);
  };

  // Handle the print button click.
  const handlePrintBtnClick = () => {
    openDialog(DialogsName.CustomerBalanceSummaryPdfPreview);
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Button
          className={classNames(Classes.MINIMAL, 'button--gray-highlight')}
          text={<T id={'recalc_report'} />}
          onClick={handleRecalcReport}
          icon={<Icon icon="refresh-16" iconSize={16} />}
        />
        <NavbarDivider />
        <Button
          className={classNames(Classes.MINIMAL, 'button--table-views')}
          icon={<Icon icon="cog-16" iconSize={16} />}
          text={isFilterDrawerOpen ? <T id={'hide_customizer'} /> : <T id={'customize_report'} />}
          onClick={handleFilterToggleClick}
          active={isFilterDrawerOpen}
        />
        <NavbarDivider />
        <Popover
          content={
            <NumberFormatDropdown
              numberFormat={numberFormat}
              onSubmit={handleNumberFormatSubmit}
              submitDisabled={isCustomersBalanceLoading}
            />
          }
          minimal={true}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_LEFT}
        >
          <Button
            className={classNames(Classes.MINIMAL, 'button--filter')}
            text={<T id={'format'} />}
            icon={<Icon icon="numbers" width={23} height={16} />}
          />
        </Popover>

        <Popover
          // content={}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_LEFT}
        >
          <Button
            className={classNames(Classes.MINIMAL, 'button--filter')}
            text={<T id={'filter'} />}
            icon={<Icon icon="filter-16" iconSize={16} />}
          />
        </Popover>

        <NavbarDivider />

        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="print-16" iconSize={16} />}
          text={<T id={'print'} />}
          onClick={handlePrintBtnClick}
        />
        <Popover
          content={<CustomerBalanceSummaryExportMenu />}
          interactionKind={PopoverInteractionKind.CLICK}
          placement="bottom-start"
          minimal
        >
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="file-export-16" iconSize={16} />}
            text={<T id={'export'} />}
          />
        </Popover>
      </NavbarGroup>
    </DashboardActionsBar>
  );
}
export default compose(
  withCustomersBalanceSummary(({ customersBalanceDrawerFilter }) => ({
    isFilterDrawerOpen: customersBalanceDrawerFilter,
  })),
  withCustomersBalanceSummaryActions,
  withDialogActions,
)(CustomersBalanceSummaryActionsBar);
