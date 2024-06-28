import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

const fireBaseCofnig = {
  apiKey: 'AIzaSyBYRREjibT3kjLW8vs2z2ZVvtz34GRTP3U',
  authDomain: 'students-segment-designer.firebaseapp.com',
  projectId: 'students-segment-designer',
  storageBucket: 'students-segment-designer.appspot.com',
  messagingSenderId: '492237126831',
  appId: '1:492237126831:web:805fc7e89d7ea31614a85a',
  measurementId: 'G-MVF2KXB4JR',
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),

    provideFirebaseApp(() => initializeApp(fireBaseCofnig)),
    provideAuth(() => getAuth()),

    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
  ],
};
