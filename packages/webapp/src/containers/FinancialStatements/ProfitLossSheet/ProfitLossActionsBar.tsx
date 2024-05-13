import { DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
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
// @ts-nocheck
import React from 'react';

import NumberFormatDropdown from '@bigcapital/webapp/components/NumberFormatDropdown';

import withProfitLoss from './withProfitLoss';
import withProfitLossActions from './withProfitLossActions';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
import { useProfitLossSheetContext } from './ProfitLossProvider';
import { ProfitLossSheetExportMenu } from './components';

/**
 * Profit/Loss sheet actions bar.
 */
function ProfitLossActionsBar({
  // #withProfitLoss
  profitLossDrawerFilter,

  // #withProfitLossActions
  toggleProfitLossFilterDrawer: toggleFilterDrawer,

  // #withDialogActions
  openDialog,

  // #ownProps
  numberFormat,
  onNumberFormatSubmit,
}) {
  const { sheetRefetch, isLoading } = useProfitLossSheetContext();

  const handleFilterClick = () => {
    toggleFilterDrawer();
  };

  const handleRecalcReport = () => {
    sheetRefetch();
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (values) => {
    saveInvoke(onNumberFormatSubmit, values);
  };
  // Handles the print button click.
  const handlePrintBtnClick = () => {
    openDialog(DialogsName.ProfitLossSheetPdfPreview);
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
          text={profitLossDrawerFilter ? <T id={'hide_customizer'} /> : <T id={'customize_report'} />}
          onClick={handleFilterClick}
          active={profitLossDrawerFilter}
        />
        <NavbarDivider />

        <Popover
          content={
            <NumberFormatDropdown
              numberFormat={numberFormat}
              onSubmit={handleNumberFormatSubmit}
              submitDisabled={isLoading}
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

        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="print-16" iconSize={16} />}
          text={<T id={'print'} />}
          onClick={handlePrintBtnClick}
        />
        <Popover
          content={<ProfitLossSheetExportMenu />}
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
  withProfitLoss(({ profitLossDrawerFilter }) => ({ profitLossDrawerFilter })),
  withProfitLossActions,
  withDialogActions,
)(ProfitLossActionsBar);
