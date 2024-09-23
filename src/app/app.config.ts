// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';
// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { firebaseConfig } from './firebase';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom([
//       JwtModule.forRoot({
//         config: {
//           tokenGetter: tokenGetter,
//           allowedDomains: ["localhost:4200"],
//           disallowedRoutes: ["http://localhost:4200/login/", "http://localhost:4200/usuario/", "http://localhost:4200/usuario-logueado/"],
//         },
//       })
//       ,
//       provideFirebaseApp(() => initializeApp(firebaseConfig)),
//       provideAuth(() => getAuth()),
//       provideFirestore(() => getFirestore())
//      ]),
//      provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()
//     ]
// };

// export function tokenGetter() {
//   return localStorage.getItem("UsuarioToken");
// }

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Importaciones necesarias de Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:4200"],
          disallowedRoutes: ["http://localhost:4200/login/", "http://localhost:4200/usuario/", "http://localhost:4200/usuario-logueado/"],
        },
      }),
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      // Importación de Angular Material
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule
    ]),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()) // Proveedor necesario para las animaciones de Angular Material
  ]
};

export function tokenGetter() {
  return localStorage.getItem("UsuarioToken");
}
