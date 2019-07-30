import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, BehaviorSubject } from 'rxjs';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ""
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

  constructor(private http: HttpClient) { }

  signUp (email: string, password: string) {

  }
}
