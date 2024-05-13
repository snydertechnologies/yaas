import {
  FFormGroup,
  FInputGroup,
  Icon,
  InputPrependButton,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { ControlGroup, Position } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

/**
 * Estimate number field of estimate form.
 */
export const EstimateFormEstimateNumberField = R.compose(
  withDialogActions,
  withSettings(({ estimatesSettings }) => ({
    estimateNextNumber: estimatesSettings?.nextNumber,
    estimateNumberPrefix: estimatesSettings?.numberPrefix,
    estimateAutoIncrement: estimatesSettings?.autoIncrement,
  })),
)(
  ({
    // #withDialogActions
    openDialog,

    // #withSettings
    estimateAutoIncrement,
  }) => {
    const { values, setFieldValue } = useFormikContext();

    const handleEstimateNumberBtnClick = () => {
      openDialog('estimate-number-form', {});
    };
    // Handle estimate no. field blur.
    const handleEstimateNoBlur = (event) => {
      const newValue = event.target.value;

      // Show the confirmation dialog if the value has changed and auto-increment
      // mode is enabled.
      if (values.estimate_number !== newValue && estimateAutoIncrement) {
        openDialog('estimate-number-form', {
          initialFormValues: {
            onceManualNumber: newValue,
            incrementMode: 'manual-transaction',
          },
        });
      }
      // Setting the estimate number to the form will be manually in case
      // auto-increment is disable.
      if (!estimateAutoIncrement) {
        setFieldValue('estimate_number', newValue);
        setFieldValue('estimate_number_manually', newValue);
      }
    };

    return (
      <FFormGroup name={'estimate_number'} label={<T id={'estimate'} />} inline={true}>
        <ControlGroup fill={true}>
          <FInputGroup
            name={'estimate_number'}
            minimal={true}
            asyncControl={true}
            onBlur={handleEstimateNoBlur}
            onChange={() => {}}
          />
          <InputPrependButton
            buttonProps={{
              onClick: handleEstimateNumberBtnClick,
              icon: <Icon icon={'settings-18'} />,
            }}
            tooltip={true}
            tooltipProps={{
              content: <T id={'setting_your_auto_generated_estimate_number'} />,
              position: Position.BOTTOM_LEFT,
            }}
          />
        </ControlGroup>
      </FFormGroup>
    );
  },
);

EstimateFormEstimateNumberField.displayName = 'EstimateFormEstimateNumberField';
