import { AccountsSelect, Col, FFormGroup, Row, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { ACCOUNT_TYPE } from '@bigcapital/webapp/constants/accountTypes';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { compose } from '@bigcapital/webapp/utils';
import { useItemFormContext } from './ItemFormProvider';
import { accountsFieldShouldUpdate } from './utils';

/**
 * Item form inventory sections.
 */
function ItemFormInventorySection({ organization: { base_currency } }) {
  const { accounts } = useItemFormContext();

  return (
    <div className="page-form__section page-form__section--inventory">
      <h3>
        <T id={'inventory_information'} />
      </h3>

      <Row>
        <Col xs={6}>
          {/*------------- Inventory Account ------------- */}
          <FFormGroup
            label={<T id={'inventory_account'} />}
            name={'inventory_account_id'}
            items={accounts}
            fastField={true}
            shouldUpdate={accountsFieldShouldUpdate}
            inline={true}
          >
            <AccountsSelect
              name={'inventory_account_id'}
              items={accounts}
              placeholder={<T id={'select_account'} />}
              filterByTypes={[ACCOUNT_TYPE.INVENTORY]}
              fastField={true}
              shouldUpdate={accountsFieldShouldUpdate}
            />
          </FFormGroup>
        </Col>
      </Row>
    </div>
  );
}

export default compose(withCurrentOrganization())(ItemFormInventorySection);
