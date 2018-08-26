import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs'
import { Player, resolvePlayerPosition, PlayerData, mapPlayerData } from 'app/aglf-classes/player';
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

        return this.http
            .get(API_ENDPOINT + '/player/getAll', { headers })
            .pipe(
                map((data: any[]) => data.map(mapPlayerData)),
                catchError(this.handleError)
            );
    }

    setPlayers(playersData: PlayerData[]): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = this.createAuthorizationHeader(headers);

        return this.http
            .post(API_ENDPOINT + '/player/setPlayers', playersData, { headers: headers })
            .pipe(
                map(res => <any>res),
                catchError(this.handleError)
            );
    }

    getUserDetails(userId?: number): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = this.createAuthorizationHeader(headers);

        let options;
        if (userId) {
            options = {
                headers: headers,
                params: {
                    userId: userId
                }
            }
        } else {
            options = {
                headers: headers
            }
        }

        return this.http
            .get(API_ENDPOINT + '/user/getUserDetails', options)
            .pipe(
                map(data => <any>data),
                catchError(this.handleError)
            );
    }

    private handleError(error) {
        return throwError(error);
    }
}
