import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import { Profile } from '@nx-workspace-experiments/data-models';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { StoreService } from './store.service';

const mockAngularFirestore = () => ({
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (document: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
  createId: jest.fn(),
});

describe('StoreService', () => {
  let service: StoreService;
  const profile: Profile = {
    identification: '',
    name: '',
    about: '',
    address: '',
    phone: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore },
      ],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a error message', async () => {
    try {
      await service.save(profile);
    } catch (error) {
      expect(error).toBe('Invalid profile');
    }
  });

  it('should save a new profile', async () => {
    profile.name = 'Andres';

    try {
      await service.save(profile);
      expect(true).toBeTruthy();
    } catch (error) {
      expect(error).not.toBe('Invalid profile');
    }
  });
});
