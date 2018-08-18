import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'environments/environment';

const API_ENDPOINT = env.apiEndpoint;

@Injectable()
export class AuthService {
    token: string = null;

    constructor(private http: HttpClient) {
    }

    signupUser(email: string, password: string): Observable<boolean> {
        return this.http
            .post(API_ENDPOINT + '/user/signUp', {
                'username': email,
                'password': password
            })
            .pipe(
                map((res: any) => res.status === 200)
            );
    }

    signinUser(email: string, password: string): Observable<boolean> {
        return this.http
            .get(API_ENDPOINT + '/user/login?username=' + email + '&password=' + password)
            .pipe(
                map((res: any) => res.status === 200)
            );
    }

    logout() {
        console.log('@ localStorage logout');
        localStorage.removeItem('token');
        this.token = null;
    }

    getToken() {
        console.log('@ localStorage getToken');
        this.token = localStorage.getItem('token');
        return this.token;
    }

    setToken(token: string) {
        console.log('@ localStorage setToken');
        this.token = token;
        localStorage.setItem('token', token);
    }

    isAuthenticated() {
        console.log('@ localStorage isAuthenticated');
        this.token = localStorage.getItem('token');
        console.log('@ localStorage IS', this.token);
        return this.token !== null;
    }
}
