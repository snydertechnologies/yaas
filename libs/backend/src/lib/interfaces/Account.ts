export interface IAccountDTO {
  name: string;
  code: string;
  description: string;
  accountType: string;
  parentAccountId?: number;
  active: boolean;
  bankBalance?: number;
  accountMask?: string;
}
