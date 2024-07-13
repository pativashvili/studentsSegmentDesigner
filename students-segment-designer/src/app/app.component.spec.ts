import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { appConfig } from './app.config';
import { Firestore, FirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FirestoreModule, FirebaseAppModule],
      providers: [...appConfig.providers, AuthService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
