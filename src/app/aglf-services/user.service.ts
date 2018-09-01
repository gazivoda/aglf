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
    private _budget$: BehaviorSubject<number> = new BehaviorSubject<number>(100);

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

    updatePlayerData(playerData: PlayerData) {
        let selectedPlayers: Player[] = this._selectedPlayers$.value;
        let index: number = -1;
        selectedPlayers.forEach((p: Player, i: number, players: Player[]) => {
            if (p && p.id === playerData.id) {
                index = i;
            } else if (p && p.id !== playerData.id) {
                if (playerData.captain && p.captain) {
                    players[i].captain = false;
                }
                if (playerData.viceCaptain && p.viceCaptain) {
                    players[i].viceCaptain = false;
                }
            }
        });
        if (index > -1) {
            let player: Player = selectedPlayers.find((p: Player) => p.id === playerData.id);

            let maxActivePlayersByPosition: number;
            let activePlayersByPosition: number = selectedPlayers.filter((p: Player) => p.position === player.position && p.active).length;

            if (player.position === Position.GOALKEEPER) {
                maxActivePlayersByPosition = 1;
            } else if (player.position === Position.DEFENDER || player.position === Position.MIDFIELDER) {
                maxActivePlayersByPosition = 4;
            } else if (player.position === Position.STRIKER) {
                maxActivePlayersByPosition = 2;
            }

            if (playerData.active && maxActivePlayersByPosition === activePlayersByPosition) {
                if (index === 1 || index === 6 || index === 11 || index === 14) {
                    selectedPlayers[index - 1].active = false;
                } else {
                    let lastActiveIndex: number;
                    selectedPlayers.forEach((p: Player, i: number) => {
                        if (p.position === player.position) {
                            lastActiveIndex = i;
                        }
                    });
                    selectedPlayers[lastActiveIndex].active = false;
                }
            }

            selectedPlayers[index].active = playerData.active;
            selectedPlayers[index].captain = playerData.captain;
            selectedPlayers[index].viceCaptain = playerData.viceCaptain;

            let playersData: PlayerData[] = selectedPlayers.map((player: Player, i: number) => new PlayerData({
                id: player.id || null,
                active: player.active || false,
                captain: player.captain || false,
                viceCaptain: player.viceCaptain || false
            })).filter((p: Player) => p.id !== null);
            this.playersService.setPlayers(playersData).subscribe(res => {
                this._selectedPlayers$.next(new Array(15));
                let totalPrice = selectedPlayers.reduce((total, player) =>  total + player.price, 0);
                this._budget$.next(100 - totalPrice);
                this._selectedPlayers$.next(selectedPlayers);
            });
        }
    }

    removePlayer(player: Player) {
        let selectedPlayers = this._selectedPlayers$.value;
        let index: number = -1;
        let playersOnSamePosition: Player[] = [];
        let samePositionIndexes: number[] = [];
        selectedPlayers.forEach((p: Player, i: number) => {
            if (p && p.id === player.id) {
                index = i;
            } else {
                if (p !== null && p.position === player.position) {
                    playersOnSamePosition.push(p);
                    samePositionIndexes.push(i);
                }
            }
        });

        if (index > -1) {
            if (samePositionIndexes.length > 0) {
                samePositionIndexes.forEach((positionIndex: number, i: number) => {
                    if (index < positionIndex) {
                        selectedPlayers[positionIndex - 1] = selectedPlayers[positionIndex];
                    }
                });
                selectedPlayers[samePositionIndexes[samePositionIndexes.length - 1]] = null;
            } else {
                selectedPlayers[index] = null;
            }

            let playersData: PlayerData[] = selectedPlayers.filter((p: Player) => p !== null).map((player: Player) => new PlayerData({
                id: player.id,
                active: player.active,
                captain: player.captain,
                viceCaptain: player.viceCaptain
            }));
            this.playersService.setPlayers(playersData).subscribe(res => {
                this._selectedPlayers$.next(new Array(15));
                let totalPrice = selectedPlayers.filter(p => p !== null).reduce((total, player) =>  total + player.price, 0);
                this._budget$.next(100 - totalPrice);
                this._selectedPlayers$.next(selectedPlayers);
            });
        }
    }

    addPlayer(player: Player, update: boolean) {
        let selectedPlayers: Player[] = this._selectedPlayers$.value;

        let maxActivePlayersByPosition: number;
        let activePlayersByPosition: number = selectedPlayers.filter((p: Player) => p !== null && p.position === player.position && p.active).length;

        if (player.position === Position.GOALKEEPER) {
            maxActivePlayersByPosition = 1;
        } else if (player.position === Position.DEFENDER || player.position === Position.MIDFIELDER) {
            maxActivePlayersByPosition = 4;
        } else if (player.position === Position.STRIKER) {
            maxActivePlayersByPosition = 2;
        }

        if (activePlayersByPosition < maxActivePlayersByPosition) {
            player.active = true;
        }

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
            let playersData: PlayerData[] = selectedPlayers.filter(p => p !== null).map((player: Player) => new PlayerData({
                id: player.id,
                active: player.active,
                captain: player.captain,
                viceCaptain: player.viceCaptain
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
