import { DashboardInsider } from '@bigcapital/webapp/components';
import { ImportView } from '@bigcapital/webapp/containers/Import';
// @ts-nocheck
import { useHistory } from 'react-router-dom';

export default function EstimatesImport() {
  const history = useHistory();

  const handleCancelBtnClick = () => {
    history.push('/estimates');
  };
  const handleImportSuccess = () => {
    history.push('/estimates');
  };

  return (
    <DashboardInsider name={'import-accounts'}>
      <ImportView
        resource={'sale_estimate'}
        onCancelClick={handleCancelBtnClick}
        onImportSuccess={handleImportSuccess}
      />
    </DashboardInsider>
  );
}
