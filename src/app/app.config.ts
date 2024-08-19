import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["localhost:4200"],
              disallowedRoutes: ["http://localhost:4200/login/", "http://localhost:4200/usuario/", "http://localhost:4200/usuario-logueado/" ],
          },
      }),
  ), provideHttpClient(withInterceptorsFromDi())]
};

export function tokenGetter() {
  return localStorage.getItem("UsuarioToken");
}
