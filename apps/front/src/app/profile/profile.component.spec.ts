import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Profile } from '@nx-workspace-experiments/data-models';
import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';

import { ProfileComponent } from './profile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: StoreService, useFactory: mockStoreService }],
    }).compileComponents();

    storeService = TestBed.inject(StoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save in storeService', () => {
    jest.spyOn(storeService, 'save').mockResolvedValue();
    const fixture = TestBed.createComponent(ProfileComponent);
    const app = fixture.componentInstance;
    profile.name = 'Andres';

    app.save(profile);

    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });

  it('should log the error in the console', () => {
    jest.spyOn(storeService, 'save').mockRejectedValue('Error');
    const fixture = TestBed.createComponent(ProfileComponent);
    const app = fixture.componentInstance;

    app.save(profile);

    expect(storeService.save).toHaveBeenCalled();
    expect(storeService.save).toHaveBeenCalledWith(profile);
    expect(storeService.save).toHaveBeenCalledTimes(1);
  });
});
