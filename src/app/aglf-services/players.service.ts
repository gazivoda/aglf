import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player, Position } from 'app/aglf-classes/player';
import { EndpointService } from 'app/aglf-services/endpoint.service';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {

    private _players$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private endpointService: EndpointService) {
    }

    getPlayers(): Observable<any[]> {
        if (this._players$.value.length === 0) {
            this.endpointService.getAllPlayers()
                .subscribe(players => this._players$.next(players));
        }

        return this._players$.asObservable();
    }
}
