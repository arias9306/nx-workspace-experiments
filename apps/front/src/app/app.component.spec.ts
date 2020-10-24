import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '@nx-workspace-experiments/data-models';
import { Console } from 'console';
import { of } from 'rxjs';
import { sample } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { StoreService } from './services/store.service';

const mockApiService = () => ({
  getApiMessage: jest.fn(),
});

const mockStoreService = () => ({
  save: jest.fn(),
});

const profile: Profile = {
  identification: '',
  name: '',
  about: '',
  address: '',
  phone: 0,
};

describe('AppComponent', () => {
  let apiService: ApiService;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: ApiService,
          useFactory: mockApiService,
        },
        { provide: StoreService, useFactory: mockStoreService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
    storeService = TestBed.inject(StoreService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the api message', () => {
    jest.spyOn(apiService, 'getApiMessage').mockReturnValue(of('ApiMessage'));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ApiMessage');
  });

  it('should call save in storeService', () => {
    jest.spyOn(storeService, 'save').mockResolvedValue();
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    profile.name = 'Andres';

    app.save(profile);

    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });

  it('should log the error in the console', () => {
    jest.spyOn(storeService, 'save').mockRejectedValue('Error');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.save(profile);

    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });
});
