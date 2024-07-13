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
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { environment } from '../../enviroment/enviroment';
import { LecturerReducer } from './+stores/lecturer/lecturer.reducer';
import { provideEffects } from '@ngrx/effects';
import { LecturerEffects } from './+stores/lecturer/lecturer.effects';
import { EnrollmentEffects } from './+stores/enrollment/enrollment.effects';
import { EnrollmentReducer } from './+stores/enrollment/enrollment.reducer';
import { StudentReducer } from './+stores/student/student.reducer';
import { StudentEffects } from './+stores/student/student.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.fireBaseCofnig)),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') })
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      StoreModule.forRoot({
        enrollmentReducer: EnrollmentReducer,
        lecturerReducer: LecturerReducer,
      })
    ),
    provideEffects([LecturerEffects, EnrollmentEffects, StudentEffects]),
    provideStore(),
    provideState({ name: 'enrollmentReducer', reducer: EnrollmentReducer }),
    provideState({ name: 'lecturerReducer', reducer: LecturerReducer }),
    provideState({ name: 'studentReducer', reducer: StudentReducer }),
    provideClientHydration(),
  ],
};
