import { NgModule } from '@angular/core';

import { CacheService } from './cache/cache.service';
import { STORAGE_TOKEN } from './cache/cache.token';
import { CountryService } from './country/country.service';

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
