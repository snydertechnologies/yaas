import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withUniversalSearchActions from '@bigcapital/webapp/containers/UniversalSearch/withUniversalSearchActions';
import { getDashboardRoutes } from '@bigcapital/webapp/routes/dashboard';
// @ts-nocheck
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useHistory } from 'react-router-dom';

import { compose } from '@bigcapital/webapp/utils';

function GlobalHotkeys({
  // #withDashboardActions
  toggleSidebarExpand,

  // withUniversalSearchActions
  openGlobalSearch,

  // #withDialogActions
  openDialog,
}) {
  const history = useHistory();
  const routes = getDashboardRoutes();

  const globalHotkeys = routes
    .filter(({ hotkey }) => hotkey)
    .map(({ hotkey }) => hotkey)
    .toString();

  const handleSidebarToggleBtn = () => {
    toggleSidebarExpand();
  };
  useHotkeys(
    globalHotkeys,
    (event, handle) => {
      routes.map(({ path, hotkey }) => {
        if (handle.key === hotkey) {
          history.push(path);
        }
      });
    },
    [history],
  );
  useHotkeys('ctrl+/', () => {
    handleSidebarToggleBtn();
  });
  useHotkeys('shift+d', () => {
    openDialog('money-in', {});
  });
  useHotkeys('shift+q', () => {
    openDialog('money-out', {});
  });
  useHotkeys('/', () => {
    setTimeout(() => {
      openGlobalSearch();
    }, 0);
  });

  return <div></div>;
}

export default compose(withDashboardActions, withDialogActions, withUniversalSearchActions)(GlobalHotkeys);
