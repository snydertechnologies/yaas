import { LaunchLink } from '@bigcapital/webapp/containers/Banking/Plaid/PlaidLanchLink';
import { useGetBankingPlaidToken } from '@bigcapital/webapp/hooks/state/banking';

export function CashflowAccountsPlaidLink() {
  const plaidToken = useGetBankingPlaidToken();

  if (!plaidToken) {
    return null;
  }
  return <LaunchLink token={plaidToken} />;
}
