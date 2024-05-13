// @ts-nocheck
import React from 'react';
import SetupLeftSection from './SetupLeftSection';
import SetupRightSection from './SetupRightSection';

import '@bigcapital/webapp/style/pages/Setup/SetupPage.scss';

export default function WizardSetupPage() {
  return (
    <div className="setup-page">
      <SetupLeftSection />
      <SetupRightSection />
    </div>
  );
}
