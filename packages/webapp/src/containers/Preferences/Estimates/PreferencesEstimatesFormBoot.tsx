import { Card } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useSettings } from '@bigcapital/webapp/hooks/query';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import PreferencesPageLoader from '../PreferencesPageLoader';

const PreferencesEstimatesFormContext = React.createContext();

function PreferencesEstimatesBoot({ ...props }) {
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
      <PreferencesEstimatesCard>
        {isLoading ? (
          <PreferencesPageLoader />
        ) : (
          <PreferencesEstimatesFormContext.Provider value={provider} {...props} />
        )}
      </PreferencesEstimatesCard>
    </div>
  );
}

const usePreferencesEstimatesFormContext = () => React.useContext(PreferencesEstimatesFormContext);

const PreferencesEstimatesCard = styled(Card)`
  padding: 25px;

  .bp4-form-group {
    max-width: 600px;
  }
`;

export { PreferencesEstimatesBoot, usePreferencesEstimatesFormContext };
