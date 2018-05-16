import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact/components/contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'add',
    component: ContactFormComponent,
    outlet: 'modal'
  },
  {
    path: 'edit/:id',
    component: ContactFormComponent,
    outlet: 'modal'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
