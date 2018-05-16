import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

import { CacheService } from 'app/core/cache/cache.service';

import {
  ContactActionTypes,
  Create
} from '../actions/contact.action';
import {
  deleteReducer,
  editReducer,
  createReducer,
} from '../reducers/contact.reducer';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactEffects {

  private readonly STORAGE_KEY = 'contact';

  constructor(
    private actions$: Actions,
    private service: CacheService,
    private store: Store<Contact>,
  ) {
    this.service.getItem<Contact[]>(this.STORAGE_KEY).subscribe(data =>
      this.store.dispatch({ type: ContactActionTypes.Rehydrate, payload: data }),
    );
  }

  @Effect({ dispatch: false })
  create$ = this.getAction(ContactActionTypes.Create).pipe(
    map(payload => {
      payload.id = Date.now();
      return payload;
    }),
    concatMap(contact =>
      this.service.getItem<Contact[]>(this.STORAGE_KEY)
        .pipe(
          map(contacts => createReducer(contacts || [], contact)),
          concatMap(contacts => this.service.setItem(this.STORAGE_KEY, contacts)),
        ),
    ),
  );

  @Effect({ dispatch: false })
  delete$ = this.getAction(ContactActionTypes.Delete).pipe(
    concatMap(contact =>
      this.service.getItem<Contact[]>(this.STORAGE_KEY)
        .pipe(
          map(contacts => deleteReducer(contacts || [], contact)),
          concatMap(contacts => this.service.setItem(this.STORAGE_KEY, contacts)),
        ),
    ),
  );

  @Effect({ dispatch: false })
  edit$ = this.getAction(ContactActionTypes.Edit).pipe(
    concatMap(contact =>
      this.service.getItem<Contact[]>(this.STORAGE_KEY)
        .pipe(
          map(contacts => editReducer(contacts || [], contact)),
          concatMap(contacts => this.service.setItem(this.STORAGE_KEY, contacts)),
        ),
    ),
  );

  getAction(type: ContactActionTypes): Observable<Contact> {
    return this.actions$.pipe(
      ofType<Create>(type),
      map(item => item.payload),
    );
  }
}
