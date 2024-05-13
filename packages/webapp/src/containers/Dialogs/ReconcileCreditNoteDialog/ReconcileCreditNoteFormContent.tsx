import { Choose } from '@bigcapital/webapp/components';
import { Form } from 'formik';
// @ts-nocheck
import React from 'react';

import ReconcileCreditNoteFormFields from './ReconcileCreditNoteFormFields';
import ReconcileCreditNoteFormFloatingActions from './ReconcileCreditNoteFormFloatingActions';
import { useReconcileCreditNoteContext } from './ReconcileCreditNoteFormProvider';
import { EmptyStatuCallout } from './utils';

/**
 * Reconcile credit note form content.
 */
export default function ReconcileCreditNoteFormContent() {
  const { isEmptyStatus } = useReconcileCreditNoteContext();
  return (
    <Choose>
      <Choose.When condition={isEmptyStatus}>
        <EmptyStatuCallout />
      </Choose.When>
      <Choose.Otherwise>
        <Form>
          <ReconcileCreditNoteFormFields />
          <ReconcileCreditNoteFormFloatingActions />
        </Form>
      </Choose.Otherwise>
    </Choose>
  );
}
