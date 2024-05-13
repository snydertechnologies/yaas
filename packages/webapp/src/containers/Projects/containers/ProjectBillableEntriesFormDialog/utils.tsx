import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Callout, Classes, Intent } from '@blueprintjs/core';
import moment from 'moment';
// @ts-nocheck
import React from 'react';

/**
 * Empty status callout.
 * @returns {React.JSX}
 */
export function EmptyStatuCallout() {
  return (
    <div className={Classes.DIALOG_BODY}>
      <Callout intent={Intent.PRIMARY}>
        <p>
          <T id={'project_billable_entries.alert.there_is_no_billable_entries'} />
        </p>
      </Callout>
    </div>
  );
}
