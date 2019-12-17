import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clients/form/form.component';

import { APP_ROUTING } from './app.routes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProfileComponent } from './components/clients/profile/profile.component';
import { RegionComponent } from './components/region/region.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent,
    RegionComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
