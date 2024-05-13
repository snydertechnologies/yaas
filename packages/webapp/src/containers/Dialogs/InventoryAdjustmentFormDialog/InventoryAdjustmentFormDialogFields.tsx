import { FormattedMessage as T } from '@bigcapital/webapp/components';
import {
  AccountsSuggestField,
  BranchSelect,
  BranchSelectButton,
  Col,
  FeatureCan,
  FieldRequiredHint,
  ListSelect,
  Row,
  WarehouseSelect,
} from '@bigcapital/webapp/components';
import { CLASSES, Features } from '@bigcapital/webapp/constants';
import { useAutofocus } from '@bigcapital/webapp/hooks';
import {
  handleDateChange,
  inputIntent,
  momentFormatter,
  tansformDateValue,
  toSafeNumber,
} from '@bigcapital/webapp/utils';
import { Classes, FormGroup, InputGroup, Position, TextArea } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import classNames from 'classnames';
import { ErrorMessage, FastField, Field } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { useInventoryAdjContext } from './InventoryAdjustmentFormProvider';

import InventoryAdjustmentQuantityFields from './InventoryAdjustmentQuantityFields';
import {
  diffQuantity,
  useGetAdjustmentTypeOptions,
  useSetPrimaryBranchToForm,
  useSetPrimaryWarehouseToForm,
} from './utils';

/**
 * Inventory adjustment form dialogs fields.
 */
export default function InventoryAdjustmentFormDialogFields() {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Retrieves memorized adjustment types options.
  const adjustmentTypes = useGetAdjustmentTypeOptions();

  const dateFieldRef = useAutofocus();

  // Inventory adjustment dialog context.
  const { accounts, branches, warehouses } = useInventoryAdjContext();

  // Sets the primary warehouse to form.
  useSetPrimaryWarehouseToForm();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Row>
        <FeatureCan feature={Features.Branches}>
          <Col xs={5}>
            <FormGroup label={<T id={'branch'} />} className={classNames('form-group--select-list', Classes.FILL)}>
              <BranchSelect
                name={'branch_id'}
                branches={branches}
                input={BranchSelectButton}
                popoverProps={{ minimal: true }}
              />
            </FormGroup>
          </Col>
        </FeatureCan>
        <FeatureCan feature={Features.Warehouses}>
          <Col xs={5}>
            <FormGroup label={<T id={'warehouse'} />} className={classNames('form-group--select-list', Classes.FILL)}>
              <WarehouseSelect name={'warehouse_id'} warehouses={warehouses} popoverProps={{ minimal: true }} />
            </FormGroup>
          </Col>
        </FeatureCan>
      </Row>

      {featureCan(Features.Warehouses) && featureCan(Features.Branches) && <FeatureRowDivider />}

      <Row>
        <Col xs={5}>
          {/*------------ Date -----------*/}
          <FastField name={'date'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'date'} />}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="date" />}
                minimal={true}
                className={classNames(CLASSES.FILL, 'form-group--date')}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('date', formattedDate);
                  })}
                  value={tansformDateValue(value)}
                  popoverProps={{
                    position: Position.BOTTOM,
                    minimal: true,
                  }}
                  intent={inputIntent({ error, touched })}
                  inputRef={(ref) => (dateFieldRef.current = ref)}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>

        <Col xs={5}>
          {/*------------ Adjustment type -----------*/}
          <Field name={'type'}>
            {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'adjustment_type'} />}
                labelInfo={<FieldRequiredHint />}
                helperText={<ErrorMessage name="type" />}
                intent={inputIntent({ error, touched })}
                className={classNames(CLASSES.FILL, 'form-group--type')}
              >
                <ListSelect
                  items={adjustmentTypes}
                  onItemSelect={(type) => {
                    const result = diffQuantity(
                      toSafeNumber(values.quantity),
                      toSafeNumber(values.quantity_on_hand),
                      type.value,
                    );
                    setFieldValue('type', type.value);
                    setFieldValue('new_quantity', result);
                  }}
                  filterable={false}
                  selectedItem={value}
                  selectedItemProp={'value'}
                  textProp={'name'}
                  popoverProps={{ minimal: true }}
                  intent={inputIntent({ error, touched })}
                />
              </FormGroup>
            )}
          </Field>
        </Col>
      </Row>

      <InventoryAdjustmentQuantityFields />

      {/*------------ Adjustment account -----------*/}
      <FastField name={'adjustment_account_id'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'adjustment_account'} />}
            labelInfo={<FieldRequiredHint />}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="adjustment_account_id" />}
            className={'form-group--adjustment-account'}
          >
            <AccountsSuggestField
              accounts={accounts}
              onAccountSelected={({ id }) => form.setFieldValue('adjustment_account_id', id)}
              inputProps={{
                placeholder: intl.get('select_adjustment_account'),
                intent: inputIntent({ error, touched }),
              }}
            />
          </FormGroup>
        )}
      </FastField>

      {/*------------ Reference -----------*/}
      <FastField name={'reference_no'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference_no'} />}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference_no" />}
            className={'form-group--reference-no'}
          >
            <InputGroup intent={inputIntent({ error, touched })} {...field} />
          </FormGroup>
        )}
      </FastField>

      {/*------------ Adjustment reasons -----------*/}
      <FastField name={'reason'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'adjustment_reasons'} />}
            labelInfo={<FieldRequiredHint />}
            className={'form-group--adjustment-reasons'}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name={'reason'} />}
          >
            <TextArea growVertically={true} large={true} intent={inputIntent({ error, touched })} {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}

export const FeatureRowDivider = styled.div`
  height: 2px;
  background: #e9e9e9;
  margin-bottom: 15px;
`;
