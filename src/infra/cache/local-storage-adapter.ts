/* eslint-disable lines-between-class-members */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string): any {
    return localStorage.getItem(key);
  }
}
