import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PitchComponent } from './pitch/pitch.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ],
  declarations: [
      PlayerCardComponent,
      PitchComponent,
      PlayerModalComponent
  ],
  entryComponents: [
    PlayerModalComponent
  ],
  exports: [
      PlayerCardComponent,
      PitchComponent,
      PlayerModalComponent
  ]
})
export class ComponentsModule { }
