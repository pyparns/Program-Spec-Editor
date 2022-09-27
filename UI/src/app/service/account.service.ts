import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user.model';
import * as bcrypt from 'bcryptjs';
import { act } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    for (let i=0; i<5; i++) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password!, salt);
      console.log(salt+ " : " +hash)
      let a = hash.slice(0, 29);
      console.log(bcrypt.hashSync(password!, a));
    }

    return this.http.post<User>('/api/user/authentication', { username, password })
      .pipe(map(user => {
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['/account/login']);
  }

  register(user: User): any {
    let salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password!, salt);

    user.password = hash;
    return this.http.post('/api/user/register', user);
  }
}
