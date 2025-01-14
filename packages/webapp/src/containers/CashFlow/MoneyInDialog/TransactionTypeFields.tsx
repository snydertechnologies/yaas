import {
  AccountsSuggestField,
  Col,
  FFormGroup,
  FSelect,
  FieldRequiredHint,
  ListSelect,
  Row,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { CLASSES, getAddMoneyInOptions } from '@bigcapital/webapp/constants';
import { inputIntent } from '@bigcapital/webapp/utils';
import { FormGroup } from '@blueprintjs/core';
import classNames from 'classnames';
import { ErrorMessage, FastField, Field } from 'formik';
// @ts-nocheck
import React, { useMemo } from 'react';

import { useMoneyInDailogContext } from './MoneyInDialogProvider';

/**
 * Transaction type fields.
 */
export default function TransactionTypeFields() {
  // Money in dialog context.
  const { cashflowAccounts, setAccountId } = useMoneyInDailogContext();

  // Retrieves the add money in button options.
  const addMoneyInOptions = useMemo(() => getAddMoneyInOptions(), []);

  return (
    <div className="trasnaction-type-fileds">
      <Row>
        <Col xs={5}>
          {/*------------ Transaction type -----------*/}
          <FFormGroup name={'transaction_type'} label={<T id={'transaction_type'} />} labelInfo={<FieldRequiredHint />}>
            <FSelect
              name={'transaction_type'}
              items={addMoneyInOptions}
              popoverProps={{ minimal: true }}
              valueAccessor={'value'}
              textAccessor={'name'}
            />
          </FFormGroup>
        </Col>

        <Col xs={5}>
          {/*------------ Current account -----------*/}
          <FastField name={'cashflow_account_id'}>
            {({ form, field: { value }, meta: { error, touched } }) => (
              <FormGroup
                label={<T id={'cash_flow_transaction.label_current_account'} />}
                labelInfo={<FieldRequiredHint />}
                intent={inputIntent({ error, touched })}
                helperText={<ErrorMessage name="cashflow_account_id" />}
                minimal={true}
                className={classNames(CLASSES.FILL, 'form-group--cashflow_account_id')}
              >
                <AccountsSuggestField
                  accounts={cashflowAccounts}
                  onAccountSelected={({ id }) => {
                    form.setFieldValue('cashflow_account_id', id);
                    setAccountId(id);
                  }}
                  inputProps={{
                    intent: inputIntent({ error, touched }),
                  }}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>
    </div>
  );
}
