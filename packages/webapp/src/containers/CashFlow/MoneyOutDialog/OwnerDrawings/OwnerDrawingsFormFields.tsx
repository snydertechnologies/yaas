import {
  AccountsSuggestField,
  BranchSelect,
  BranchSelectButton,
  Col,
  FFormGroup,
  FInputGroup,
  FMoneyInputGroup,
  FTextArea,
  FeatureCan,
  FieldRequiredHint,
  InputPrependText,
  Row,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { ACCOUNT_TYPE, CLASSES, Features } from '@bigcapital/webapp/constants';
import { handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { ControlGroup, FormGroup, Position } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import classNames from 'classnames';
import { ErrorMessage, FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import { BranchRowDivider, useSetPrimaryBranchToForm } from '../../MoneyOutDialog/utils';
import { MoneyInOutTransactionNoField } from '../../_components';
import { useMoneyOutDialogContext } from '../MoneyOutDialogProvider';
import { MoneyOutExchangeRateField } from '../MoneyOutExchangeRateField';
import { useMoneyOutFieldsContext } from '../MoneyOutFieldsProvider';

/**
 * Owner drawings form fields.
 */
export default function OwnerDrawingsFormFields() {
  // Money out dialog context.
  const { accounts, branches } = useMoneyOutDialogContext();
  const { account } = useMoneyOutFieldsContext();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  return (
    <React.Fragment>
      <FeatureCan feature={Features.Branches}>
        <Row>
          <Col xs={5}>
            <FFormGroup label={<T id={'branch'} />} name={'branch_id'}>
              <BranchSelect
                name={'branch_id'}
                branches={branches}
                input={BranchSelectButton}
                popoverProps={{ minimal: true }}
              />
            </FFormGroup>
          </Col>
        </Row>
        <BranchRowDivider />
      </FeatureCan>

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
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/*------------ Transaction number -----------*/}
          <MoneyInOutTransactionNoField />
        </Col>
      </Row>

      {/*------------ Amount -----------*/}

      <Row>
        <Col xs={10}>
          <FormGroup name={'amount'} label={<T id={'amount'} />} labelInfo={<FieldRequiredHint />}>
            <ControlGroup>
              <InputPrependText text={account.currency_code} />
              <FMoneyInputGroup name={'amount'} minimal={true} />
            </ControlGroup>
          </FormGroup>
        </Col>
      </Row>

      {/*------------ Exchange rate -----------*/}
      <MoneyOutExchangeRateField />

      <Row>
        <Col xs={5}>
          {/*------------ equitty account -----------*/}
          <FastField name={'credit_account_id'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'cash_flow_transaction.label_equity_account'} />}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="credit_account_id" />}
                className={'form-group--credit_account_id'}
              >
                <AccountsSuggestField
                  accounts={accounts}
                  onAccountSelected={({ id }) => form.setFieldValue('credit_account_id', id)}
                  filterByTypes={ACCOUNT_TYPE.EQUITY}
                  inputProps={{
                    intent: inputIntent({ error, touched }),
                  }}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>

        <Col xs={5}>
          {/*------------ Reference -----------*/}
          <FFormGroup name={'reference_no'} label={<T id={'reference_no'} />}>
            <FInputGroup name={'reference_no'} />
          </FFormGroup>
        </Col>
      </Row>

      {/*------------ description -----------*/}
      <FFormGroup name={'description'} label={<T id={'description'} />}>
        <FTextArea name={'description'} growVertically={true} large={true} fill={true} />
      </FFormGroup>
    </React.Fragment>
  );
}
