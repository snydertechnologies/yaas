import { DashboardInsider } from '@bigcapital/webapp/components';
import { ImportView } from '@bigcapital/webapp/containers/Import';
// @ts-nocheck
import { useHistory } from 'react-router-dom';

export default function PaymentsReceiveImport() {
  const history = useHistory();

  const handleCancelBtnClick = () => {
    history.push('/payment-receives');
  };
  const handleImportSuccess = () => {
    history.push('/payment-receives');
  };

  return (
    <DashboardInsider name={'import-accounts'}>
      <ImportView
        resource={'payment_receive'}
        onCancelClick={handleCancelBtnClick}
        onImportSuccess={handleImportSuccess}
      />
    </DashboardInsider>
  );
}
