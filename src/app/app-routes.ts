import { Routes } from '@angular/router';
import { EditApplicationComponent } from './edit-contact/edit-application.component';

export const APP_ROUTES: Routes = [
  {
    path: 'contacts/edit/:id',
    component: EditApplicationComponent,
    title: 'Contacts - Edit'
  },
  {
    path: 'contacts/edit',
    component: EditApplicationComponent,
    title: 'Contacts - Edit'
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];


