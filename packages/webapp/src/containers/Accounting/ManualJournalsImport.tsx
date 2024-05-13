// @ts-nocheck
import { DashboardInsider } from '@bigcapital/webapp/components';
import { useHistory } from 'react-router-dom';
import { ImportView } from '../Import/ImportView';

export default function ManualJournalsImport() {
  const history = useHistory();

  const handleCancelBtnClick = () => {
    history.push('/manual-journals');
  };
  const handleImportSuccess = () => {
    history.push('/manual-journals');
  };

  return (
    <DashboardInsider name={'import-manual-journals'}>
      <ImportView
        resource={'manual-journals'}
        onCancelClick={handleCancelBtnClick}
        onImportSuccess={handleImportSuccess}
      />
    </DashboardInsider>
  );
}
