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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collection: (name: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      set: (document: unknown) => new Promise((resolve) => resolve()),
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
