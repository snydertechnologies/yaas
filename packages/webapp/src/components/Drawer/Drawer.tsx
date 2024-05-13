import { Drawer, Position } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Drawer.scss';

import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { compose } from '@bigcapital/webapp/utils';
import { DrawerProvider } from './DrawerProvider';

/**
 * Drawer component.
 */
function DrawerComponent(props) {
  const { name, children, onClose, closeDrawer } = props;

  const handleClose = (event) => {
    closeDrawer(name);
    onClose && onClose(event);
  };

  return (
    <Drawer
      size={'700px'}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
      position={Position.RIGHT}
      onClose={handleClose}
      portalClassName={'drawer-portal'}
      {...props}
    >
      <DrawerProvider {...props}>{children}</DrawerProvider>
    </Drawer>
  );
}

const DrawerRoot = compose(withDrawerActions)(DrawerComponent);
export { DrawerRoot as Drawer };
