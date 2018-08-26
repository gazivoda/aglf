import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Position, PlayerData, mapPlayerData } from 'app/aglf-classes/player';
import { EndpointService } from 'app/aglf-services/endpoint.service';
import { PlayersService } from 'app/aglf-services/players.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _selectedPlayers$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(new Array(15));
    private _budget$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);

    constructor(private endpointService: EndpointService, private playersService: PlayersService) {

    }

    getSelectedPlayers(): Observable<Player[]> {
        return this._selectedPlayers$.asObservable();
    }

    setSelectedPlayers(selectedPlayers: any[]): void {
        selectedPlayers = selectedPlayers.map(mapPlayerData);
        selectedPlayers.forEach((player: Player) => {
            this.addPlayer(player, false);
        });
    }

    getUserDetails(userId?: number): Observable<any> {
        return this.endpointService.getUserDetails(userId);
    }

    getBudget(): Observable<number> {
        return this._budget$.asObservable();
    }

    addPlayer(player: Player, update: boolean) {
        if (this.checkIfPlayerExists(player)) {
            console.log(player.fullName, ' is already in the team. ID =', player.id);
        } else {
            if (this.checkBudget(player.price)) {
                switch (player.position) {
                    case Position.GOALKEEPER:
                        this.addGoalkeeper(player, update);
                        break;

                    case Position.DEFENDER:
                        this.addDefender(player, update);
                        break;

                    case Position.MIDFIELDER:
                        this.addMidfielder(player, update);
                        break;

                    case Position.STRIKER:
                        this.addStriker(player, update);
                        break;
                }
            } else {
                console.log('insufficient funds');
            }
        }
    }

    pushSelectedPlayersNextState(selectedPlayers: Player[], index: number, player: Player, update: boolean) {
        selectedPlayers[index] = new Player(player);

        this._selectedPlayers$.next(selectedPlayers);
        this._budget$.next(this._budget$.value - player.price);

        if (update === true) {
            let playersData: PlayerData[] = selectedPlayers.map((player: Player) => new PlayerData({
                id: player.id
            }));
            this.playersService.setPlayers(playersData).subscribe(res => console.log(res));
        }
    }

    checkIfPlayerExists(player: Player): boolean {
        return this._selectedPlayers$.value.find(p => p ? p.id === player.id : false) ? true : false;
    }

    checkBudget(price: number): boolean {
        return this._budget$.value - price >= 0;
    }

    addGoalkeeper(player: Player, update: boolean) {
        let selectedPlayers = this._selectedPlayers$.value;
        let budget = this._budget$.value;
        if (selectedPlayers[0] && selectedPlayers[1]) {
            console.log('cannot add any more gks');
        } else if (selectedPlayers[0]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 1, player, update);
        } else {
            this.pushSelectedPlayersNextState(selectedPlayers, 0, player, update);
        }
    }

    addDefender(player: Player, update: boolean) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[2] && selectedPlayers[3] && selectedPlayers[4] && selectedPlayers[5] && selectedPlayers[6]) {
            console.log('cannot add any more dfs');
        } else if (selectedPlayers[5]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 6, player, update);
        } else if (selectedPlayers[4]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 5, player, update);
        } else if (selectedPlayers[3]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 4, player, update);
        } else if (selectedPlayers[2]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 3, player, update);
        } else {
            this.pushSelectedPlayersNextState(selectedPlayers, 2, player, update);
        }
    }

    addMidfielder(player: Player, update: boolean) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[7] && selectedPlayers[8] && selectedPlayers[9] && selectedPlayers[10] && selectedPlayers[11]) {
            console.log('cannot add any more mfs');
        } else if (selectedPlayers[10]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 11, player, update);
        } else if (selectedPlayers[9]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 10, player, update);
        } else if (selectedPlayers[8]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 9, player, update);
        } else if (selectedPlayers[7]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 8, player, update);
        } else {
            this.pushSelectedPlayersNextState(selectedPlayers, 7, player, update);
        }
    }

    addStriker(player: Player, update: boolean) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[12] && selectedPlayers[13] && selectedPlayers[14]) {
            console.log('cannot add any more sts');
        } else if (selectedPlayers[13]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 14, player, update);
        } else if (selectedPlayers[12]) {
            this.pushSelectedPlayersNextState(selectedPlayers, 13, player, update);
        } else {
            this.pushSelectedPlayersNextState(selectedPlayers, 12, player, update);
        }
    }
}
