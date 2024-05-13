// @ts-nocheck
import { Button, Menu, Popover, Position } from '@blueprintjs/core';

import { Icon } from '@bigcapital/webapp/components';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { useAuthenticatedAccount } from '@bigcapital/webapp/hooks/query';
import { compose, firstLettersArgs } from '@bigcapital/webapp/utils';

// Popover modifiers.
const POPOVER_MODIFIERS = {
  offset: { offset: '28, 8' },
};

/**
 * Sideabr head.
 */
function SidebarHeadJSX({
  // #withCurrentOrganization
  organization,
}) {
  // Retrieve authenticated user information.
  const { data: user } = useAuthenticatedAccount();

  return (
    <div className="sidebar__head">
      <div className="sidebar__head-organization">
        <Popover
          modifiers={POPOVER_MODIFIERS}
          boundary={'window'}
          content={
            <Menu className={'menu--dashboard-organization'}>
              <div className="org-item">
                <div className="org-item__logo">{firstLettersArgs(...(organization.name || '').split(' '))} </div>
                <div className="org-item__name">{organization.name}</div>
              </div>
            </Menu>
          }
          position={Position.BOTTOM}
          minimal={true}
        >
          <Button className="title" rightIcon={<Icon icon={'caret-down-16'} size={16} />}>
            {organization.name}
          </Button>
        </Popover>
        <span className="subtitle">{user.full_name}</span>
      </div>

      <div className="sidebar__head-logo">
        <Icon icon={'mini-bigcapital'} width={28} height={28} className="bigcapital--alt" />
      </div>
    </div>
  );
}

export const SidebarHead = compose(withCurrentOrganization(({ organization }) => ({ organization })))(SidebarHeadJSX);
