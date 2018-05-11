import { ContactActionTypes, ContactActionsUnion } from '../actions/contact.action';
import { Contact } from '../models/contact.model';

export interface State {
  contacts: Contact[] | null;
}

export const initialState: State = {
  contacts: [],
};

export function reducer(state = initialState, { type, payload }: ContactActionsUnion): State {
  switch (type) {
    case ContactActionTypes.Create:
      return {
        ...state,
        contacts: createReducer(state.contacts, payload as Contact),
      };

    case ContactActionTypes.Delete:
      return {
        ...state,
        contacts: deleteReducer(state.contacts, payload as Contact),
      };

    case ContactActionTypes.Edit:
      return {
        ...state,
        contacts: editReducer(state.contacts, payload as Contact),
      };

    case ContactActionTypes.Rehydrate:
      return {
        ...state,
        contacts: payload as Contact[] || [],
      };

    default:
      return state;
  }
}

export const deleteReducer = (list: Contact[], item: Contact): Contact[] => {
  return list.filter((contact: Contact) => contact.id !== item.id);
}

export const editReducer = (list: Contact[], item: Contact): Contact[] => {
  return list.map((contact: Contact) => contact.id === item.id ? { ...contact, ...item } : contact);
}

export const createReducer = (list: Contact[], item: Contact): Contact[] => {
  return [ ...list, item ];
}
