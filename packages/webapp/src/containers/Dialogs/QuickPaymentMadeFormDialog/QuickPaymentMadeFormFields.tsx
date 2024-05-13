import { ACCOUNT_TYPE, CLASSES, Features } from '@bigcapital/webapp/constants';
import { useAutofocus } from '@bigcapital/webapp/hooks';
import { Classes, ControlGroup, FormGroup, InputGroup, Position, TextArea } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import classNames from 'classnames';
import { ErrorMessage, FastField, useFormikContext } from 'formik';
import { isEqual } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

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
import { handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { useQuickPaymentMadeContext } from './QuickPaymentMadeFormProvider';
import { useSetPrimaryBranchToForm } from './utils';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Quick payment made form fields.
 */
function QuickPaymentMadeFormFields({
  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const { accounts, branches, baseCurrency } = useQuickPaymentMadeContext();

  // Intl context.
  const { values } = useFormikContext();

  const paymentMadeFieldRef = useAutofocus();

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
          {/* ------------- Vendor name ------------- */}
          <FastField name={'vendor_id'}>
            {({ from, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'vendor_name'} />}
                className={classNames('form-group--select-list', CLASSES.FILL)}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name={'vendor'} />}
              >
                <InputGroup intent={inputIntent({ error, touched })} minimal={true} disabled={true} {...field} />
              </FormGroup>
            )}
          </FastField>
        </Col>
        <Col xs={5}>
          {/* ------------ Payment number. ------------ */}
          <FastField name={'payment_number'}>
            {({ form, field, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'payment_no'} />}
                className={('form-group--payment_number', CLASSES.FILL)}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="payment_number" />}
              >
                <InputGroup intent={inputIntent({ error, touched })} minimal={true} {...field} />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/*------------ Amount Received -----------*/}
      <FastField name={'payment_amount'}>
        {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'amount_received'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--payment_amount', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="payment_amount" />}
          >
            <ControlGroup>
              <InputPrependText text={values.currency_code} />

              <MoneyInputGroup
                value={value}
                minimal={true}
                onChange={(amount) => {
                  setFieldValue('payment_amount', amount);
                }}
                intent={inputIntent({ error, touched })}
                inputRef={(ref) => (paymentMadeFieldRef.current = ref)}
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
          date={values.payment_date}
          exchangeRate={values.exchange_rate}
        />
      </If>
      <Row>
        <Col xs={5}>
          {/* ------------- Payment date ------------- */}
          <FastField name={'payment_date'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'payment_date'} />}
                labelInfo={<FieldRequiredHint />}
                className={classNames('form-group--select-list', CLASSES.FILL)}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="payment_date" />}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(value)}
                  onChange={handleDateChange((formattedDate) => {
                    form.setFieldValue('payment_date', formattedDate);
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
          {/* ------------ payment account ------------ */}
          <FastField name={'payment_account_id'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'payment_account'} />}
                className={classNames('form-group--payment_account_id', 'form-group--select-list', CLASSES.FILL)}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name={'payment_account_id'} />}
              >
                <AccountsSuggestField
                  accounts={accounts}
                  onAccountSelected={({ id }) => form.setFieldValue('payment_account_id', id)}
                  inputProps={{
                    placeholder: intl.get('select_account'),
                  }}
                  filterByTypes={[ACCOUNT_TYPE.CASH, ACCOUNT_TYPE.BANK, ACCOUNT_TYPE.OTHER_CURRENT_ASSET]}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
      {/* ------------ Reference No. ------------ */}
      <FastField name={'reference'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'reference'} />}
            className={classNames('form-group--reference', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="reference" />}
          >
            <InputGroup intent={inputIntent({ error, touched })} minimal={true} {...field} />
          </FormGroup>
        )}
      </FastField>
      {/* --------- Statement --------- */}
      <FastField name={'statement'}>
        {({ form, field, meta: { error, touched } }) => (
          <FormGroup label={<T id={'statement'} />} className={'form-group--statement'}>
            <TextArea growVertically={true} {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}

export default compose(withCurrentOrganization())(QuickPaymentMadeFormFields);

export const BranchRowDivider = styled.div`
  height: 1px;
  background: #ebf1f6;
  margin-bottom: 15px;
`;
