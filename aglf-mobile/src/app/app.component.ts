import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    showMenu: boolean = true;

    public appPages = [
        {
            title: 'Status',
            url: '/status',
            icon: 'home'
        },
        {
            title: 'Team',
            url: '/team',
            icon: 'list'
        },
        {
            title: 'Leaderboard',
            url: '/leaderboard',
            icon: 'list'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd)
            )
            .subscribe((event: NavigationEnd) => {
                if (event.url === '/login' || event.url === '/register') {
                    this.showMenu = false;
                } else {
                    this.showMenu = true;
                }
            });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
