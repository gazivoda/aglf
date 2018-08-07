import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayersService } from 'app/aglf-services/players.service';
import { UserService } from 'app/aglf-services/user.service';
import { Player, Position } from 'app/aglf-classes/player';

@Component({
    selector: 'app-team-overview',
    templateUrl: './team-overview.component.html',
    styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    players = [];
    selectedPlayers = new Array(15);

    constructor(private playersService: PlayersService, private userService: UserService) { }

    ngOnInit() {
        this.playersService.getPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe(players => {
                this.players = players;
            });

        this.userService.getSelectedPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe(players => {
                this.selectedPlayers = players;
            });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    selectPlayerEventHandler(player: Player) {
        if (player instanceof Player) {
            this.userService.addPlayer(player);
        }
    }
}
