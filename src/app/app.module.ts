import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import {ToastrModule} from 'ngx-toastr';
import {AgmCoreModule} from '@agm/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from "./layouts/content/content-layout.component";
import {FullLayoutComponent} from "./layouts/full/full-layout.component";
import {DragulaService} from 'ng2-dragula';
import {AuthService} from 'app/shared/auth/auth.service';
import {AuthGuard} from 'app/shared/auth/auth-guard.service';
import {EndpointService} from 'app/aglf-services/endpoint.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import * as $ from 'jquery';

import {AglfComponentsModule} from 'app/aglf-components/aglf-components.module';
import {ContentPagesModule} from 'app/pages/content-pages/content-pages.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
    }),
    AglfComponentsModule,
    ContentPagesModule,
  ],
  providers: [
    EndpointService,
    AuthService,
    AuthGuard,
    DragulaService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
