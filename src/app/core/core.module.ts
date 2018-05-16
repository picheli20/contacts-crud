import { NgModule } from '@angular/core';

import { CountryService } from './country/country.service';
import { CacheService } from './cache/cache.service';
import { STORAGE_TOKEN } from './cache/cache.token';


@NgModule({
  providers: [
    CacheService,
    CountryService,
    {
      provide: STORAGE_TOKEN,
      useValue: localStorage,
    },
  ],
})
export class CoreModule { }
