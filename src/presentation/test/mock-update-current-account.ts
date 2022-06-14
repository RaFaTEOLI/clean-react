import { UpdateCurrentAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel;

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(account: AccountModel): Promise<void> {
    this.account = account;
  }
}
