import { TransactionTypes } from '@bigcapital/server/data/TransactionTypes';

export const getTransactionTypeLabel = (transactionType: string) => {
  return TransactionTypes[transactionType];
};
