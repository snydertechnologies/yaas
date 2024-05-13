import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, H4, Icon } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { compose } from '@bigcapital/webapp/utils';
import styled from 'styled-components';

/**
 * Drawer header content.
 */
function DrawerHeaderContentRoot(props) {
  const { icon, title = <T id={'view_paper'} />, subTitle, onClose, name, closeDrawer } = props;

  if (title == null) {
    return null;
  }

  const handleClose = (event) => {
    closeDrawer(name);
    onClose && onClose(event);
  };

  return (
    <div className={Classes.DRAWER_HEADER}>
      <Icon icon={icon} iconSize={Icon.SIZE_LARGE} />
      <H4>
        {title}
        <SubTitle>{subTitle}</SubTitle>
      </H4>

      <Button
        aria-label="Close"
        className={Classes.DIALOG_CLOSE_BUTTON}
        icon={<Icon icon="small-cross" iconSize={Icon.SIZE_LARGE} />}
        minimal={true}
        onClick={handleClose}
      />
    </div>
  );
}

export const DrawerHeaderContent = compose(withDrawerActions)(DrawerHeaderContentRoot);

/**
 * SubTitle Drawer header.
 * @returns {React.JSX}
 */
function SubTitle({ children }) {
  if (children == null) {
    return null;
  }

  return <SubTitleHead>{children}</SubTitleHead>;
}

const SubTitleHead = styled.div`
  color: #666;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  padding: 2px 0px;
  margin: 2px 0px;
`;
