import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'
import { ProfileComponent } from './pages/profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: LandingPageComponent
  },
  {
    path: 'login', component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'registrar', component: SignUpComponent,
    ...canActivate(redirectToHome)

  },
  {
    path: 'home', component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'perfil', component: ProfileComponent,
    ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
