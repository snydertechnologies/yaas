import { useDeepCompareEffect } from '@bigcapital/webapp/hooks/utils';
// @ts-nocheck
import { useFormikContext } from 'formik';

export function FormikObserver({ onChange }) {
  const { values } = useFormikContext();

  useDeepCompareEffect(() => {
    onChange(values);
  }, [values]);

  return null;
}

FormikObserver.defaultProps = {
  onChange: () => null,
};
