// @ts-nocheck
import { DashboardInsider } from '@bigcapital/webapp/components';
import { ImportView } from '../Import/ImportView';

export default function ItemsImport() {
  return (
    <DashboardInsider name={'import-items'}>
      <ImportView resource={'items'} />
    </DashboardInsider>
  );
}
