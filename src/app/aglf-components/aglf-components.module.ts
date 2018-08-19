import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PitchComponent } from './pitch/pitch.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamsHeaderComponent } from './teams-header/teams-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AglfRoutingModule } from './aglf-routing.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        AglfRoutingModule
    ],
    declarations: [
        PitchComponent,
        PlayerSelectionComponent,
        PlayerCardComponent,
        TeamOverviewComponent,
        TeamsHeaderComponent
    ],
    exports: [
        TeamOverviewComponent,
        TeamsHeaderComponent,
        AglfRoutingModule
    ]
})
export class AglfComponentsModule {
}
