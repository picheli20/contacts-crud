import { FormControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

export class GlobalValidator {
  static mailFormat(control: FormControl) {
    // tslint:disable:next-line max-line-length
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return of(control.value && !EMAIL_REGEXP.test(control.value)).pipe(
      map(result => result ? { invalid: true } : null),
    );
  }
}
