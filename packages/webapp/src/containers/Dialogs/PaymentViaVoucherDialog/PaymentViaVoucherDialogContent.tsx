import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import '@bigcapital/webapp/style/pages/Setup/PaymentViaVoucherDialog.scss';

import { DialogContent, AppToaster as Toaster } from '@bigcapital/webapp/components';
import { usePaymentByVoucher } from '@bigcapital/webapp/hooks/query';
import PaymentViaLicenseForm from './PaymentViaVoucherForm';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Payment via license dialog content.
 */
function PaymentViaLicenseDialogContent({
  // #ownProps
  subscriptionForm,

  // #withDialog
  closeDialog,
}) {
  const history = useHistory();

  // Payment via voucher
  const { mutateAsync: paymentViaVoucherMutate } = usePaymentByVoucher();

  // Handle submit.
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    const mutateValues = {
      plan_slug: `essentials-monthly`,
      license_code: values.license_code,
    };
    // Payment via voucher mutate.
    paymentViaVoucherMutate({ ...mutateValues })
      .then(() => {
        Toaster.show({
          message: intl.get('payment_via_voucher.success_message'),
          intent: Intent.SUCCESS,
        });
        return closeDialog('payment-via-voucher');
      })
      .then(() => {
        history.push('initializing');
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          if (errors.find((e) => e.type === 'LICENSE.CODE.IS.INVALID')) {
            setErrors({
              license_code: 'payment_via_voucher.license_code_not_valid',
            });
          }
        },
      )
      .finally((errors) => {
        setSubmitting(false);
      });
  };

  // Initial values.
  const initialValues = {
    license_code: '',
    plan_slug: '',
    period: '',
    ...subscriptionForm,
  };
  // Validation schema.
  const validationSchema = Yup.object().shape({
    license_code: Yup.string().required().min(10).max(10).label(intl.get('license_code')),
  });

  return (
    <DialogContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        component={PaymentViaLicenseForm}
      />
    </DialogContent>
  );
}

export default compose(withDialogActions)(PaymentViaLicenseDialogContent);
