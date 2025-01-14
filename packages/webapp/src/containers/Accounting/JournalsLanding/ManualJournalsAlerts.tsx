// @ts-nocheck
import React from 'react';

const JournalDeleteAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/ManualJournals/JournalDeleteAlert'),
);
const JournalPublishAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/ManualJournals/JournalPublishAlert'),
);

/**
 * Manual journals alerts.
 */

export default [
  { name: 'journal-delete', component: JournalDeleteAlert },
  { name: 'journal-publish', component: JournalPublishAlert },
];
