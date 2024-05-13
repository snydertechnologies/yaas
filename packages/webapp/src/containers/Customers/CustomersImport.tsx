// @ts-nocheck
import { DashboardInsider } from '@bigcapital/webapp/components';
import { useHistory } from 'react-router-dom';
import { ImportView } from '../Import/ImportView';

export default function CustomersImport() {
  const history = useHistory();

  const handleImportSuccess = () => {
    history.push('/customers');
  };
  const handleCancelBtnClick = () => {
    history.push('/customers');
  };
  return (
    <DashboardInsider name={'import-customers'}>
      <ImportView
        resource={'customers'}
        onImportSuccess={handleImportSuccess}
        onCancelClick={handleCancelBtnClick}
        exampleTitle="Customers Example"
      />
    </DashboardInsider>
  );
}
