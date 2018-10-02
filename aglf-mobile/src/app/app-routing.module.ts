import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/status',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginPageModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterPageModule'
    },
    {
        path: 'forgot-password',
        loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule'
    },
    {
        path: 'status',
        loadChildren: './status/status.module#StatusPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'team',
        loadChildren: './team/team.module#TeamPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'leaderboard',
        loadChildren: './leaderboard/leaderboard.module#LeaderboardPageModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
