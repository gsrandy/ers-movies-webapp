import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app-routing.module';
import { CatalogService } from './services/catalog.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ApplicationService } from './services/application.service';
import { AuthInterceptor } from './services/auth/auth-interceptor.service';
import { AuthService } from './services/auth/auth.service';
import { MovieRentService } from './services/movie-rent.service';

const AUTH_INTERCEPTOR_PROVIDER = {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true};

const PROVIDERS = [
  AUTH_INTERCEPTOR_PROVIDER,
    AuthService,
    ApplicationService,
    CatalogService,
    MovieRentService
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    APP_ROUTING
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
