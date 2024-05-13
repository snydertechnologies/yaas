import { Card } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useSettings } from '@bigcapital/webapp/hooks/query';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import PreferencesPageLoader from '../PreferencesPageLoader';

const PreferencesCreditNotesFormContext = React.createContext();

function PreferencesCreditNotesBoot({ ...props }) {
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
      <PreferencesCreditNotesCard>
        {isLoading ? (
          <PreferencesPageLoader />
        ) : (
          <PreferencesCreditNotesFormContext.Provider value={provider} {...props} />
        )}
      </PreferencesCreditNotesCard>
    </div>
  );
}

const PreferencesCreditNotesCard = styled(Card)`
  padding: 25px;

  .bp4-form-group {
    max-width: 600px;
  }
`;

const usePreferencesCreditNotesFormContext = () => React.useContext(PreferencesCreditNotesFormContext);

export { PreferencesCreditNotesBoot, usePreferencesCreditNotesFormContext };
