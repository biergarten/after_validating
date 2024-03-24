import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditApplicationComponent } from './edit-contact/edit-application.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
