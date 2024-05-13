import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { FormGroup, Radio, RadioGroup } from '@blueprintjs/core';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleStringChange, saveInvoke } from '@bigcapital/webapp/utils';

/**
 * Customer type radio field.
 */
export default function RadioCustomer(props) {
  const { onChange, ...rest } = props;

  return (
    <FastField name={'customer_type'}>
      {({ form, field: { value }, meta: { error, touched } }) => (
        <FormGroup inline={true} label={<T id={'customer_type'} />} className={classNames('form-group--customer_type')}>
          <RadioGroup
            inline={true}
            onChange={handleStringChange((value) => {
              saveInvoke(onChange, value);
              form.setFieldValue('customer_type', value);
            })}
            selectedValue={value}
          >
            <Radio label={intl.get('business')} value="business" />
            <Radio label={intl.get('individual')} value="individual" />
          </RadioGroup>
        </FormGroup>
      )}
    </FastField>
  );
}
