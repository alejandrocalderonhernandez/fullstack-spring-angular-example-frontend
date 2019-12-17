import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/clients/form/form.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { UserGuard } from './guards/user.guard';
import { RolesGuard } from './guards/roles.guard';

const APP_ROUTES: Routes = [
    {path: 'clients', component: ClientsComponent},
    {path: 'clients/page/:page', component: ClientsComponent},
    {path: 'clients/form',
     component: FormComponent,
     canActivate: [UserGuard, RolesGuard],
     data: { role: 'ROLE_ADMIN'}
    },
    {path: 'clients/form/:id',
     component: FormComponent,
     canActivate: [UserGuard, RolesGuard],
     data: {role: 'ROLE_ADMIN'}
    },
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'clients'}
  ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
