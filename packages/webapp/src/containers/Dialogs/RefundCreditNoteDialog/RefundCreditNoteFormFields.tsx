import {
  AccountsSuggestField,
  BranchSelect,
  BranchSelectButton,
  Col,
  ExchangeRateMutedField,
  FeatureCan,
  FieldRequiredHint,
  Icon,
  If,
  InputPrependText,
  MoneyInputGroup,
  Row,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { CLASSES, Features } from '@bigcapital/webapp/constants';
import { ACCOUNT_TYPE } from '@bigcapital/webapp/constants/accountTypes';
import { useAutofocus } from '@bigcapital/webapp/hooks';
import { compose, handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { Classes, ControlGroup, FormGroup, InputGroup, Position, TextArea } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import classNames from 'classnames';
import { ErrorMessage, FastField, useFormikContext } from 'formik';
import { isEqual } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';
import { useRefundCreditNoteContext } from './RefundCreditNoteFormProvider';
import { useSetPrimaryBranchToForm } from './utils';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * Refund credit note form fields.
 */
function RefundCreditNoteFormFields({
  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const { accounts, branches } = useRefundCreditNoteContext();
  const { values } = useFormikContext();

  const amountFieldRef = useAutofocus();

  // Sets the primary branch to form.
  useSetPrimaryBranchToForm();

  return (
    <div className={Classes.DIALOG_BODY}>
      <FeatureCan feature={Features.Branches}>
        <Row>
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
        </Row>
        <BranchRowDivider />
      </FeatureCan>

      <Row>
        <Col xs={5}>
          {/* ------------- Refund date ------------- */}
          <FastField name={'date'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'refund_credit_note.dialog.refund_date'} />}
                labelInfo={<FieldRequiredHint />}
                className={classNames('form-group--select-list', CLASSES.FILL)}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="date" />}
                // inline={true}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(value)}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('date', formattedDate);
                  })}
                  popoverProps={{ position: Position.BOTTOM, minimal: true }}
                  inputProps={{
                    leftIcon: <Icon icon={'date-range'} />,
                  }}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/* ------------ Form account ------------ */}
          <FastField name={'from_account_id'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'refund_credit_note.dialog.from_account'} />}
                className={classNames('form-group--from_account_id', 'form-group--select-list', CLASSES.FILL)}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name={'from_account_id'} />}
              >
                <AccountsSuggestField
                  selectedAccountId={value}
                  accounts={accounts}
                  onAccountSelected={({ id }) => form.setFieldValue('from_account_id', id)}
                  inputProps={{
                    placeholder: intl.get('select_account'),
                  }}
                  filterByTypes={[ACCOUNT_TYPE.BANK, ACCOUNT_TYPE.CASH, ACCOUNT_TYPE.FIXED_ASSET]}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/* ------------- Amount ------------- */}
      <FastField name={'amount'}>
        {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'refund_credit_note.dialog.amount'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--amount', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="amount" />}
          >
            <ControlGroup>
              <InputPrependText text={values.currency_code} />
              <MoneyInputGroup
                value={value}
                minimal={true}
                onChange={(amount) => {
                  setFieldValue('amount', amount);
                }}
                intent={inputIntent({ error, touched })}
                inputRef={(ref) => (amountFieldRef.current = ref)}
              />
            </ControlGroup>
          </FormGroup>
        )}
      </FastField>

      <If condition={!isEqual(base_currency, values.currency_code)}>
        {/*------------ exchange rate -----------*/}
        <ExchangeRateMutedField
          name={'exchange_rate'}
          fromCurrency={base_currency}
          toCurrency={values.currency_code}
          formGroupProps={{ label: '', inline: false }}
          date={values.date}
          exchangeRate={values.exchange_rate}
        />
      </If>

      {/* ------------ Reference No. ------------ */}
      <FastField name={'reference_no'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference_no'} />}
            className={classNames('form-group--reference', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference" />}
          >
            <InputGroup intent={inputIntent({ error, touched })} minimal={true} {...field} />
          </FormGroup>
        )}
      </FastField>

      {/* --------- Statement --------- */}
      <FastField name={'description'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup label={<T id={'refund_credit_note.dialog.description'} />} className={'form-group--description'}>
            <TextArea growVertically={true} {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}

export default compose(withCurrentOrganization())(RefundCreditNoteFormFields);

export const BranchRowDivider = styled.div`
  height: 1px;
  background: #ebf1f6;
  margin-bottom: 13px;
`;
