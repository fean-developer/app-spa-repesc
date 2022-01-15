import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { catchError, delay, map, retry } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../config/app-config';
import { User } from '../models/user';
import { FormaData } from '../_helpers/format.data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authenticated!: Observable<Boolean>;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public destroyUser!: User;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private router: Router,
    private helpers: FormaData
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('_hash') as string));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public authenticate(document: string, password: string) {
    return this.http.post<User>(`${this.config.api}/users/authenticate`, { document, password })
      .pipe(delay(0), map((user: User) => {
        localStorage.setItem('_hash', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  public listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.api}/users`)
      .pipe(
        retry(2), delay(600),
        catchError(this.helpers.handleError))

  }

  public logout() {
    localStorage.removeItem('_hash');
    setTimeout(() => {
      this.userSubject.next(this.destroyUser);
      this.router.navigate(['/']);
    })
  }
}
