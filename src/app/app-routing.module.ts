import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginformComponent } from './login-form/login-form.component';
import { UserlistComponent } from './user-list/user-list.component';
import { RegisterformComponent } from './register-form/register-form.component';
import { AppResolver } from './common/app-resolve.service';

const myRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'usersList', component: UserlistComponent },
  { path: 'addUser', component: RegisterformComponent },
  { path: 'editUser/:myId', component: RegisterformComponent, resolve: {data : AppResolver} }, 
]

@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
