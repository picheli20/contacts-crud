import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ContactActionTypes } from '../actions/contact.action';
import { Contact } from '../models/contact.model';
import { State } from '../reducers/contact.reducer';
import { animations } from './contact.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations,
})
export class ContactComponent {
  contact$: Observable<State>;

  constructor(
    private store: Store<Contact>,
    private sanitizer: DomSanitizer,
  ) {
    this.contact$ = store.pipe(select('contact'));
  }

  delete(contact: Contact) {
    this.store.dispatch({ type: ContactActionTypes.Delete, payload: contact });
  }

  getImageUrl(code: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(/assets/flags/${code.toLocaleLowerCase()}.png)`);
  }
}
