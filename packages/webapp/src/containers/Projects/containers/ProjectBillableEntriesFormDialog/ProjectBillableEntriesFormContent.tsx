// @ts-nocheck

import { Choose } from '@bigcapital/webapp/components';
import { Form } from 'formik';
import React from 'react';
import ProjectBillableEntriesFormFields from './ProjectBillableEntriesFormFields';
import ProjectBillableEntriesFormFloatingActions from './ProjectBillableEntriesFormFloatingActions';
import { useProjectBillableEntriesFormContext } from './ProjectBillableEntriesFormProvider';
import { EmptyStatuCallout } from './utils';

/**
 * Project billable entries form content.
 * @returns
 */
export default function ProjectBillableEntriesFormContent() {
  const { isEmptyStatus } = useProjectBillableEntriesFormContext();
  return (
    <Choose>
      <Choose.When condition={isEmptyStatus}>
        <EmptyStatuCallout />
      </Choose.When>
      <Choose.Otherwise>
        <Form>
          <ProjectBillableEntriesFormFields />
          <ProjectBillableEntriesFormFloatingActions />
        </Form>
      </Choose.Otherwise>
    </Choose>
  );
}
