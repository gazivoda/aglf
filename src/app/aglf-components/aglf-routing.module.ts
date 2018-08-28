import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { LeaderboardOverviewComponent } from './leaderboard-overview/leaderboard-overview.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: TeamOverviewComponent,
                data: {
                    title: 'AGLF Team Overview'
                }
            },
            {
                path: 'leaderboard',
                component: LeaderboardOverviewComponent,
                data: {
                    title: 'AGLF Team Overview'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AglfRoutingModule {
}
