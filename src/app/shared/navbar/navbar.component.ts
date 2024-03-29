import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../auth/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  currentLang = 'en';
  toggleClass = 'ft-maximize';

  constructor(public translate: TranslateService,
              private router: Router,
              private authService: AuthService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['pages/login']);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    }
    else
      this.toggleClass = 'ft-maximize'
  }
}
