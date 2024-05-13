import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { compose } from '@bigcapital/webapp/utils';
import { Button, Intent } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

/**
 * Payment via license code tab.
 */
function LicenseTab({ openDialog }) {
  const { submitForm, values } = useFormikContext();

  const handleSubmitBtnClick = () => {
    submitForm().then(() => {
      openDialog('payment-via-voucher', { ...values });
    });
  };

  return (
    <div className={'license-container'}>
      <h3>
        <T id={'voucher'} />
      </h3>
      <p className="paragraph">
        <T id={'cards_will_be_charged'} />
      </p>

      <Button onClick={handleSubmitBtnClick} intent={Intent.PRIMARY} large={true}>
        <T id={'submit_voucher'} />
      </Button>
    </div>
  );
}

export default compose(withDialogActions)(LicenseTab);
