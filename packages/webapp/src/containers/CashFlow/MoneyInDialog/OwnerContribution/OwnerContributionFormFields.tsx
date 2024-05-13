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
import { BranchRowDivider, useSetPrimaryBranchToForm } from '../../MoneyInDialog/utils';
import { MoneyInOutTransactionNoField } from '../../_components';
import { useMoneyInDailogContext } from '../MoneyInDialogProvider';
import { MoneyInExchangeRateField } from '../MoneyInExchangeRateField';
import { useMoneyInFieldsContext } from '../MoneyInFieldsProvider';

/**
/**
 * Owner contribution form fields.
 */
export default function OwnerContributionFormFields() {
  // Money in dialog context.
  const { accounts, branches } = useMoneyInDailogContext();
  const { account } = useMoneyInFieldsContext();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  return (
    <React.Fragment>
      <FeatureCan feature={Features.Branches}>
        <Row>
          <Col xs={5}>
            <FFormGroup name={'branch_id'} label={<T id={'branch'} />}>
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
          <FFormGroup name={'amount'} label={<T id={'amount'} />} labelInfo={<FieldRequiredHint />}>
            <ControlGroup>
              <InputPrependText text={account?.currency_code || '--'} />
              <FMoneyInputGroup name={'amount'} minimal={true} />
            </ControlGroup>
          </FFormGroup>
        </Col>
      </Row>

      {/*------------ Exchange rate -----------*/}
      <MoneyInExchangeRateField />

      <Row>
        <Col xs={5}>
          {/*------------ equity account -----------*/}
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
                  onAccountSelected={(account) => {
                    form.setFieldValue('credit_account_id', account.id);
                    form.setFieldValue('currency_code', account.currency_code);
                  }}
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

      {/*------------ Description -----------*/}
      <FFormGroup name={'description'} label={<T id={'description'} />}>
        <FTextArea name={'description'} growVertically={true} large={true} fill={true} />
      </FFormGroup>
    </React.Fragment>
  );
}
