// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';

import '@bigcapital/webapp/style/pages/SaleEstimate/PageForm.scss';

import { AutoExchangeRateProvider } from '@bigcapital/webapp/containers/Entries/AutoExchangeProvider';
import EstimateForm from './EstimateForm';
import { EstimateFormProvider } from './EstimateFormProvider';

/**
 * Estimate form page.
 */
export default function EstimateFormPage() {
  const { id } = useParams();
  const idInteger = parseInt(id, 10);

  return (
    <EstimateFormProvider estimateId={idInteger}>
      <AutoExchangeRateProvider>
        <EstimateForm />
      </AutoExchangeRateProvider>
    </EstimateFormProvider>
  );
}
