import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Position } from 'app/aglf-classes/player';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _selectedPlayers$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(new Array(15));

    constructor() { }

    getSelectedPlayers(): Observable<Player[]> {
        return this._selectedPlayers$.asObservable();
    }

    addPlayer(player: Player) {
        if (this.checkIfPlayerExists(player)) {
            console.log(player.fullName, ' is already in the team. ID =', player.id);
        } else {
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

    checkIfPlayerExists(player: Player): boolean {
        return this._selectedPlayers$.value.find(p => p ? p.id === player.id : false) ? true : false;
    }

    addGoalkeeper(player: Player) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[0] && selectedPlayers[1]) {
            console.log('cannot add any more gks');
        } else if (selectedPlayers[0]) {
            selectedPlayers[1] = new Player(player);
        } else {
            selectedPlayers[0] = new Player(player);
        }

        this._selectedPlayers$.next(selectedPlayers);
    }

    addDefender(player: Player) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[2] && selectedPlayers[3] && selectedPlayers[4] && selectedPlayers[5] && selectedPlayers[6]) {
            console.log('cannot add any more dfs');
        } else if (selectedPlayers[5]) {
            selectedPlayers[6] = new Player(player);
        } else if (selectedPlayers[4]) {
            selectedPlayers[5] = new Player(player);
        } else if (selectedPlayers[3]) {
            selectedPlayers[4] = new Player(player);
        } else if (selectedPlayers[2]) {
            selectedPlayers[3] = new Player(player);
        } else {
            selectedPlayers[2] = new Player(player);
        }

        this._selectedPlayers$.next(selectedPlayers);
    }

    addMidfielder(player: Player) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[7] && selectedPlayers[8] && selectedPlayers[9] && selectedPlayers[10] && selectedPlayers[11]) {
            console.log('cannot add any more mfs');
        } else if (selectedPlayers[10]) {
            selectedPlayers[11] = new Player(player);
        } else if (selectedPlayers[9]) {
            selectedPlayers[10] = new Player(player);
        } else if (selectedPlayers[8]) {
            selectedPlayers[9] = new Player(player);
        } else if (selectedPlayers[7]) {
            selectedPlayers[8] = new Player(player);
        } else {
            selectedPlayers[7] = new Player(player);
        }

        this._selectedPlayers$.next(selectedPlayers);
    }

    addStriker(player: Player) {
        let selectedPlayers = this._selectedPlayers$.value;
        if (selectedPlayers[12] && selectedPlayers[13] && selectedPlayers[14]) {
            console.log('cannot add any more sts');
        } else if (selectedPlayers[13]) {
            selectedPlayers[14] = new Player(player);
        } else if (selectedPlayers[12]) {
            selectedPlayers[13] = new Player(player);
        } else {
            selectedPlayers[12] = new Player(player);
        }

        this._selectedPlayers$.next(selectedPlayers);
    }
}
