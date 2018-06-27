import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ContactComponent } from './contact.component';

import { ContactActionTypes } from '../actions/contact.action';
import { Contact } from '../models/contact.model';
import { reducer, State } from '../reducers/contact.reducer';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({
          contact: reducer,
        }),
      ],
      declarations: [
        ContactComponent,
      ],
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.delete()', () => {
    it('should dispatch an action to delete', () => {
      const payload = { id: 123 } as Contact;
      component.delete(payload);
      expect(store.dispatch).toHaveBeenCalledWith({ type: ContactActionTypes.Delete, payload });
    });
  });
});
