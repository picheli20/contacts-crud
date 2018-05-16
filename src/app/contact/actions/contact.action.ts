import { Action } from '@ngrx/store';

import { Contact } from '../models/contact.model';

export enum ContactActionTypes {
  Create = '[Contact] Create',
  Delete = '[Contact] Delete',
  Edit = '[Contact] Edit',
  Rehydrate = '[Contact] Rehydrate',
}

export class Create implements Action {
  readonly type = ContactActionTypes.Create;

  constructor(public payload: Contact) {}
}

export class Delete implements Action {
  readonly type = ContactActionTypes.Delete;

  constructor(public payload: Contact) {}
}

export class Edit implements Action {
  readonly type = ContactActionTypes.Edit;

  constructor(public payload: Contact) {}
}

export class Rehydrate implements Action {
  readonly type = ContactActionTypes.Rehydrate;

  constructor(public payload: Contact[]) {}
}

export type ContactActionsUnion =
  Create |
  Delete |
  Edit |
  Rehydrate;
