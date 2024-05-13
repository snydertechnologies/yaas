import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

export default function PreferencesSidebarContainer({ children }) {
  return (
    <div className={classNames(CLASSES.PREFERENCES_PAGE_SIDEBAR, CLASSES.PREFERENCES_SIDEBAR)}>
      <div className="preferences-sidebar__wrapper">
        <Scrollbar noDefaultStyles={true}>
          <div className="preferences-sidebar__inner">{children}</div>
        </Scrollbar>
      </div>
    </div>
  );
}
