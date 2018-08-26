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

    players: Player[] = [];
    selectedPlayers: Player[] = [];
    budget: number;

    constructor(private playersService: PlayersService, private userService: UserService) { }

    ngOnInit() {
        this.userService.getUserDetails()
            .subscribe((data: any) => {
                let selectedPlayers = data.players;
                this.userService.setSelectedPlayers(selectedPlayers);
            });

        this.playersService.getPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((players: Player[]) => {
                this.players = players;

                if (players.length > 0) {
                    let prices = players.map(player => player.price).filter(p => p !== null);
                    console.log(Math.max(...prices), Math.min(...prices));
                }
            });

        this.userService.getSelectedPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((selectedPlayers: Player[]) => {
                this.selectedPlayers = selectedPlayers;
            });

        this.userService.getBudget()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((budget: number) => {
                this.budget = budget;
            });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    selectPlayerEventHandler(player: Player) {
        if (player instanceof Player) {
            this.userService.addPlayer(player, true);
        }
    }
}
