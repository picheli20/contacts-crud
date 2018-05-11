import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ContactActionTypes } from '../actions/contact.action';
import { State } from '../reducers/contact.reducer';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact$: Observable<State>;

  constructor(private store: Store<Contact>) {
    this.contact$ = store.pipe(select('contact'));
  }

  delete(contact: Contact) {
    this.store.dispatch({ type: ContactActionTypes.Delete, payload: contact });
  }

  edit(contact: Contact) {
    this.store.dispatch({ type: ContactActionTypes.Edit, payload: contact });
  }
}
