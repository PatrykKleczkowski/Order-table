import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AccountInfo, Role } from '../models/account-info';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserRegistrationDetails, UserCredentials } from '../models';

export const AUTHORIZATION_HEADER = 'Authorization';
const AUTHORIZATION_KEY = 'authorization';
const USERNAME_KEY = 'username';
const ROLE_KEY = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(userCredentials: UserCredentials): Observable<any> {
    return this.http
      .post<AccountInfo>('/api/login', userCredentials, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<AccountInfo>) => {
          const token = response.headers.get(AUTHORIZATION_HEADER);
          this.storeAuthorization(token);

          const body = response.body;
          this.storeAccountInfo(body);
        })
      );
  }

  getAuthorization(): string {
    return localStorage.getItem(AUTHORIZATION_KEY);
  }

  private storeAuthorization(authToken: string) {
    localStorage.setItem(AUTHORIZATION_KEY, authToken);
  }

  private storeAccountInfo(accountInfo: AccountInfo) {
    localStorage.setItem(USERNAME_KEY, accountInfo.username);
    localStorage.setItem(ROLE_KEY, accountInfo.role.toString());
  }

  logout() {
    localStorage.removeItem(AUTHORIZATION_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  isLogged() {
    return localStorage.getItem(AUTHORIZATION_KEY) !== null;
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ADMIN);
  }

  isClient(): boolean {
    return this.hasRole(Role.CLIENT);
  }

  isRestaurateur(): boolean {
    return this.hasRole(Role.RESTAURATEUR);
  }

  private hasRole(role: Role): boolean {
    return localStorage.getItem('role') === role.toString();
  }


  register(registrationDetails: UserRegistrationDetails): Observable<any> {
    let url = 'api/users/signup';
    if (registrationDetails.userType === 'RESTAURATEUR') {
      url = url + 'Restaurateur';
    } else {
      url = url + 'Client';
    }

    return this.http
      .post(url, registrationDetails)
      .pipe(
        tap(response => {
          this.login(registrationDetails);
        })
      );
  }
}