import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clients/form/form.component';

import { APP_ROUTING } from './app.routes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProfileComponent } from './components/clients/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
