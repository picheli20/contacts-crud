import { FormControl } from '@angular/forms';

import { GlobalValidator } from './validatos';

describe('GlobalValidator', () => {
  describe('.mailFormat()', () => {
    ['test@test.com', 'test.test@test.co', 'test-tt@gmail.com'].map(email => {
      it(`should validate as VALID the email: ${email}`, () => {
        let result;
        GlobalValidator.mailFormat({ value: email } as FormControl)
          .subscribe(res => result = res);

          expect(result).toEqual(null);
      });
    });
    ['test@test', 'test', 'test-tt@gmail.c', 'test@gmail'].map(email => {
      it(`should validate as INVALID the email: ${email}`, () => {
        let result;
        GlobalValidator.mailFormat({ value: email } as FormControl)
          .subscribe(res => result = res);

          expect(result).toEqual({ invalid: true });
      });
    });
  });
});
