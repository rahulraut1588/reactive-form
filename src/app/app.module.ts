import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { RegisterformComponent } from './register-form/register-form.component';
import { UserlistComponent } from './user-list/user-list.component';
import { LoginformComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './common/auth.service';
import { RegisterService } from './common/register.service';
import { ErrorDialogService } from './common/errordialog.service';
import { AppResolver } from './common/app-resolve.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';


const config = {
  apiKey: "AIzaSyAYs5ehh2vf7UYI6AfZVCa4jGS7D8dU1bA",
  authDomain: "user-authentication-c3cfc.firebaseapp.com",
  databaseURL: "https://user-authentication-c3cfc.firebaseio.com",
  projectId: "user-authentication-c3cfc",
  storageBucket: "user-authentication-c3cfc.appspot.com",
  messagingSenderId: "618263009805",
  appId: "1:618263009805:web:12f9170540159bb8ecd344",
  measurementId: "G-KDQJ6D8M2W"
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterformComponent,
    UserlistComponent,
    LoginformComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService, 
    RegisterService,
    ErrorDialogService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, 
      multi: true 
    },
    AppResolver
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
