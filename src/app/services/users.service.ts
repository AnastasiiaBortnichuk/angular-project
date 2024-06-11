import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@shared/types';
import { ConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.configService.usersUrl)
  }
}
