import { Injectable, Inject } from '@angular/core';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { STORAGE_TOKEN } from './cache.token';

@Injectable()
export class CacheService {

  constructor(@Inject(STORAGE_TOKEN) private storage: Storage) { }

  setItem<T>(key: string, value: T) {
    return defer(() => of(this.storage.setItem(key, JSON.stringify(value))));
  }

  getItem<T>(key: string) {
    return defer(() => of<T>(JSON.parse(this.storage.getItem(key))));
  }

  clear() {
    return defer(() => of(this.storage.clear()));
  }

  removeItem(key: string) {
    return defer(() => of(this.storage.removeItem(key)));
  }
}
