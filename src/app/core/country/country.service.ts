import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { ICountryResponse, query } from './country.graphql';
import { pluck } from 'rxjs/operators/pluck';

@Injectable()
export class CountryService {

  countries$ = this.apollo.query<ICountryResponse>({ query }).pipe(
    pluck('data'),
    pluck('country'),
  );


  constructor(private apollo: Apollo) { }
}
