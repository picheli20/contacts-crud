import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactEffects } from './effects/contact.effects';
import { reducer } from './reducers/contact.reducer';
import { ContactComponent } from './components/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('contact', reducer),
    EffectsModule.forFeature([ContactEffects]),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    BrowserAnimationsModule,
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
