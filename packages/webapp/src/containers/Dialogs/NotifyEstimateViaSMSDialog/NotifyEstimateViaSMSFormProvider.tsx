import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateNotifyEstimateBySMS, useEstimateSMSDetail } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const NotifyEstimateViaSMSContext = React.createContext();

function NotifyEstimateViaSMSFormProvider({ estimateId, dialogName, ...props }) {
  const { data: estimateSMSDetail, isLoading: isEstimateSMSDetailLoading } = useEstimateSMSDetail(estimateId, {
    enabled: !!estimateId,
  });

  // Create notfiy estimate by sms mutations.
  const { mutateAsync: createNotifyEstimateBySMSMutate } = useCreateNotifyEstimateBySMS();

  // State provider.
  const provider = {
    estimateId,
    dialogName,
    estimateSMSDetail,
    createNotifyEstimateBySMSMutate,
  };

  return (
    <DialogContent isLoading={isEstimateSMSDetailLoading}>
      <NotifyEstimateViaSMSContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useEstimateViaSMSContext = () => React.useContext(NotifyEstimateViaSMSContext);

export { NotifyEstimateViaSMSFormProvider, useEstimateViaSMSContext };
