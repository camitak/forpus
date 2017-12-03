import { PanelDetailComponent } from './configs/panel-detail/panel-detail.component';
import { TableConfigComponent } from './configs/table-config/table-config.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PanelComponent } from './home/panel/panel.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'painel', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'config', component: TableConfigComponent, canActivate: [AuthGuard], children: [
    { path: 'user', component: TableConfigComponent, canLoad: [AuthGuard] },
    { path: 'hour', component: TableConfigComponent, canLoad: [AuthGuard]}
  ]},
  { path: 'config/panel-config', component: TableConfigComponent, canActivate: [AuthGuard], children:[
    { path: ':id', component: PanelDetailComponent }
  ]},
  
  // otherwise redirect to home
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
