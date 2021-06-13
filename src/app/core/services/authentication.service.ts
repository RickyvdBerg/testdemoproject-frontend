import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
  throwError,
} from 'rxjs';
import { Credentials, IUser } from '@app/interfaces/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const TOKEN_KEY = 'USER_TOKEN';
const USER_KEY = 'USER_INFO';
const REMEMBER_KEY = 'USER_EMAIL';

const AUTH_BASE_URL = 'auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: ReplaySubject<IUser> = new ReplaySubject(1);
  private currentToken: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    try {
      // Populate the current user if present in localstorage
      const savedUser = localStorage.getItem(USER_KEY);

      if (savedUser) {
        const u = JSON.parse(savedUser);
        this.currentUser.next(u);
      } else {
        this.currentUser.next(undefined);
      }

      // Populate the bearer token if present in localstorage
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (savedToken) {
        this.currentToken.next(savedToken);
      }
    } catch (e) {
      // Something went wrong, most likely due to localStorage manipulation/corruption
      this.logout();
    }
  }

  public get token(): string {
    return this.currentToken.value;
  }

  public register(credentials: Credentials): Observable<any> {
    return this.http.post<IUser>(AUTH_BASE_URL + 'register', credentials).pipe(
      catchError(this.handleError),
      map((res) => {
        console.log(res);
        this.login(credentials);
      }),
    );
  }

  public login(
    credentials: Credentials,
    rememberMe?: boolean,
  ): Observable<any> {
    return this.http.post<any>(AUTH_BASE_URL + 'login', credentials).pipe(
      map((response) => {
        const bearer = response.data.token; // Get bearer token one way or another
        localStorage.setItem(TOKEN_KEY, bearer);
        console.log(localStorage.getItem(TOKEN_KEY));

        this.currentToken.next(bearer);

        localStorage.setItem(REMEMBER_KEY, credentials.email);

        localStorage.setItem(USER_KEY, JSON.stringify({ id: 7, name: 'test' }));
        this.currentUser.next({ id: 7, name: 'test' });

        return response;
      }),
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return combineLatest([
      this.currentUser.asObservable(),
      this.currentToken.asObservable(),
    ]).pipe(map(([user, token]) => !!user && !!token));
  }

  public logout(): boolean {
    localStorage.removeItem(REMEMBER_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    if (
      !localStorage.getItem(REMEMBER_KEY) &&
      !localStorage.getItem(USER_KEY) &&
      !localStorage.getItem(TOKEN_KEY)
    )
      this.currentUser.next();
    this.currentToken.next('');
    return true;
    return false;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
