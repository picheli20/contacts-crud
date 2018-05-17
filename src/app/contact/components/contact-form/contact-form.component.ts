import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators/pluck';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

import { Contact } from '../../models/contact.model';
import { ContactActionTypes } from '../../actions/contact.action';
import { State } from '../../reducers/contact.reducer';
import { animations } from './contact-form.animations';

import { CountryService } from 'app/core/country/country.service';
import { ICountry } from 'app/core/country/country.graphql';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  animations,
})
export class ContactFormComponent implements OnDestroy {
  contact$: Observable<State>;
  form: FormGroup;

  private subscriptions = new Subscription();

  editing = false;

  countries$ = this.countryService.countries$;

  constructor(
    private fb: FormBuilder,
    private store: Store<Contact>,
    private countryService: CountryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.contact$ = store.pipe(select('contact'));

    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
    });

    const activateParamsSubscription = this.activatedRoute.params.pipe(
      pluck('id'),
      filter(Boolean),
      map(Number),
      switchMap(id =>
        this.contact$.pipe(
          pluck('contacts'),
          map((contacts: Contact[]) => contacts.filter(item => item.id === id)),
          pluck('0'),
        )
      ),
      tap(() => this.editing = true),
    ).subscribe((contact: Contact) =>
      this.form = this.fb.group({
        id: [contact.id, Validators.required],
        name: [contact.name, Validators.required],
        surname: [contact.surname, Validators.required],
        email: [contact.email, Validators.required],
        country: [contact.country, Validators.required],
      }),
    );

    this.subscriptions.add(activateParamsSubscription);
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch({
      type: ContactActionTypes[this.editing ? 'Edit' : 'Create'],
      payload: this.form.value,
    });

    this.router.navigate(['/']);
  }

  compareByCode(c1: ICountry, c2: ICountry) {
    return c1.code === c2.code;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
