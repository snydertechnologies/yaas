import { Card } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import ContactDetailActionsBar from './ContactDetailActionsBar';
import ContactDetailList from './ContactDetailList';

/**
 * contact detail.
 */
export default function ContactDetail() {
  return (
    <div className="view-detail-drawer">
      <ContactDetailActionsBar />
      <Card>
        <ContactDetailList />
      </Card>
    </div>
  );
}
