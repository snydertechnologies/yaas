import { DialogContent } from '@bigcapital/webapp/components';
import { useSettingEditSMSNotification, useSettingSMSNotification } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const SMSMessageDialogContext = React.createContext();

/**
 * SMS Message dialog provider.
 */
function SMSMessageDialogProvider({ notificationkey, dialogName, ...props }) {
  // Edit SMS message notification mutations.
  const { mutateAsync: editSMSNotificationMutate } = useSettingEditSMSNotification();

  // SMS notificiation details
  const { data: smsNotification, isLoading: isSMSNotificationLoading } = useSettingSMSNotification(notificationkey);

  //  provider.
  const provider = {
    dialogName,
    smsNotification,
    editSMSNotificationMutate,
  };

  return (
    <DialogContent isLoading={isSMSNotificationLoading}>
      <SMSMessageDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useSMSMessageDialogContext = () => React.useContext(SMSMessageDialogContext);

export { SMSMessageDialogProvider, useSMSMessageDialogContext };
