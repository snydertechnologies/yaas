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

import { DashboardActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { compose } from '@bigcapital/webapp/utils';
import { useGeneralLedgerContext } from './GeneralLedgerProvider';
import { GeneralLedgerSheetExportMenu } from './components';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withGeneralLedger from './withGeneralLedger';
import withGeneralLedgerActions from './withGeneralLedgerActions';

/**
 * General ledger - Actions bar.
 */
function GeneralLedgerActionsBar({
  // #withGeneralLedger
  isFilterDrawerOpen,

  // #withGeneralLedgerActions
  toggleGeneralLedgerFilterDrawer: toggleDisplayFilterDrawer,

  // #withDialogActions
  openDialog,
}) {
  const { sheetRefresh } = useGeneralLedgerContext();

  // Handle customize button click.
  const handleCustomizeClick = () => {
    toggleDisplayFilterDrawer();
  };

  // Handle re-calculate button click.
  const handleRecalcReport = () => {
    sheetRefresh();
  };

  // Handle the print button click.
  const handlePrintBtnClick = () => {
    openDialog(DialogsName.GeneralLedgerPdfPreview);
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
          onClick={handleCustomizeClick}
          active={isFilterDrawerOpen}
        />
        <NavbarDivider />

        <Popover interactionKind={PopoverInteractionKind.CLICK} position={Position.BOTTOM_LEFT}>
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
          content={<GeneralLedgerSheetExportMenu />}
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
  withGeneralLedger(({ generalLedgerFilterDrawer }) => ({
    isFilterDrawerOpen: generalLedgerFilterDrawer,
  })),
  withGeneralLedgerActions,
  withDialogActions,
)(GeneralLedgerActionsBar);
