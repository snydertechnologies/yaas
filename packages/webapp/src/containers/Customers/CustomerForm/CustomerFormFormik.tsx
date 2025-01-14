import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose, saveInvoke, transformToForm } from '@bigcapital/webapp/utils';
import { CreateCustomerForm, EditCustomerForm } from './CustomerForm.schema';
import { useCustomerFormContext } from './CustomerFormProvider';
import { defaultInitialValues } from './utils';

import { AppToaster } from '@bigcapital/webapp/components';
import CustomerFloatingActions from './CustomerFloatingActions';
import CustomerFormAfterPrimarySection from './CustomerFormAfterPrimarySection';
import CustomerFormPrimarySection from './CustomerFormPrimarySection';
import CustomersTabs from './CustomersTabs';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

import '@bigcapital/webapp/style/pages/Customers/Form.scss';

/**
 * Customer form.
 */
function CustomerFormFormik({
  organization: { base_currency },

  // #ownProps
  initialValues: initialCustomerValues,
  onSubmitSuccess,
  onSubmitError,
  onCancel,
  className,
}) {
  const { customer, submitPayload, contactDuplicate, editCustomerMutate, createCustomerMutate, isNewMode } =
    useCustomerFormContext();

  /**
   * Initial values in create and edit mode.
   */
  const initialValues = useMemo(
    () => ({
      ...defaultInitialValues,
      currency_code: base_currency,
      ...transformToForm(contactDuplicate || customer, defaultInitialValues),
      ...initialCustomerValues,
    }),
    [customer, contactDuplicate, base_currency, initialCustomerValues],
  );

  // Handles the form submit.
  const handleFormSubmit = (values, formArgs) => {
    const { setSubmitting, resetForm } = formArgs;
    const formValues = { ...values };

    const onSuccess = () => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_customer_has_been_created_successfully' : 'the_item_customer_has_been_edited_successfully',
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
      resetForm();

      saveInvoke(onSubmitSuccess, values, formArgs, submitPayload);
    };

    const onError = () => {
      setSubmitting(false);
      saveInvoke(onSubmitError, values, formArgs, submitPayload);
    };

    if (isNewMode) {
      createCustomerMutate(formValues).then(onSuccess).catch(onError);
    } else {
      editCustomerMutate([customer.id, formValues]).then(onSuccess).catch(onError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_CUSTOMER, className)}>
      <Formik
        validationSchema={isNewMode ? CreateCustomerForm : EditCustomerForm}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <CustomerFormHeaderPrimary>
            <CustomerFormPrimarySection />
          </CustomerFormHeaderPrimary>

          <div className={'page-form__after-priamry-section'}>
            <CustomerFormAfterPrimarySection />
          </div>

          <div className={classNames(CLASSES.PAGE_FORM_TABS)}>
            <CustomersTabs />
          </div>

          <CustomerFloatingActions onCancel={onCancel} />
        </Form>
      </Formik>
    </div>
  );
}

export const CustomerFormHeaderPrimary = styled.div`
  padding: 10px 0 0;
  margin: 0 0 20px;
  overflow: hidden;
  border-bottom: 1px solid #e4e4e4;
  max-width: 1000px;
`;

export default compose(withCurrentOrganization())(CustomerFormFormik);
