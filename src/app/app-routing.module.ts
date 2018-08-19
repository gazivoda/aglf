import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FullLayoutComponent} from "./layouts/full/full-layout.component";
import {ContentLayoutComponent} from "./layouts/content/content-layout.component";

import {Full_ROUTES} from "./shared/routes/full-layout.routes";
import {CONTENT_ROUTES} from "./shared/routes/content-layout.routes";

import {AuthGuard} from './shared/auth/auth-guard.service';

import {TeamOverviewComponent} from 'app/aglf-components/team-overview/team-overview.component';
import {LoginPageComponent} from './pages/content-pages/login/login-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: 'pages/login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {title: 'full Views'},
    children: Full_ROUTES,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: {title: 'content Views'},
    children: CONTENT_ROUTES,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
