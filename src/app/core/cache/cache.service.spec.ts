import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { CacheService } from './cache.service';
import { STORAGE_TOKEN } from './cache.token';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CacheService,
        {
          provide: STORAGE_TOKEN,
          useValue: {
            clear: () => {},
            getItem: () => '{ "a": 1}',
            removeItem: () => {},
            setItem: () => {},
          },
        },
      ],
    });
  });

  describe('.setItem()', () => {
    it('should call storage.setItem()', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'setItem');

      const subscription = service.setItem('test', 123).subscribe();

      expect(storage.setItem).toHaveBeenCalledWith('test', '123');

      subscription.unsubscribe();
    }));

    it('should not  call storage.setItem() if storage is unavailable', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'setItem');

      service.isStorageEnable = false;
      service.setItem('test', 123).subscribe();

      expect(storage.setItem).not.toHaveBeenCalled();
    }));
  });

  describe('.getItem()', () => {
    it('should call storage.getItem()', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'getItem').and.callFake(() => '{ "a": 1}');

      const subscription = service.getItem('test').subscribe();

      expect(storage.getItem).toHaveBeenCalledWith('test');

      subscription.unsubscribe();
    }));

    it('should not  call storage.getItem() if storage is unavailable', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'getItem');

      service.isStorageEnable = false;
      const subscription = service.getItem('test').subscribe();

      expect(storage.getItem).not.toHaveBeenCalled();

      subscription.unsubscribe();
    }));

    it('should return a observable', inject([ CacheService ], (service: CacheService) => {
      expect(service.getItem('test') instanceof Observable).toBeTruthy();
    }));
  });

  describe('.clear()', () => {
    it('should call storage.clear()', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'clear');

      service.clear().subscribe();

      expect(storage.clear).toHaveBeenCalled();
    }));
  });

  describe('.removeItem()', () => {
    it('should call storage.removeItem()', inject([
      CacheService,
      STORAGE_TOKEN,
    ], (service: CacheService, storage: Storage) => {
      spyOn(storage, 'removeItem');

      service.removeItem('abc').subscribe();

      expect(storage.removeItem).toHaveBeenCalledWith('abc');
    }));
  });
});
