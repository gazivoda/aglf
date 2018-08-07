import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PitchComponent } from './pitch/pitch.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
      PitchComponent,
      PlayerSelectionComponent,
      PlayerCardComponent,
      TeamOverviewComponent
  ]
})
export class AglfComponentsModule { }
