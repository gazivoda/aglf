import { ActivatedRouteSnapshot, CanActivate, Router, Route, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log('$$$$$', state.url);
        if (this.authService.isAuthenticated()) {
            if (state.url.indexOf('login') > 0) {
                this.router.navigate(['/status']);
            }
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }

        return false;
    }

    canLoad(route: Route): boolean {
        let canLoad: boolean = this.authService.isAuthenticated();
        if (!canLoad) {
            this.router.navigate(['/login']);
        }
        return canLoad;
    }
}
