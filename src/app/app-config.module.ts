import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_CONFIG } from './app.tokens';
import { AppConfig } from './app-config.model';

@NgModule({})
export class AppConfigModule {
  static forRoot(config: AppConfig): ModuleWithProviders<AppConfigModule> {
    return {
      ngModule: AppConfigModule,
      providers: [
        { provide: APP_CONFIG, useValue: config }
      ]
    };
  }
}
