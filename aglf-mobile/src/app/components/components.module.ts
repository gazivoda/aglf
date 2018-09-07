import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PitchComponent } from './pitch/pitch.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      PlayerCardComponent,
      PitchComponent,
      ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
      PlayerCardComponent,
      PitchComponent,
      ModalComponent
  ]
})
export class ComponentsModule { }
