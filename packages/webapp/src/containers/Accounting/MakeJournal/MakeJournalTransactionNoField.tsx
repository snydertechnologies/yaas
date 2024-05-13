import {
  FFormGroup,
  FInputGroup,
  FieldHint,
  FieldRequiredHint,
  Icon,
  InputPrependButton,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { ControlGroup, Position } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

/**
 * Journal number field of make journal form.
 */
export const MakeJournalTransactionNoField = R.compose(
  withDialogActions,
  withSettings(({ manualJournalsSettings }) => ({
    journalAutoIncrement: manualJournalsSettings?.autoIncrement,
  })),
)(
  ({
    // #withDialog
    openDialog,

    // #withSettings
    journalAutoIncrement,
  }) => {
    const { setFieldValue, values } = useFormikContext();

    const handleJournalNumberChange = () => {
      openDialog('journal-number-form');
    };
    const handleJournalNoBlur = (event) => {
      const newValue = event.target.value;

      if (values.journal_number !== newValue && journalAutoIncrement) {
        openDialog('journal-number-form', {
          initialFormValues: {
            onceManualNumber: newValue,
            incrementMode: 'manual-transaction',
          },
        });
      }
      if (!journalAutoIncrement) {
        setFieldValue('journal_number', newValue);
        setFieldValue('journal_number_manually', newValue);
      }
    };

    return (
      <FFormGroup
        name={'journal_number'}
        label={<T id={'journal_no'} />}
        labelInfo={
          <>
            <FieldRequiredHint />
            <FieldHint />
          </>
        }
        fill={true}
        inline={true}
        fastField={true}
      >
        <ControlGroup fill={true}>
          <FInputGroup
            name={'journal_number'}
            fill={true}
            asyncControl={true}
            onBlur={handleJournalNoBlur}
            fastField={true}
            onChange={() => {}}
          />
          <InputPrependButton
            buttonProps={{
              onClick: handleJournalNumberChange,
              icon: <Icon icon={'settings-18'} />,
            }}
            tooltip={true}
            tooltipProps={{
              content: <T id={'setting_your_auto_generated_journal_number'} />,
              position: Position.BOTTOM_LEFT,
            }}
          />
        </ControlGroup>
      </FFormGroup>
    );
  },
);

MakeJournalTransactionNoField.displayName = 'MakeJournalTransactionNoField';
