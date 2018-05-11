import { NgModule } from '@angular/core';

import { CacheService } from './cache/cache.service';
import { STORAGE_TOKEN } from 'app/core/cache/cache.token';


@NgModule({
  providers: [
    CacheService,
    {
      provide: STORAGE_TOKEN,
      useValue: localStorage,
    },
  ],
})
export class CoreModule { }
