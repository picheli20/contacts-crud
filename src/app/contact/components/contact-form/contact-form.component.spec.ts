import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

import { ContactFormComponent } from './contact-form.component';

import { reducer, State } from '../../reducers/contact.reducer';
import { ContactActionTypes } from '../../actions/contact.action';

import { CountryService } from 'app/core/country/country.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let store: Store<State>;
  const params = new Subject<Params>();


  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({ 'contact': reducer }),
        BrowserAnimationsModule,
      ],
      declarations: [
        ContactFormComponent,
      ],
      providers: [
        FormBuilder,
        {
          provide: CountryService,
          useValue: {
            countries$: of([
              { id: 1 }
            ]),
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: params,
          }
        },
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
    const payload: any = {
      id: 1,
      name: 'Leia',
      surname: 'Organa',
      email: 'leia123princess@gmail.com',
      country: 'Alderaan',
    };

    it('should create the form', () => {
      ['name', 'surname', 'email', 'country'].map(i => expect(component.form.controls[i]).toBeTruthy());
    });

    it('should set this.editing to true if received an ID', () => {

      store.dispatch({ type: ContactActionTypes.Create, payload });
      params.next({ id: 1 });
      fixture.detectChanges();

      expect(component.editing).toBeTruthy();
    });

    it('should set the form values to be editable', () => {
      store.dispatch({ type: ContactActionTypes.Create, payload });
      params.next({ id: 1 });
      fixture.detectChanges();

      expect(component.form.value).toEqual(payload);
    });
  });

  describe('.submit()', () => {
    const payload: any = {
      name: 'Leia',
      surname: 'Organa',
      email: 'leia123princess@gmail.com',
      country: 'Alderaan',
    };

    it('should NOT submit if the form is invalid', () => {
      component.submit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should submit if the form is valid', () => {

      Object.keys(payload).map(i => component.form.controls[i].setValue(payload[i]));

      component.submit();

      expect(store.dispatch).toHaveBeenCalledWith({ type: ContactActionTypes.Create, payload });

    });
  });

});
