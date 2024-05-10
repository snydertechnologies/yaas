import { useCurrentOrganization } from '@/hooks/state';
import { useFormikContext } from 'formik';
import React, { ComponentType, ReactNode, useCallback, useEffect } from 'react';
import { useAutoExRateContext } from './AutoExchangeProvider';
import { useUpdateEntriesOnExchangeRateChange } from './useUpdateEntriesOnExchangeRateChange';

type WithExtraProps<P> = P & {
  onRecalcConfirm?: ({ exchangeRate, oldExchangeRate }: { exchangeRate: number; oldExchangeRate: number }) => void;
};

/**
 * Re-calculate the item entries prices based on the old exchange rate.
 * @param {InvoiceExchangeRateInputFieldRoot} Component
 * @returns {JSX.Element}
 */
export const withExchangeRateItemEntriesPriceRecalc =
  <P extends {}>(Component: ComponentType<WithExtraProps<P>>) =>
  (props: P) => {
    const { setFieldValue } = useFormikContext();
    const updateChangeExRate = useUpdateEntriesOnExchangeRateChange();

    return (
      // @ts-ignore - Ignore the type error for now, we'll fix later
      <Component
        {...props}
        onRecalcConfirm={({ exchangeRate, oldExchangeRate }) => {
          setFieldValue('entries', updateChangeExRate(oldExchangeRate, exchangeRate));
        }}
      />
    );
  };

/**
 * Injects the loading props to the exchange rate field.
 * @param Component
 * @returns {}
 */
export const withExchangeRateFetchingLoading = (Component: JSX.IntrinsicAttributes) => (props: any) => {
  const { isAutoExchangeRateLoading } = useAutoExRateContext();

  return (
    // @ts-ignore - Ignore the type error for now, we'll fix later
    <Component
      isLoading={isAutoExchangeRateLoading}
      inputGroupProps={{
        disabled: isAutoExchangeRateLoading,
      }}
    />
  );
};

/**
 * Updates the customer currency code and exchange rate once you update the customer
 * then change the state to fetch the realtime exchange rate of the new selected currency.
 */
export const useCustomerUpdateExRate = () => {
  const { setFieldValue, values } = useFormikContext();
  // @ts-ignore - Ignore the type error for now, we'll fix later
  const { setAutoExRateCurrency } = useAutoExRateContext();

  const updateEntriesOnExChange = useUpdateEntriesOnExchangeRateChange();
  const currentCompany = useCurrentOrganization();

  const DEFAULT_EX_RATE = 1;

  return useCallback(
    (customer) => {
      // Reset the auto exchange rate currency cycle.
      setAutoExRateCurrency(null);

      // If the customer's currency code equals the same base currency.
      if (customer.currency_code === currentCompany.base_currency) {
        setFieldValue('exchange_rate', `${DEFAULT_EX_RATE}`);
        // @ts-ignore - Ignore the type error for now, we'll fix later
        setFieldValue('entries', updateEntriesOnExChange(values.exchange_rate, DEFAULT_EX_RATE));
      } else {
        // Sets the currency code to fetch exchange rate of the given currency code.
        setAutoExRateCurrency(customer?.currency_code);
      }
    },
    // @ts-ignore - Ignore the type error for now, we'll fix later
    [currentCompany.base_currency, setAutoExRateCurrency, setFieldValue, updateEntriesOnExChange, values.exchange_rate],
  );
};

interface UseSyncExRateToFormProps {
  onSynced?: () => void;
}

/**
 * Syncs the realtime exchange rate to the Formik form and then re-calculates
 * the entries rate based on the given new and old ex. rate.
 * @param {UseSyncExRateToFormProps} props -
 * @returns {React.ReactNode}
 */
export const useSyncExRateToForm = ({ onSynced }: UseSyncExRateToFormProps) => {
  const { setFieldValue, values } = useFormikContext();
  // @ts-ignore - Ignore the type error for now, we'll fix later
  const { autoExRateCurrency, autoExchangeRate, isAutoExchangeRateLoading } = useAutoExRateContext();
  const updateEntriesOnExChange = useUpdateEntriesOnExchangeRateChange();

  // Sync the fetched real-time exchanage rate to the form.
  useEffect(() => {
    if (!isAutoExchangeRateLoading && autoExRateCurrency) {
      // Sets a default ex. rate to 1 in case the exchange rate service wasn't configured.
      // or returned an error from the server-side.
      const exchangeRate = autoExchangeRate?.exchange_rate || 1;
      setFieldValue('exchange_rate', `${exchangeRate}`);
      // @ts-ignore - Ignore the type error for now, we'll fix later
      setFieldValue('entries', updateEntriesOnExChange(values.exchange_rate, exchangeRate));
      onSynced?.();
    }
  }, [autoExchangeRate?.exchange_rate, autoExRateCurrency, isAutoExchangeRateLoading]);

  return null;
};
