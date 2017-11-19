import { DataService } from './services/data.service';
import { fakeBackendProvider } from './fake-backend';
import { MockBackend } from '@angular/http/testing';
import { UserService } from './login/user.service';
import { AuthenticationService } from './login/authentication.service';
import { AlertService } from './alert/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterializeModule } from 'angular2-materialize';
import { LoginComponent } from './login/login.component';

import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PanelComponent } from './home/panel/panel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    PanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    
    AppRoutingModule,
    FormsModule,
    MaterializeModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    DataService,
    UserService,
    

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
