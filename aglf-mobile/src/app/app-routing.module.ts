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
        path: 'status',
        loadChildren: './status/status.module#StatusPageModule',
        canActivate: [ AuthGuard ]
    },
    {
        path: 'team',
        loadChildren: './team/team.module#TeamPageModule',
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
