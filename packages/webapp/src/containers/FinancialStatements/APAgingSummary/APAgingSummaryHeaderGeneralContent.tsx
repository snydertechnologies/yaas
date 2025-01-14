import {
  Col,
  FFormGroup,
  FieldHint,
  Row,
  FormattedMessage as T,
  VendorsMultiSelect,
} from '@bigcapital/webapp/components';
import { handleDateChange, inputIntent, momentFormatter, tansformDateValue } from '@bigcapital/webapp/utils';
import { FormGroup, InputGroup, Intent, Position } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import FinancialStatementsFilter from '../FinancialStatementsFilter';
import { useAPAgingSummaryGeneralContext } from './APAgingSummaryGeneralProvider';
import { filterVendorsOptions } from './constants';

/**
 * AP Aging Summary - Drawer Header - General panel - Content.
 */
export default function APAgingSummaryHeaderGeneralContent() {
  const { vendors } = useAPAgingSummaryGeneralContext();

  return (
    <div>
      <Row>
        <Col xs={5}>
          <FastField name={'asDate'}>
            {({ form, field: { value }, meta: { error } }) => (
              <FormGroup
                label={<T id={'as_date'} />}
                labelInfo={<FieldHint />}
                fill={true}
                intent={inputIntent({ error })}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(value)}
                  onChange={handleDateChange((selectedDate) => {
                    form.setFieldValue('asDate', selectedDate);
                  })}
                  popoverProps={{ position: Position.BOTTOM, minimal: true }}
                  minimal={true}
                  fill={true}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
          <FastField name={'agingDaysBefore'}>
            {({ field, meta: { error } }) => (
              <FormGroup
                label={<T id={'aging_before_days'} />}
                labelInfo={<FieldHint />}
                intent={inputIntent({ error })}
              >
                <InputGroup intent={error && Intent.DANGER} {...field} />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
          <FastField name={'agingPeriods'}>
            {({ field, meta: { error } }) => (
              <FormGroup label={<T id={'aging_periods'} />} labelInfo={<FieldHint />} intent={inputIntent({ error })}>
                <InputGroup intent={error && Intent.DANGER} {...field} />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
          <FinancialStatementsFilter
            items={filterVendorsOptions}
            label={<T id={'AP_aging_summary.filter_options.label'} />}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
          <FFormGroup label={<T id={'specific_vendors'} />} name={'vendorsIds'}>
            <VendorsMultiSelect name={'vendorsIds'} items={vendors} />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}
