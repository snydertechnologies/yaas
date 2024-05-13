// @ts-nocheck

import {
  FDateInput,
  FFormGroup,
  FInputGroup,
  FieldRequiredHint,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { Classes, Position } from '@blueprintjs/core';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';
import { ProjectBillableTypeSuggestField } from '../../components';
import { billableTypeOption } from '../common';
import { useProjectBillableEntriesFormContext } from './ProjectBillableEntriesFormProvider';
import { BillableEntiresBox, ProjectRowDivider } from './components';

/**
 * Project billable entries form fields.
 * @returns
 */
export default function ProjectBillableEntriesFormFields() {
  // Formik context.
  const { values } = useFormikContext();

  const { billableEntries } = useProjectBillableEntriesFormContext();

  return (
    <div className={Classes.DIALOG_BODY}>
      {/*------------ Filter by Date -----------*/}
      <FFormGroup
        name={'date'}
        label={<T id={'project_billable_entries.dialog.filter_by_date'} />}
        labelInfo={<FieldRequiredHint />}
        className={classNames(CLASSES.FILL, 'form-group--date')}
      >
        <FDateInput
          {...momentFormatter('YYYY/MM/DD')}
          name="date"
          formatDate={(date) => date.toLocaleString()}
          popoverProps={{
            position: Position.BOTTOM,
            minimal: true,
          }}
        />
      </FFormGroup>

      <ProjectRowDivider />

      {/*------------ Filter by Type -----------*/}
      <FFormGroup
        name={'billableType'}
        label={<T id={'project_billable_entries.dialog.filter_by_type'} />}
        labelInfo={<FieldRequiredHint />}
      >
        <ProjectBillableTypeSuggestField
          billableType={billableTypeOption}
          // onBillableTypeSelected={()=>}
        />
      </FFormGroup>

      <BillableEntiresBox billableEntries={billableEntries} />
    </div>
  );
}
