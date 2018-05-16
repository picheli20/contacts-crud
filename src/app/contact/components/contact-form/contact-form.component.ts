import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Contact } from '../../models/contact.model';
import { ContactActionTypes } from '../../actions/contact.action';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contact$: Observable<number>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<Contact>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.contact$ = store.pipe(select('contact'));
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.store.dispatch({
      type: ContactActionTypes.Create,
      payload: this.form.value,
    });
  }

}
