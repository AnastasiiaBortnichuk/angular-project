import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from './../../environments/environment.development';
import { IUser } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(env.USERS_URL)
  }
}
