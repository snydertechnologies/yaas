import { Dragzone, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

/**
 * Vendor Attachment Tab.
 */
function VendorAttachmentTab() {
  return (
    <div>
      <Dragzone initialFiles={[]} onDrop={null} onDeleteFile={[]} hint={<T id={'attachments_maximum'} />} />
    </div>
  );
}

export default VendorAttachmentTab;
