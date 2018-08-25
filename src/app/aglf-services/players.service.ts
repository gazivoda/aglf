import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Position, PlayerData } from 'app/aglf-classes/player';
import { EndpointService } from 'app/aglf-services/endpoint.service';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {

    private _players$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private endpointService: EndpointService) {
    }

    getPlayers(): Observable<Player[]> {
        if (this._players$.value.length === 0) {
            this.endpointService.getAllPlayers()
                .subscribe(players => this._players$.next(players));
        }

        return this._players$.asObservable();
    }

    setPlayers(playersData: PlayerData[]): Observable<any> {
        playersData = playersData.filter(data => data !== null);
        return this.endpointService.setPlayers(playersData);
    }
}
