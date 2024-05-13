// @ts-nocheck
import React from 'react';

import { Stepper } from '@bigcapital/webapp/components/Stepper';
import SetupCongratsPage from './SetupCongratsPage';
import SetupInitializingForm from './SetupInitializingForm';
import SetupOrganizationPage from './SetupOrganizationPage';
import SetupSubscription from './SetupSubscription/SetupSubscription';
import styles from './SetupWizardContent.module.scss';

interface SetupWizardContentProps {
  stepIndex: number;
  stepId: string;
}

/**
 * Setup wizard content.
 */
export default function SetupWizardContent({ stepIndex, stepId }: SetupWizardContentProps) {
  return (
    <div className="setup-page__content">
      <Stepper
        active={stepIndex}
        classNames={{
          content: styles.content,
          items: styles.items,
        }}
      >
        <Stepper.Step label={'Subscription'}>
          <SetupSubscription />
        </Stepper.Step>

        <Stepper.Step label={'Organization'}>
          <SetupOrganizationPage id="organization" />
        </Stepper.Step>

        <Stepper.Step label={'Initiializing'}>
          <SetupInitializingForm id={'initializing'} />
        </Stepper.Step>

        <Stepper.Step label={'Congrats'}>
          <SetupCongratsPage id="congrats" />
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
