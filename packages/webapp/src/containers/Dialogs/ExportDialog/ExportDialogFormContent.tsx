// @ts-nocheck
import { FFormGroup, FRadioGroup, FSelect, Group } from '@bigcapital/webapp/components';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Intent, Radio } from '@blueprintjs/core';
import { Form, useFormikContext } from 'formik';
import styles from './ExportDialogContent.module.scss';
import { ExportResources } from './constants';

function ExportDialogFormContentRoot({
  // #withDialogActions
  closeDialog,
}) {
  const { isSubmitting } = useFormikContext();
  const handleCancelBtnClick = () => {
    closeDialog(DialogsName.Export);
  };

  return (
    <Form>
      <div className={styles.root}>
        <p className={styles.paragraph}>You can export data from Bigcapital in CSV or XLSX format</p>

        <FFormGroup name={'resource'} label={'Select Resource'} className={styles.resourceFormGroup}>
          <FSelect name={'resource'} items={ExportResources} popoverProps={{ minimal: true }} />
        </FFormGroup>

        <FRadioGroup label={'Export As'} name={'format'}>
          <Radio value={'xlsx'}>XLSX (Microsoft Excel)</Radio>
          <Radio value={'csv'}>CSV (Comma Seperated Value)</Radio>
        </FRadioGroup>

        <Group position={'right'} spacing={10} className={styles.footer}>
          <Button intent={Intent.NONE} onClick={handleCancelBtnClick}>
            Cancel
          </Button>
          <Button type={'submit'} intent={Intent.PRIMARY} loading={isSubmitting}>
            Export
          </Button>
        </Group>
      </div>
    </Form>
  );
}

export const ExportDialogFormContent = compose(withDialogActions)(ExportDialogFormContentRoot);
