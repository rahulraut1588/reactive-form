import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { RegisterformComponent } from './register-form/register-form.component';
import { UserlistComponent } from './user-list/user-list.component';
import { LoginformComponent } from './login-form/login-form.component';

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

const myRoutes = [
  { path: '', redirectTo:'/login', pathMatch:'full' },
  { path: 'login', component: LoginformComponent },
  { path: 'usersList', component: UserlistComponent },
  { path: 'addUser', component: RegisterformComponent },
  { path: 'editUser/:myId', component: RegisterformComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterformComponent,
    UserlistComponent,
    LoginformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(myRoutes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
