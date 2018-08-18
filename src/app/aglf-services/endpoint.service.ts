import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs'
import { Player, resolvePlayerPosition } from 'app/aglf-classes/player';
import { Team } from 'app/aglf-classes/team';
import { ALL_PLAYERS as allPlayers } from 'app/aglf-mock/all-players';

const API_ENDPOINT = env.apiEndpoint;

@Injectable({
    providedIn: 'root'
})
export class EndpointService {

    constructor(private http: HttpClient) {
    }

    private createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        return headers.append('Content-Type', 'application/json').append('Authorization', 'b48a76a844e699b8ad4313282b8be1cb');
    }

    getAllPlayers(): Observable<Player[]> {
        let headers: HttpHeaders = new HttpHeaders();
        //headers = this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json').append('Authorization', 'b48a76a844e699b8ad4313282b8be1cb')

        return of(allPlayers.map(this.mapPlayerData));
        // return this.http
        //     .get(API_ENDPOINT + '/player/getAll', { headers })
        //     .pipe(
        //         map((data: any[]) => data.map(this.mapPlayerData)),
        //         catchError(this.handleError)
        //     );
    }

    private handleError(error) {
        return throwError(error);
    }

    private mapPlayerData(data: any): Player {
        return new Player({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            position: resolvePlayerPosition(data.position),
            price: data.price,
            team: new Team({
                id: data.teamId,
                name: data.teamName
            })
        });
    }

}
