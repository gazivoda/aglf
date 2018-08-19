import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs'
import { Player, resolvePlayerPosition } from 'app/aglf-classes/player';
import { Team } from 'app/aglf-classes/team';
import { AuthService } from 'app/shared/auth/auth.service';
import { ALL_PLAYERS } from 'app/aglf-mock/all-players';

const API_ENDPOINT = env.apiEndpoint;

@Injectable()
export class EndpointService {

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    private createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
        return headers.append('Authorization', this.authService.getToken());
    }

    getAllPlayers(): Observable<Player[]> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = this.createAuthorizationHeader(headers);

        //return of(ALL_PLAYERS.map(this.mapPlayerData));
        return this.http
            .get(API_ENDPOINT + '/player/getAll', { headers })
            .pipe(
                map((data: any[]) => data.map(this.mapPlayerData)),
                catchError(this.handleError)
            );
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
