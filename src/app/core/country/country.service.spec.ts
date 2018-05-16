import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

import { CountryService } from './country.service';


const gqlResponse = {
  data: {
    country: [
      {
        name: 'test',
        code: 'te',
      }
    ]
  }
}

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountryService,
        {
          provide: Apollo,
          useValue: {
            query: () => of(gqlResponse).pipe(delay(0)),
          },
        }
      ],
    });
  });

  it('should create', inject([CountryService], (service: CountryService) => {
    expect(service).toBeDefined();
  }));

  it('should return only the country array', fakeAsync(
    inject([CountryService], (service: CountryService) => {
      let resp;
      service.countries$.subscribe(data => resp = data);
      tick(10);
      expect(resp).toEqual(gqlResponse.data.country);
    })),
  );
});
