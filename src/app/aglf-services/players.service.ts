import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Position } from 'app/aglf-classes/player';

const PLAYERS = [new Player({
    id: 1,
    firstName: 'Manuel',
    lastName: 'Neuer',
    photoUrl: 'bm-neuer.jpg',
    position: Position.GOALKEEPER,
    number: 1,
    price: 14,
    team: null
}), new Player({
    id: 2,
    firstName: 'Manuel',
    lastName: 'Neuer',
    photoUrl: 'bm-neuer.jpg',
    position: Position.GOALKEEPER,
    number: 1,
    price: 14,
    team: null
}), new Player({
    id: 3,
    firstName: 'Davide',
    lastName: 'Alaba',
    photoUrl: 'bm-alaba.jpg',
    position: Position.DEFENDER,
    number: 27,
    price: 7,
    team: null
}), new Player({
    id: 4,
    firstName: 'Mehdi',
    lastName: 'Benatia',
    photoUrl: 'bm-benatia.jpg',
    position: Position.DEFENDER,
    number: 5,
    price: 9,
    team: null
}), new Player({
    id: 5,
    firstName: 'Mehdi',
    lastName: 'Benatia',
    photoUrl: 'bm-benatia.jpg',
    position: Position.DEFENDER,
    number: 5,
    price: 9,
    team: null
}), new Player({
    id: 6,
    firstName: 'Mehdi',
    lastName: 'Benatia',
    photoUrl: 'bm-benatia.jpg',
    position: Position.DEFENDER,
    number: 5,
    price: 9,
    team: null
}), new Player({
    id: 7,
    firstName: 'Mehdi',
    lastName: 'Benatia',
    photoUrl: 'bm-benatia.jpg',
    position: Position.DEFENDER,
    number: 5,
    price: 9,
    team: null
}), new Player({
    id: 8,
    firstName: 'Frank',
    lastName: 'Ribery',
    photoUrl: 'bm-rilbery.jpg',
    position: Position.MIDFILDER,
    number: 7,
    price: 14,
    team: null
}), new Player({
    id: 9,
    firstName: 'Frank',
    lastName: 'Ribery',
    photoUrl: 'bm-rilbery.jpg',
    position: Position.MIDFILDER,
    number: 7,
    price: 14,
    team: null
}), new Player({
    id: 10,
    firstName: 'Frank',
    lastName: 'Ribery',
    photoUrl: 'bm-rilbery.jpg',
    position: Position.MIDFILDER,
    number: 7,
    price: 14,
    team: null
}), new Player({
    id: 11,
    firstName: 'Frank',
    lastName: 'Ribery',
    photoUrl: 'bm-rilbery.jpg',
    position: Position.MIDFILDER,
    number: 7,
    price: 14,
    team: null
}), new Player({
    id: 12,
    firstName: 'Frank',
    lastName: 'Ribery',
    photoUrl: 'bm-rilbery.jpg',
    position: Position.MIDFILDER,
    number: 7,
    price: 14,
    team: null
}), new Player({
    id: 13,
    firstName: 'Claudio',
    lastName: 'Pizzaro',
    photoUrl: 'bm-pizarro.jpg',
    position: Position.STRIKER,
    number: 9,
    price: 14,
    team: null
}), new Player({
    id: 14,
    firstName: 'Claudio',
    lastName: 'Pizzaro',
    photoUrl: 'bm-pizarro.jpg',
    position: Position.STRIKER,
    number: 9,
    price: 14,
    team: null
}), new Player({
    id: 15,
    firstName: 'Claudio',
    lastName: 'Pizzaro',
    photoUrl: 'bm-pizarro.jpg',
    position: Position.STRIKER,
    number: 9,
    price: 14,
    team: null
})];

@Injectable({
    providedIn: 'root'
})
export class PlayersService {

    private _players$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor() {
    }

    getPlayers(): Observable<any[]> {
        if (this._players$.value.length === 0) {
            // fetch players
            this._players$.next(PLAYERS);
        }

        return this._players$.asObservable();
    }
}
