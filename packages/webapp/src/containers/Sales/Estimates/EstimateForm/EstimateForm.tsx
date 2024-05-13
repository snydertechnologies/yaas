import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { defaultTo, isEmpty, sumBy } from 'lodash';
// @ts-nocheck
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';

import { CreateEstimateFormSchema, EditEstimateFormSchema } from './EstimateForm.schema';

import EstimateFloatingActions from './EstimateFloatingActions';
import EstimateFormDialogs from './EstimateFormDialogs';
import EstimateFormFooter from './EstimateFormFooter';
import EstimateFormHeader from './EstimateFormHeader';
import EstimateItemsEntriesField from './EstimateItemsEntriesField';
import EstimtaeFormTopBar from './EstimtaeFormTopBar';
import { EstimateIncrementSyncSettingsToForm, EstimateSyncAutoExRateToForm } from './components';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { AppToaster } from '@bigcapital/webapp/components';
import { compose, orderingLinesIndexes, transactionNumber } from '@bigcapital/webapp/utils';
import { useEstimateFormContext } from './EstimateFormProvider';
import {
  defaultEstimate,
  handleErrors,
  resetFormState,
  transformToEditForm,
  transfromsFormValuesToRequest,
} from './utils';

/**
 * Estimate form.
 */
function EstimateForm({
  // #withSettings
  estimateNextNumber,
  estimateNumberPrefix,
  estimateAutoIncrementMode,
  estimateCustomerNotes,
  estimateTermsConditions,

  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();
  const { estimate, isNewMode, submitPayload, createEstimateMutate, editEstimateMutate } = useEstimateFormContext();

  const estimateNumber = transactionNumber(estimateNumberPrefix, estimateNextNumber);
  // Initial values in create and edit mode.
  const initialValues = {
    ...(!isEmpty(estimate)
      ? { ...transformToEditForm(estimate) }
      : {
          ...defaultEstimate,
          // If the auto-increment mode is enabled, take the next estimate
          // number from the settings.
          ...(estimateAutoIncrementMode && {
            estimate_number: estimateNumber,
          }),
          entries: orderingLinesIndexes(defaultEstimate.entries),
          currency_code: base_currency,
          terms_conditions: defaultTo(estimateTermsConditions, ''),
          note: defaultTo(estimateCustomerNotes, ''),
        }),
  };

  // Handles form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);

    const entries = values.entries.filter((item) => item.item_id && item.quantity);
    const totalQuantity = sumBy(entries, (entry) => parseInt(entry.quantity));

    // Validate the entries quantity should be bigger than zero.
    if (totalQuantity === 0) {
      AppToaster.show({
        message: intl.get('quantity_cannot_be_zero_or_empty'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }
    const form = {
      ...transfromsFormValuesToRequest(values),
      delivered: submitPayload.deliver,
    };
    // Handle the request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_estimate_has_been_created_successfully' : 'the_estimate_has_been_edited_successfully',
          { number: values.estimate_number },
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/estimates');
      }
      if (submitPayload.resetForm) {
        resetFormState({ resetForm, initialValues, values });
      }
    };
    // Handle the request error.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
        handleErrors(errors, { setErrors });
      }
      setSubmitting(false);
    };
    if (!isNewMode) {
      editEstimateMutate([estimate.id, form]).then(onSuccess).catch(onError);
    } else {
      createEstimateMutate(form).then(onSuccess).catch(onError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_ESTIMATE)}>
      <Formik
        validationSchema={isNewMode ? CreateEstimateFormSchema : EditEstimateFormSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <EstimtaeFormTopBar />
          <EstimateFormHeader />
          <EstimateItemsEntriesField />
          <EstimateFormFooter />
          <EstimateFloatingActions />

          {/*------- Dialogs -------*/}
          <EstimateFormDialogs />

          {/*------- Effects -------*/}
          <EstimateIncrementSyncSettingsToForm />
          <EstimateSyncAutoExRateToForm />
        </Form>
      </Formik>
    </div>
  );
}

export default compose(
  withSettings(({ estimatesSettings }) => ({
    estimateNextNumber: estimatesSettings?.nextNumber,
    estimateNumberPrefix: estimatesSettings?.numberPrefix,
    estimateAutoIncrementMode: estimatesSettings?.autoIncrement,
    estimateCustomerNotes: estimatesSettings?.customerNotes,
    estimateTermsConditions: estimatesSettings?.termsConditions,
  })),
  withCurrentOrganization(),
)(EstimateForm);
