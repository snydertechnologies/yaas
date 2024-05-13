import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import WarehouseTransferFormHeaderFields from './WarehouseTransferFormHeaderFields';

/**
 * Warehose transfer form header section.
 */
function WarehouseTransferFormHeader() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <WarehouseTransferFormHeaderFields />
    </div>
  );
}

export default WarehouseTransferFormHeader;
