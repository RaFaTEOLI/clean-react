/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
