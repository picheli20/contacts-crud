import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { ContactEffects } from './effects/contact.effects';
import { reducer } from './reducers/contact.reducer';
import { ContactComponent } from './components/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('contact', reducer),
    ReactiveFormsModule,
    EffectsModule.forFeature([ContactEffects]),
  ],
  declarations: [
    ContactComponent,
    ContactFormComponent,
  ],
  exports: [
    ContactComponent,
    ContactFormComponent,
  ]
})
export class ContactModule { }
