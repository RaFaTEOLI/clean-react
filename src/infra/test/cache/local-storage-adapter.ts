/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    await localStorage.setItem(key, value);
  }
}
