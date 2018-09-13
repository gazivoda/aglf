import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ChartistModule } from 'ng-chartist';

import { StatusPage } from './status.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: StatusPage
            }
        ]),
        ChartistModule
    ],
    declarations: [StatusPage]
})
export class StatusPageModule { }
