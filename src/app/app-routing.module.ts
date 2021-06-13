import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // Lazy loaded feature module
  { path: 'home', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
      { path: 'login', loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule), canActivate:[LoggedInGuard]},
  { path: 'register', loadChildren: () => import('./features/register/register.module').then((m) => m.RegisterModule), canActivate:[LoggedInGuard]},
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
