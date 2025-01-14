import {
  FFormGroup,
  FInputGroup,
  FieldRequiredHint,
  Icon,
  InputPrependButton,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { ControlGroup, Position } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

/**
 * Invoice number field of invoice form.
 */
export const InvoiceFormInvoiceNumberField = R.compose(
  withDialogActions,
  withSettings(({ invoiceSettings }) => ({
    invoiceAutoIncrement: invoiceSettings?.autoIncrement,
  })),
)(
  ({
    // #withDialogActions
    openDialog,

    // #withSettings
    invoiceAutoIncrement,
  }) => {
    // Formik context.
    const { values, setFieldValue } = useFormikContext();

    // Handle invoice number changing.
    const handleInvoiceNumberChange = () => {
      openDialog(DialogsName.InvoiceNumberSettings);
    };
    // Handle invoice no. field blur.
    const handleInvoiceNoBlur = (event) => {
      const newValue = event.target.value;

      // Show the confirmation dialog if the value has changed and auto-increment
      // mode is enabled.
      if (values.invoice_no !== newValue && invoiceAutoIncrement) {
        openDialog(DialogsName.InvoiceNumberSettings, {
          initialFormValues: {
            onceManualNumber: newValue,
            incrementMode: 'manual-transaction',
          },
        });
      }
      // Setting the invoice number to the form will be manually in case
      // auto-increment is disable.
      if (!invoiceAutoIncrement) {
        setFieldValue('invoice_no', newValue);
        setFieldValue('invoice_no_manually', newValue);
      }
    };

    return (
      <FFormGroup
        name={'invoice_no'}
        label={<T id={'invoice_no'} />}
        labelInfo={<FieldRequiredHint />}
        inline={true}
        fastField={true}
      >
        <ControlGroup fill={true}>
          <FInputGroup
            name={'invoice_no'}
            minimal={true}
            asyncControl={true}
            onBlur={handleInvoiceNoBlur}
            onChange={() => {}}
          />
          <InputPrependButton
            buttonProps={{
              onClick: handleInvoiceNumberChange,
              icon: <Icon icon={'settings-18'} />,
            }}
            tooltip={true}
            tooltipProps={{
              content: <T id={'setting_your_auto_generated_invoice_number'} />,
              position: Position.BOTTOM_LEFT,
            }}
          />
        </ControlGroup>
      </FFormGroup>
    );
  },
);
InvoiceFormInvoiceNumberField.displayName = 'InvoiceFormInvoiceNumberField';
