import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ArchiveComponent } from './archive.component';
import { appConfig } from '../../app.config';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveComponent],
      providers: [provideMockStore({}), ...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
