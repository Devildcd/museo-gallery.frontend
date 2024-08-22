import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'iniciar-sesión', component: LoginComponent
      },
      // {
      //   path: 'register', component: RegisterComponent
      // },
      // {
      //   path: 'editar/usuario', component: EditUserComponent
      // },
      {
        path: '**', redirectTo: 'iniciar-sesión',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class AuthRoutingModule { }
