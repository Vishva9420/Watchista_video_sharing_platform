import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormControl, FormGroup ,Validators } from '@angular/forms';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { Admin2LayoutComponent } from './layouts/admin2-layout/admin2-layout.component';
import { CanActivate } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';

import { 
  LoginAuthGaurdService as LoginGuard 
} from './login-auth-gaurd.service';

import {Login2AuthService as login2Guard } from './login2-auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TableListComponent } from './table-list/table-list.component';
import { CallDashComponent } from './call-dash/call-dash.component';
const routes: Routes =[
  {
    path: 'main-page',
    component: MainPageComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
 
  },
  // { path: 'call-dash', component: CallDashComponent},
  {
    path: 'login-page',
    component: LoginPageComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
  },
  {
    path: 'sign-up',
    component: TableListComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
  },
  {
    path: 'verify-otp',
    component: VerifyOtpComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    pathMatch: 'full',
    canActivate:[login2Guard]
  },
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full',
    canActivate:[login2Guard]
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'}
    ]
  },
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
     pathMatch: 'full',
     
  }, 
  {
    path: 'admin',
    component: Admin2LayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        loadChildren: './layouts/admin2-layout/admin2-layout.module#Admin2LayoutModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
