import { Icon, If, FormattedMessage as T } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import {
  Button,
  ButtonGroup,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEstimateFormContext } from './EstimateFormProvider';

/**
 * Estimate floating actions bar.
 */
export default function EstimateFloatingActions() {
  const history = useHistory();
  const { resetForm, submitForm, isSubmitting } = useFormikContext();

  // Estimate form context.
  const { estimate, setSubmitPayload } = useEstimateFormContext();

  // Handle submit & deliver button click.
  const handleSubmitDeliverBtnClick = (event) => {
    setSubmitPayload({ redirect: true, deliver: true });
    submitForm();
  };

  // Handle submit, deliver & new button click.
  const handleSubmitDeliverAndNewBtnClick = (event) => {
    setSubmitPayload({ redirect: false, deliver: true, resetForm: true });
    submitForm();
  };

  // Handle submit, deliver & continue editing button click.
  const handleSubmitDeliverContinueEditingBtnClick = (event) => {
    setSubmitPayload({ redirect: false, deliver: true });
    submitForm();
  };

  // Handle submit as draft button click.
  const handleSubmitDraftBtnClick = (event) => {
    setSubmitPayload({ redirect: true, deliver: false });
    submitForm();
  };

  // Handle submit as draft & new button click.
  const handleSubmitDraftAndNewBtnClick = (event) => {
    setSubmitPayload({ redirect: false, deliver: false, resetForm: true });
    submitForm();
  };

  // Handle submit as draft & continue editing button click.
  const handleSubmitDraftContinueEditingBtnClick = (event) => {
    setSubmitPayload({ redirect: false, deliver: false });
    submitForm();
  };

  const handleCancelBtnClick = (event) => {
    history.goBack();
  };

  const handleClearBtnClick = (event) => {
    resetForm();
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM_FLOATING_ACTIONS)}>
      {/* ----------- Save And Deliver ----------- */}
      <If condition={!estimate || !estimate?.is_delivered}>
        <ButtonGroup>
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            intent={Intent.PRIMARY}
            onClick={handleSubmitDeliverBtnClick}
            text={<T id={'save_and_deliver'} />}
          />
          <Popover
            content={
              <Menu>
                <MenuItem text={<T id={'deliver_and_new'} />} onClick={handleSubmitDeliverAndNewBtnClick} />
                <MenuItem
                  text={<T id={'deliver_continue_editing'} />}
                  onClick={handleSubmitDeliverContinueEditingBtnClick}
                />
              </Menu>
            }
            minimal={true}
            interactionKind={PopoverInteractionKind.CLICK}
            position={Position.BOTTOM_LEFT}
          >
            <Button
              disabled={isSubmitting}
              intent={Intent.PRIMARY}
              rightIcon={<Icon icon="arrow-drop-up-16" iconSize={20} />}
            />
          </Popover>
        </ButtonGroup>

        {/* ----------- Save As Draft ----------- */}
        <ButtonGroup>
          <Button
            disabled={isSubmitting}
            className={'ml1'}
            onClick={handleSubmitDraftBtnClick}
            text={<T id={'save_as_draft'} />}
          />
          <Popover
            content={
              <Menu>
                <MenuItem text={<T id={'save_and_new'} />} onClick={handleSubmitDraftAndNewBtnClick} />
                <MenuItem
                  text={<T id={'save_continue_editing'} />}
                  onClick={handleSubmitDraftContinueEditingBtnClick}
                />
              </Menu>
            }
            minimal={true}
            interactionKind={PopoverInteractionKind.CLICK}
            position={Position.BOTTOM_LEFT}
          >
            <Button disabled={isSubmitting} rightIcon={<Icon icon="arrow-drop-up-16" iconSize={20} />} />
          </Popover>
        </ButtonGroup>
      </If>

      {/* ----------- Save and New ----------- */}
      <If condition={estimate && estimate?.is_delivered}>
        <ButtonGroup>
          <Button
            disabled={isSubmitting}
            intent={Intent.PRIMARY}
            onClick={handleSubmitDeliverBtnClick}
            style={{ minWidth: '85px' }}
            text={<T id={'save'} />}
          />
          <Popover
            content={
              <Menu>
                <MenuItem text={<T id={'save_and_new'} />} onClick={handleSubmitDeliverAndNewBtnClick} />
              </Menu>
            }
            minimal={true}
            interactionKind={PopoverInteractionKind.CLICK}
            position={Position.BOTTOM_LEFT}
          >
            <Button
              disabled={isSubmitting}
              intent={Intent.PRIMARY}
              rightIcon={<Icon icon="arrow-drop-up-16" iconSize={20} />}
            />
          </Popover>
        </ButtonGroup>
      </If>

      {/* ----------- Clear & Reset----------- */}
      <Button
        className={'ml1'}
        disabled={isSubmitting}
        onClick={handleClearBtnClick}
        text={estimate ? <T id={'reset'} /> : <T id={'clear'} />}
      />

      {/* ----------- Cancel ----------- */}
      <Button className={'ml1'} disabled={isSubmitting} onClick={handleCancelBtnClick} text={<T id={'cancel'} />} />
    </div>
  );
}
