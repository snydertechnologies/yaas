import { Classes, FormGroup, InputGroup, Position } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import classNames from 'classnames';
import { ErrorMessage, FastField, useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { FeatureCan, FormattedMessage as T } from '@bigcapital/webapp/components';
import { FFormGroup, FieldRequiredHint, Icon, VendorDrawerLink, VendorsSelect } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';

import { Features } from '@bigcapital/webapp/constants';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { ProjectsSelect } from '@bigcapital/webapp/containers/Projects/components';
import { compose, handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { useBillFormContext } from './BillFormProvider';
import { BillExchangeRateInputField, BillProjectSelectButton } from './components';
import { vendorsFieldShouldUpdate } from './utils';

/**
 * Fill form header.
 */
function BillFormHeader() {
  // Bill form context.
  const { vendors, projects } = useBillFormContext();

  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER_FIELDS)}>
      {/* ------- Vendor name ------ */}
      <BillFormVendorField />

      {/* ----------- Exchange rate ----------- */}
      <BillExchangeRateInputField name={'exchange_rate'} formGroupProps={{ label: ' ', inline: true }} />

      {/* ------- Bill date ------- */}
      <FastField name={'bill_date'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'bill_date'} />}
            inline={true}
            labelInfo={<FieldRequiredHint />}
            className={classNames(CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="bill_date" />}
          >
            <DateInput
              {...momentFormatter('YYYY/MM/DD')}
              value={tansformDateValue(value)}
              onChange={handleDateChange((formattedDate) => {
                form.setFieldValue('bill_date', formattedDate);
              })}
              popoverProps={{ position: Position.BOTTOM, minimal: true }}
              inputProps={{ leftIcon: <Icon icon={'date-range'} /> }}
            />
          </FormGroup>
        )}
      </FastField>

      {/* ------- Due date ------- */}
      <FastField name={'due_date'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'due_date'} />}
            inline={true}
            className={classNames('form-group--due-date', 'form-group--select-list', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="due_date" />}
          >
            <DateInput
              {...momentFormatter('YYYY/MM/DD')}
              value={tansformDateValue(value)}
              onChange={handleDateChange((formattedDate) => {
                form.setFieldValue('due_date', formattedDate);
              })}
              popoverProps={{ position: Position.BOTTOM, minimal: true }}
              inputProps={{
                leftIcon: <Icon icon={'date-range'} />,
              }}
            />
          </FormGroup>
        )}
      </FastField>

      {/* ------- Bill number ------- */}
      <FastField name={'bill_number'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'bill_number'} />}
            inline={true}
            className={('form-group--bill_number', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="bill_number" />}
          >
            <InputGroup minimal={true} {...field} />
          </FormGroup>
        )}
      </FastField>

      {/* ------- Reference ------- */}
      <FastField name={'reference_no'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference'} />}
            inline={true}
            className={classNames('form-group--reference', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference" />}
          >
            <InputGroup minimal={true} {...field} />
          </FormGroup>
        )}
      </FastField>

      {/*------------ Project name -----------*/}
      <FeatureCan feature={Features.Projects}>
        <FFormGroup
          name={'project_id'}
          label={<T id={'bill.project_name.label'} />}
          inline={true}
          className={classNames('form-group--select-list', Classes.FILL)}
        >
          <ProjectsSelect name={'project_id'} projects={projects} input={BillProjectSelectButton} popoverFill={true} />
        </FFormGroup>
      </FeatureCan>
    </div>
  );
}

/**
 * Vendor select field of bill form.
 * @returns {JSX.Element}
 */
function BillFormVendorField() {
  const { values, setFieldValue } = useFormikContext();
  const { vendors } = useBillFormContext();

  return (
    <FFormGroup
      name={'vendor_id'}
      label={<T id={'vendor_name'} />}
      inline={true}
      labelInfo={<FieldRequiredHint />}
      fastField={true}
      shouldUpdate={vendorsFieldShouldUpdate}
      shouldUpdateDeps={{ items: vendors }}
    >
      <VendorsSelect
        name={'vendor_id'}
        items={vendors}
        placeholder={<T id={'select_vender_account'} />}
        onItemChange={(contact) => {
          setFieldValue('vendor_id', contact.id);
          setFieldValue('currency_code', contact?.currency_code);
        }}
        allowCreate={true}
        fastField={true}
        shouldUpdate={vendorsFieldShouldUpdate}
        shouldUpdateDeps={{ items: vendors }}
      />
      {values.vendor_id && (
        <VendorButtonLink vendorId={values.vendor_id}>
          <T id={'view_vendor_details'} />
        </VendorButtonLink>
      )}
    </FFormGroup>
  );
}

export default compose(withDialogActions)(BillFormHeader);

const VendorButtonLink = styled(VendorDrawerLink)`
  font-size: 11px;
  margin-top: 6px;
`;
