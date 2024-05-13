import { Card } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useSettings } from '@bigcapital/webapp/hooks/query';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import PreferencesPageLoader from '../PreferencesPageLoader';

const PreferencesInvoiceFormContext = React.createContext();

function PreferencesInvoicesBoot({ ...props }) {
  // Fetches organization settings.
  const { isLoading: isSettingsLoading } = useSettings();

  // Provider state.
  const provider = {
    isSettingsLoading,
  };

  // Detarmines whether if any query is loading.
  const isLoading = isSettingsLoading;

  return (
    <div
      className={classNames(
        CLASSES.PREFERENCES_PAGE_INSIDE_CONTENT,
        CLASSES.PREFERENCES_PAGE_INSIDE_CONTENT_ACCOUNTANT,
      )}
    >
      <PreferencesInvoicesCard>
        {isLoading ? <PreferencesPageLoader /> : <PreferencesInvoiceFormContext.Provider value={provider} {...props} />}
      </PreferencesInvoicesCard>
    </div>
  );
}

const PreferencesInvoicesCard = styled(Card)`
  padding: 25px;

  .bp4-form-group{
    max-width: 600px;
  }
`;

const usePreferencesInvoiceFormContext = () => React.useContext(PreferencesInvoiceFormContext);

export { PreferencesInvoicesBoot, usePreferencesInvoiceFormContext };
