import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions, getEffectsMetadata, EffectsMetadata } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ContactEffects } from './contact.effects';

import * as ContactActions from '../actions/contact.action';
import { reducer, State } from '../reducers/contact.reducer';
import { Contact } from '../models/contact.model';

import { CacheService } from 'app/core/cache/cache.service';


@Injectable()
export class ContactEffectsMock extends ContactEffects {

  getAction(): ReplaySubject<Contact> {
    const subject = new ReplaySubject<Contact>();
    subject.next({ id: 1, name: 'Krusk' } as Contact);
    return subject;
  }
}

describe('ContactEffects', () => {
  let store: Store<State>;
  let actions: ReplaySubject<any>;
  let effects: ContactEffects;
  let metadata: EffectsMetadata<ContactEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          'contact': reducer
        }),
      ],
      providers: [
        ContactEffectsMock,
        provideMockActions(() => actions),
        {
          provide: Actions,
          useValue: empty(),
        },
        {
          provide: CacheService,
          useValue: {
            setItem: () => of({}),
            getItem: () => of([]),
          }
        },
        {
          provide: Store,
          useValue: {
            dispatch: () => {},
          }
        }
      ],
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(Date, 'now').and.returnValue(123);
    effects = TestBed.get(ContactEffectsMock);
    metadata = getEffectsMetadata(effects);
  });

  describe('.constructor()', () => {
    it('should Rehydrate on the constructor',() => {

      expect(store.dispatch).toHaveBeenCalledWith({
        type: ContactActions.ContactActionTypes.Rehydrate,
        payload: [],
      });
    });
  });

  describe('.create$', () => {
    it('should register create$ that does not dispatch an action', () => {
      expect(metadata.create$).toEqual({ dispatch: false });
    });

    it('should work even with empty return', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of(null));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.create$.subscribe();

      expect(cache.setItem).toHaveBeenCalled();
    });

    it('should add id on the object', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.create$.subscribe();

      expect(cache.setItem).toHaveBeenCalledWith('contact', [ { id: 123, name: 'Krusk' } ]);
    });

    it('should push the item in the current array', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of([{ id: 1}]));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.create$.subscribe();

      expect(cache.setItem).toHaveBeenCalledWith('contact', [ { id: 1 }, { id: 123, name: 'Krusk' } ]);
    });
  });

  describe('.delete$', () => {
    it('should register create$ that does not dispatch an action', () => {
      expect(metadata.delete$).toEqual({ dispatch: false });
    });

    it('should work even with empty return', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of(null));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.delete$.subscribe();

      expect(cache.setItem).toHaveBeenCalled();
    });

    it('should remove the item in the current array', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of([{ id: 1 }]));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.delete$.subscribe();

      expect(cache.setItem).toHaveBeenCalledWith('contact', []);
    });
  });

  describe('.edit$', () => {
    it('should register create$ that does not dispatch an action', () => {
      expect(metadata.edit$).toEqual({ dispatch: false });
    });

    it('should work even with empty return', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of(null));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.edit$.subscribe();

      expect(cache.setItem).toHaveBeenCalled();
    });

    it('should edit the item in the current array', () => {
      const cache: CacheService = TestBed.get(CacheService);
      spyOn(cache, 'getItem').and.returnValue(of([{ id: 1, name: 'Vadania', surname: 'Crisp' }]));
      spyOn(cache, 'setItem').and.returnValue(of([]));

      effects.edit$.subscribe();

      expect(cache.setItem).toHaveBeenCalledWith('contact', [{ id: 1, name: 'Krusk', surname: 'Crisp' }]);
    });
  });
});
