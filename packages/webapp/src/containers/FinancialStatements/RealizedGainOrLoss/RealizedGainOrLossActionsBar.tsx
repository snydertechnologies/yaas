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

import withRealizedGainOrLoss from './withRealizedGainOrLoss';
import withRealizedGainOrLossActions from './withRealizedGainOrLossActions';

import { compose, saveInvoke } from '@bigcapital/webapp/utils';

/**
 * Realized Gain or Loss actions bar.
 */
function RealizedGainOrLossActionsBar({
  //#withRealizedGainOrLoss
  isFilterDrawerOpen,

  //#withRealizedGainOrLossActions
  toggleRealizedGainOrLossFilterDrawer,

  //#ownProps
  numberFormat,
  onNumberFormatSubmit,
}) {
  // Handle filter toggle click.
  const handleFilterToggleClick = () => {
    toggleRealizedGainOrLossFilterDrawer();
  };

  // Handle recalculate report button.
  const handleRecalculateReport = () => {};

  // handle number format form submit.
  const handleNumberFormatSubmit = (values) => saveInvoke(onNumberFormatSubmit, values);

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <Button
          className={classNames(Classes.MINIMAL, 'button--gray-highlight')}
          text={<T id={'recalc_report'} />}
          onClick={handleRecalculateReport}
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
              submitDisabled={false}
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

        <Button
          className={classNames(Classes.MINIMAL, 'button--filter')}
          text={<T id={'filter'} />}
          icon={<Icon icon="filter-16" iconSize={16} />}
        />
        <NavbarDivider />

        <Button className={Classes.MINIMAL} icon={<Icon icon="print-16" iconSize={16} />} text={<T id={'print'} />} />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withRealizedGainOrLoss(({ realizedGainOrLossDrawerFilter }) => ({
    isFilterDrawerOpen: realizedGainOrLossDrawerFilter,
  })),
  withRealizedGainOrLossActions,
)(RealizedGainOrLossActionsBar);
