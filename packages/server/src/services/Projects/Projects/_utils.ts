import { IItemEntry, IItemEntryDTO } from '@bigcapital/server/interfaces';

export const filterEntriesByRefType = (entries: (IItemEntry | IItemEntryDTO)[], projectRefType: string) => {
  return entries.filter((entry) => entry.projectRefType === projectRefType);
};
