import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../config/app-config';
import { User } from '../models/user';

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

  public logout() {
    localStorage.removeItem('_hash');
    setTimeout(() => {
      this.userSubject.next(this.destroyUser);
      this.router.navigate(['/']);
    })
  }
}
