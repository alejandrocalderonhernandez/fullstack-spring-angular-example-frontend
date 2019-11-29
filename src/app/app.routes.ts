import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from './components/clients/form/form.component';
import { ClientsComponent } from './components/clients/clients.component';

const APP_ROUTES: Routes = [
    {path: 'clients', component: ClientsComponent},
    {path: 'clients/form', component: FormComponent},
    {path: 'clients/form/:id', component: FormComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'clients'}
  ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
