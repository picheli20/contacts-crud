import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactComponent } from './components/contact.component';
import { ContactEffects } from './effects/contact.effects';
import { reducer } from './reducers/contact.reducer';

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
  ],
})
export class ContactModule { }
