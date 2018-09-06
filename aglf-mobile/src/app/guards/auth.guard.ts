import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('$$$$$', state.url);
        if (this.authService.isAuthenticated()) {
            if (state.url.indexOf('login') > 0) {
                this.router.navigate(['/status']);
            }
            return true;
        }
        else {
            // TODO: navigate to login
            this.router.navigate(['/list']);
        }

        return false;
    }
}
