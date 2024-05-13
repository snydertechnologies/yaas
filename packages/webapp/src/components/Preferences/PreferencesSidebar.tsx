import { FormattedMessage as T } from '@bigcapital/webapp/components';
import preferencesMenu from '@bigcapital/webapp/constants/preferencesMenu';
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PreferencesSidebarContainer from './PreferencesSidebarContainer';

import '@bigcapital/webapp/style/pages/Preferences/Sidebar.scss';

/**
 * Preferences sidebar.
 */
export default function PreferencesSidebar() {
  const history = useHistory();
  const location = useLocation();

  const items = preferencesMenu.map((item) =>
    item.divider ? (
      <MenuDivider title={item.title} />
    ) : (
      <MenuItem
        active={item.href && item.href === location.pathname}
        text={item.text}
        label={item.label}
        disabled={item.disabled}
        onClick={() => {
          history.push(item.href);
        }}
      />
    ),
  );

  return (
    <PreferencesSidebarContainer>
      <div className="preferences-sidebar__head">
        <h2>{<T id={'preferences'} />}</h2>
      </div>

      <Menu className="preferences-sidebar__menu">{items}</Menu>
    </PreferencesSidebarContainer>
  );
}
