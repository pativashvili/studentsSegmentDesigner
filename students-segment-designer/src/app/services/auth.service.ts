import { Inject, Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  Auth,
  user,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = user(this.firebaseAuth);
  currentUserSign$ = signal<UserInterface | null | undefined>(undefined);

  constructor(private firebaseAuth: Auth) {}

  register(
    email: string,
    userName: string,
    password: string,
    idNumber: string
  ): Observable<void> {
    debugger;
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, {
        displayName: `${userName + ',' + idNumber}`,
      });
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
