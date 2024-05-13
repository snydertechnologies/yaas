import { FormikObserver } from '@bigcapital/webapp/components';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

/**
 * Role form observer.
 * @returns {React.JSX}
 */
export function RoleFormObserver() {
  const { values } = useFormikContext();

  // Handles the form change.
  const handleFormChange = () => {};

  return <FormikObserver onChange={handleFormChange} values={values} />;
}
