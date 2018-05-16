import * as contactReducer from './contact.reducer';

import { State } from './contact.reducer';

import { Contact } from '../models/contact.model';
import { ContactActionTypes, ContactActionsUnion } from '../actions/contact.action';

describe('ContactReducer', () => {
  describe('.createReducer()', () => {
    it('should add the item to the list', () => {
      const result = contactReducer.createReducer([], { id: 1 } as Contact);
      expect(result[0].id).toBe(1);
    });
  });

  describe('.deleteReducer()', () => {
    it('should delete the item to the list', () => {
      const result = contactReducer.deleteReducer(
        [{ id: 1 } as Contact],
        { id: 1 } as Contact
      );
      expect(result.length).toBe(0);
    });
  });

  describe('.editReducer()', () => {
    it('should edit the item to the list', () => {
      const result = contactReducer.editReducer(
        [{ id: 1, name: 'Luke' } as Contact, { id: 2, name: 'Anakin' } as Contact],
        { id: 2, name: 'Darth' } as Contact
      );

      expect(result[1].name).toBe('Darth');
    });
  });

  describe('.reducer()', () => {
    describe('ContactActionTypes.Create', () => {
      it('should create a new contact', () => {
        const result = contactReducer.reducer({
          contacts: [ { id: 1, name: 'Luke' } ]
        } as State, {
          type: ContactActionTypes.Create,
          payload: { id: 2, name: 'Chewbacca' } as Contact
        });

        expect(result.contacts.length).toBe(2);
      });
    });

    describe('ContactActionTypes.Delete', () => {
      it('should delete the contact', () => {
        const result = contactReducer.reducer({
          contacts: [ { id: 1, name: 'Luke' } ]
        } as State, {
          type: ContactActionTypes.Delete,
          payload: { id: 1 } as Contact
        });

        expect(result.contacts.length).toBe(0);
      });
    });

    describe('ContactActionTypes.Create', () => {
      it('should create a new contact', () => {
        const result = contactReducer.reducer({
          contacts: [ { id: 1, name: 'Luke' } ]
        } as State, {
          type: ContactActionTypes.Edit,
          payload: { id: 1, name: 'Chewbacca' } as Contact
        });

        expect(result.contacts.length).toBe(1);
        expect(result.contacts[0]).toEqual({ id: 1, name: 'Chewbacca' } as Contact);
      });
    });

    describe('ContactActionTypes.Rehydrate', () => {
      it('should reload the contact list', () => {
        const result = contactReducer.reducer({
          contacts: [ { id: 1, name: 'Luke' } ]
        } as State, {
          type: ContactActionTypes.Rehydrate,
          payload: [{ id: 1, name: 'Chewbacca' } as Contact]
        });

        expect(result.contacts.length).toBe(1);
        expect(result.contacts[0]).toEqual({ id: 1, name: 'Chewbacca' } as Contact);
      });

      it('should reload the contact list if its null', () => {
        const result = contactReducer.reducer({ } as State, {
          type: ContactActionTypes.Rehydrate,
        } as ContactActionsUnion);

        expect(result.contacts.length).toBe(0);
      });
    });

    it('should return the default state', () => {
      const result = contactReducer.reducer({
        contacts: [ { id: 1, name: 'Luke' } ]
      } as State, {
        type: null,
        payload: [{ id: 1, name: 'Chewbacca' } as Contact]
      });

      expect(result.contacts.length).toBe(1);
      expect(result.contacts[0]).toEqual({ id: 1, name: 'Luke' } as Contact);
    });

    it('should use the default state if not defined', () => {
      const result = contactReducer.reducer(undefined, { type: null } as ContactActionsUnion);

      expect(result.contacts.length).toBe(0);
    });
  });
});
