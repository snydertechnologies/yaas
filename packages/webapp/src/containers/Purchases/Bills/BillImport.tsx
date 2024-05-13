import { DashboardInsider } from '@bigcapital/webapp/components';
import { ImportView } from '@bigcapital/webapp/containers/Import';
// @ts-nocheck
import { useHistory } from 'react-router-dom';

export default function BillsImport() {
  const history = useHistory();

  const handleCancelBtnClick = () => {
    history.push('/bills');
  };
  const handleImportSuccess = () => {
    history.push('/bills');
  };

  return (
    <DashboardInsider name={'import-bills'}>
      <ImportView resource={'bills'} onCancelClick={handleCancelBtnClick} onImportSuccess={handleImportSuccess} />
    </DashboardInsider>
  );
}
