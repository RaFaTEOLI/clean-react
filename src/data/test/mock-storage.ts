/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class SetStorageSpy implements SetStorage {
  key: string;
  value: any;
  // eslint-disable-next-line @typescript-eslint/require-await
  async set(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
  }
}
