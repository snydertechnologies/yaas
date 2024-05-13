import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';

import BillFloatingActions from './BillFloatingActions';
import { CreateBillFormSchema, EditBillFormSchema } from './BillForm.schema';
import BillFormFooter from './BillFormFooter';
import BillFormHeader from './BillFormHeader';
import BillFormTopBar from './BillFormTopBar';
import BillItemsEntriesEditor from './BillItemsEntriesEditor';

import { AppToaster } from '@bigcapital/webapp/components';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { compose, safeSumBy } from '@bigcapital/webapp/utils';
import { BillFormEntriesActions } from './BillFormEntriesActions';
import { useBillFormContext } from './BillFormProvider';
import {
  defaultBill,
  filterNonZeroEntries,
  handleErrors,
  transformFormValuesToRequest,
  transformToEditForm,
} from './utils';

/**
 * Bill form.
 */
function BillForm({
  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();

  // Bill form context.
  const { bill, isNewMode, submitPayload, createBillMutate, editBillMutate } = useBillFormContext();

  // Initial values in create and edit mode.
  const initialValues = useMemo(
    () => ({
      ...(!isEmpty(bill)
        ? {
            ...transformToEditForm(bill),
          }
        : {
            ...defaultBill,
            currency_code: base_currency,
          }),
    }),
    [bill, base_currency],
  );

  // Handles form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    const entries = filterNonZeroEntries(values.entries);
    const totalQuantity = safeSumBy(entries, 'quantity');

    if (totalQuantity === 0) {
      AppToaster.show({
        message: intl.get('quantity_cannot_be_zero_or_empty'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }
    const form = {
      ...transformFormValuesToRequest(values),
      open: submitPayload.status,
    };
    // Handle the request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_bill_has_been_created_successfully' : 'the_bill_has_been_edited_successfully',
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/bills');
      }
      if (submitPayload.resetForm) {
        resetForm();
      }
    };
    // Handle the request error.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      handleErrors(errors, { setErrors });
      setSubmitting(false);
    };
    if (isNewMode) {
      createBillMutate(form).then(onSuccess).catch(onError);
    } else {
      editBillMutate([bill.id, form]).then(onSuccess).catch(onError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_BILL)}>
      <Formik
        validationSchema={isNewMode ? CreateBillFormSchema : EditBillFormSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <BillFormTopBar />
          <BillFormHeader />
          <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
            <BillFormEntriesActions />
            <BillItemsEntriesEditor />
          </div>
          <BillFormFooter />
          <BillFloatingActions />
        </Form>
      </Formik>
    </div>
  );
}
export default compose(withCurrentOrganization())(BillForm);
