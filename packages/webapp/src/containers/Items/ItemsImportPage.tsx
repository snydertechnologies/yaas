// @ts-nocheck
import { DashboardInsider } from '@bigcapital/webapp/components';
import { useHistory } from 'react-router-dom';
import { ImportView } from '../Import/ImportView';

export default function ItemsImportpage() {
  const history = useHistory();

  const handleImportSuccess = () => {
    history.push('/items');
  };
  const handleCancelBtnClick = () => {
    history.push('/items');
  };
  return (
    <DashboardInsider name={'import-items'}>
      <ImportView
        resource={'items'}
        onImportSuccess={handleImportSuccess}
        onCancelClick={handleCancelBtnClick}
        exampleTitle="Items Example"
      />
    </DashboardInsider>
  );
}
