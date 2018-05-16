import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ContactFormComponent } from './contact-form.component';

import { reducer, State } from '../../reducers/contact.reducer';
import { ContactActionTypes } from 'app/contact/actions/contact.action';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({
          'contact': reducer
        }),
      ],
      declarations: [
        ContactFormComponent,
      ],
      providers: [
        FormBuilder,
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.constructor()', () => {
    it('should create the form', () => {
      expect(component.form.controls['name']).toBeTruthy();
      expect(component.form.controls['surname']).toBeTruthy();
      expect(component.form.controls['email']).toBeTruthy();
      expect(component.form.controls['country']).toBeTruthy();
    });
  });

  describe('.submit()', () => {
    it('should NOT submit if the form is invalid', () => {
      component.submit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should submit if the form is valid', () => {
      const payload: any = {
        name: 'Leia',
        surname: 'Organa',
        email: 'leia123princess@gmail.com',
        country: 'Alderaan',
      };

      Object.keys(payload).map(i => component.form.controls[i].setValue(payload[i]));

      component.submit();

      expect(store.dispatch).toHaveBeenCalledWith({ type: ContactActionTypes.Create, payload });

    });
  });

});
