import { IItemEntry, IItemEntryDTO } from '@bigcapital/libs-backend';

export const filterEntriesByRefType = (entries: (IItemEntry | IItemEntryDTO)[], projectRefType: string) => {
  return entries.filter((entry) => entry.projectRefType === projectRefType);
};
