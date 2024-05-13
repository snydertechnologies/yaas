import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { defaultTo, isEmpty, sumBy } from 'lodash';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';

import ExpenseFloatingFooter from './ExpenseFloatingActions';
import ExpenseFormBody from './ExpenseFormBody';
import ExpenseFormFooter from './ExpenseFormFooter';
import ExpenseFormHeader from './ExpenseFormHeader';
import ExpenseFormTopBar from './ExpenseFormTopBar';

import { useExpenseFormContext } from './ExpenseFormPageProvider';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { AppToaster } from '@bigcapital/webapp/components';
import { compose } from '@bigcapital/webapp/utils';
import { CreateExpenseFormSchema, EditExpenseFormSchema } from './ExpenseForm.schema';
import { defaultExpense, transformErrors, transformFormValuesToRequest, transformToEditForm } from './utils';

/**
 * Expense form.
 */
function ExpenseForm({
  // #withSettings
  preferredPaymentAccount,
  // #withCurrentOrganization
  organization: { base_currency },
}) {
  // Expense form context.
  const { editExpenseMutate, createExpenseMutate, expense, expenseId, submitPayload } = useExpenseFormContext();

  const isNewMode = !expenseId;

  // History context.
  const history = useHistory();

  // Form initial values.
  const initialValues = useMemo(
    () => ({
      ...(!isEmpty(expense)
        ? {
            ...transformToEditForm(expense, defaultExpense),
          }
        : {
            ...defaultExpense,
            currency_code: base_currency,
            payment_account_id: defaultTo(preferredPaymentAccount, ''),
          }),
    }),
    [expense, base_currency, preferredPaymentAccount],
  );

  //  Handle form submit.
  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);
    const totalAmount = sumBy(values.categories, 'amount');

    if (totalAmount <= 0) {
      AppToaster.show({
        message: intl.get('amount_cannot_be_zero_or_empty'),
        intent: Intent.DANGER,
      });
      return;
    }

    const form = {
      ...transformFormValuesToRequest(values),
      publish: submitPayload.publish,
    };
    // Handle request success.
    const handleSuccess = (response) => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_expense_has_been_created_successfully' : 'the_expense_has_been_edited_successfully',
          { number: values.payment_account_id },
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/expenses');
      }
      if (submitPayload.resetForm) {
        resetForm();
      }
    };

    // Handle the request error.
    const handleError = ({
      response: {
        data: { errors },
      },
    }) => {
      transformErrors(errors, { setErrors });
      setSubmitting(false);
    };
    if (isNewMode) {
      createExpenseMutate(form).then(handleSuccess).catch(handleError);
    } else {
      editExpenseMutate([expense.id, form]).then(handleSuccess).catch(handleError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_EXPENSE)}>
      <Formik
        validationSchema={isNewMode ? CreateExpenseFormSchema : EditExpenseFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <ExpenseFormTopBar />
          <ExpenseFormHeader />
          <ExpenseFormBody />
          <ExpenseFormFooter />
          <ExpenseFloatingFooter />
        </Form>
      </Formik>
    </div>
  );
}

export default compose(
  withDashboardActions,
  withSettings(({ expenseSettings }) => ({
    preferredPaymentAccount: parseInt(expenseSettings?.preferredPaymentAccount, 10),
  })),
  withCurrentOrganization(),
)(ExpenseForm);
