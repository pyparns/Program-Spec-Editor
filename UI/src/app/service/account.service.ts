import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  private user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject;
  }

  login(username: string, password: string) {
    return this.http.post<User>('/api/user/authentication', { username, password })
    .pipe(map(user => {
      let a = user.password?.slice(0, 29);
      if (bcrypt.hashSync(password!, a) === user.password) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }
      return null;
    }));
  }

  logout(): any {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']).then(() => window.location.reload());
  }

  register(user: User): any {
    let salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password!, salt);

    user.password = hash;
    user.bookmark = [];
    return this.http.post('/api/user/register', user);
  }

  editProfile(user: User): any {
    return this.http.put('/api/user/' + user.id, user)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }
    ));
  }

  getNameById(id: string): any {
    return this.http.get('/api/user/name/' + id);
  }

  bookmark(pid: string): any {
    return this.http.put('/api/user/bookmark/' + this.userValue.value.id, pid, { headers: {'Content-Type': 'application/json'} })
      .pipe(map(user => {
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }
    ));
  }
}
