import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import { ErrorMessage, FastField, Form, useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { compose } from 'redux';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useAutofocus } from '@bigcapital/webapp/hooks';
import { inputIntent } from '@bigcapital/webapp/utils';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

/**
 * Payment via license form.
 */
function PaymentViaLicenseForm({
  // #withDialogActions
  closeDialog,
}) {
  // Formik context.
  const { isSubmitting } = useFormikContext();

  const licenseNumberRef = useAutofocus();

  // Handle close button click.
  const handleCloseBtnClick = () => {
    closeDialog('payment-via-voucher');
  };

  return (
    <Form>
      <div className={CLASSES.DIALOG_BODY}>
        <p>
          <T id={'payment_via_voucher.dialog.description'} />
        </p>

        <FastField name="license_code">
          {({ field, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'voucher_number'} />}
              intent={inputIntent({ error, touched })}
              helperText={<ErrorMessage name="license_code" />}
              className={'form-group--voucher_number'}
            >
              <InputGroup
                large={true}
                intent={inputIntent({ error, touched })}
                {...field}
                inputRef={(ref) => (licenseNumberRef.current = ref)}
              />
            </FormGroup>
          )}
        </FastField>
      </div>

      <div className={CLASSES.DIALOG_FOOTER}>
        <div className={CLASSES.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleCloseBtnClick} disabled={isSubmitting}>
            <T id={'close'} />
          </Button>

          <Button intent={Intent.PRIMARY} disabled={false} type="submit" loading={isSubmitting}>
            <T id={'submit'} />
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default compose(withDialogActions)(PaymentViaLicenseForm);
