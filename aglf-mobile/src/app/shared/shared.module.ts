import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    declarations: []
})
export class SharedModule { }
