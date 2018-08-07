import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayersService } from 'app/aglf-services/players.service';
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

    constructor(private playersService: PlayersService) { }

    ngOnInit() {
        this.playersService.getPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe(players => {
                this.players = players;
                //this.selectedPlayers = players;
            });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    selectPlayerEventHandler(player: Player) {
        if (player instanceof Player) {
            switch (player.position) {
                case Position.GOALKEEPER:
                    this.addGoalkeeper(player);
                    break;

                case Position.DEFENDER:
                    this.addDefender(player);
                    break;

                case Position.MIDFILDER:
                    this.addMidfielder(player);
                    break;

                case Position.STRIKER:
                    this.addStriker(player);
                    break;
            }
        }
    }

    addGoalkeeper(player: Player) {
        if (this.selectedPlayers[0] && this.selectedPlayers[1]) {
            console.log('cannot add any more gks');
        } else if (this.selectedPlayers[0]) {
            this.selectedPlayers[1] = new Player(player);
        } else {
            this.selectedPlayers[0] = new Player(player);
        }
    }

    addDefender(player: Player) {
        if (this.selectedPlayers[2] && this.selectedPlayers[3] && this.selectedPlayers[4] && this.selectedPlayers[5] && this.selectedPlayers[6]) {
            console.log('cannot add any more dfs');
        } else if (this.selectedPlayers[5]) {
            this.selectedPlayers[6] = new Player(player);
        } else if (this.selectedPlayers[4]) {
            this.selectedPlayers[5] = new Player(player);
        } else if (this.selectedPlayers[3]) {
            this.selectedPlayers[4] = new Player(player);
        } else if (this.selectedPlayers[2]) {
            this.selectedPlayers[3] = new Player(player);
        } else {
            this.selectedPlayers[2] = new Player(player);
        }
    }

    addMidfielder(player: Player) {
        if (this.selectedPlayers[7] && this.selectedPlayers[8] && this.selectedPlayers[9] && this.selectedPlayers[10] && this.selectedPlayers[11]) {
            console.log('cannot add any more mfs');
        } else if (this.selectedPlayers[10]) {
            this.selectedPlayers[11] = new Player(player);
        } else if (this.selectedPlayers[9]) {
            this.selectedPlayers[10] = new Player(player);
        } else if (this.selectedPlayers[8]) {
            this.selectedPlayers[9] = new Player(player);
        } else if (this.selectedPlayers[7]) {
            this.selectedPlayers[8] = new Player(player);
        } else {
            this.selectedPlayers[7] = new Player(player);
        }
    }

    addStriker(player: Player) {
        if (this.selectedPlayers[12] && this.selectedPlayers[13] && this.selectedPlayers[14]) {
            console.log('cannot add any more sts');
        } else if (this.selectedPlayers[13]) {
            this.selectedPlayers[14] = new Player(player);
        } else if (this.selectedPlayers[12]) {
            this.selectedPlayers[13] = new Player(player);
        } else {
            this.selectedPlayers[12] = new Player(player);
        }
    }

}
