import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PitchComponent } from './pitch/pitch.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ],
  declarations: [
      PlayerCardComponent,
      PitchComponent,
      PlayerModalComponent,
      PlayerSelectionComponent
  ],
  entryComponents: [
    PlayerModalComponent
  ],
  exports: [
      PlayerCardComponent,
      PitchComponent,
      PlayerModalComponent,
      PlayerSelectionComponent
  ]
})
export class ComponentsModule { }
