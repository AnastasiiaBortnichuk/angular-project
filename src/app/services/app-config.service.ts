import { Injectable, Inject } from '@angular/core';
import { AppConfig } from '../app-config.model';
import { APP_CONFIG } from '../app.tokens';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  get baseUrl(): string {
    return this.config.BASE_URL;
  }

  get usersUrl(): string {
    return this.config.USERS_URL;
  }

  get baseJsonUrl(): string {
    return this.config.BASE_JSON_URL;
  }
}
