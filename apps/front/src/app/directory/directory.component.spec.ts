import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Profile } from '@nx-workspace-experiments/data-models';
import { FrontMaterialModule } from '@nx-workspace-experiments/front/material';
import {
  FrontUiModule,
  ProfileEditComponent,
} from '@nx-workspace-experiments/front/ui';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';
import { StoreService } from '../services/store.service';
import { DirectoryComponent } from './directory.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const mockStoreService = () => ({
  save: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockSnackBar = () => ({
  open: jest.fn(),
});

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(profile),
    };
  }
}

const profile: Profile = {
  identification: '',
  name: '',
  about: '',
  address: '',
  phone: 0,
  id: '1',
};

describe('DirectoryComponent', () => {
  let component: DirectoryComponent;
  let fixture: ComponentFixture<DirectoryComponent>;
  let storeService: StoreService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontUiModule,
        FrontMaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
      ],
      declarations: [DirectoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StoreService, useFactory: mockStoreService },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: MatSnackBar,
          useFactory: mockSnackBar,
        },
      ],
    })
      .overrideModule(FrontUiModule, {
        set: { entryComponents: [ProfileEditComponent] },
      })
      .compileComponents();

    storeService = TestBed.inject(StoreService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);

    jest.spyOn(storeService, 'get').mockReturnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a edit dialog and update the profile', () => {
    const editedProfile: Profile = {
      identification: '',
      name: 'Arias',
      about: '',
      address: '',
      phone: 0,
      id: '',
    };

    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(editedProfile),
    } as never);

    const updateSpy = jest.spyOn(storeService, 'update');
    const snackBarSpy = jest.spyOn(snackBar, 'open');

    component.edit(profile);

    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(editedProfile);
    expect(snackBarSpy).toBeCalled();
  });

  it('should open a edit dialog and not update the profile', () => {
    const updateSpy = jest.spyOn(storeService, 'update');
    const snackBarSpy = jest.spyOn(snackBar, 'open');

    component.edit(profile);

    expect(updateSpy).not.toHaveBeenCalled();
    expect(snackBarSpy).not.toBeCalled();
  });

  it('should open a delete dialog and delete the profile', () => {
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as never);

    const deleteSpy = jest.spyOn(storeService, 'delete');
    const snackBarSpy = jest.spyOn(snackBar, 'open');

    component.delete(profile);

    expect(deleteSpy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalledWith('1');
    expect(snackBarSpy).toBeCalled();
  });

  it('should open a delete dialog and not delete the profile', () => {
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(false),
    } as never);

    const deleteSpy = jest.spyOn(storeService, 'delete');
    const snackBarSpy = jest.spyOn(snackBar, 'open');

    component.delete(profile);

    expect(deleteSpy).not.toHaveBeenCalled();
    expect(deleteSpy).not.toHaveBeenCalledWith('1');
    expect(snackBarSpy).not.toBeCalled();
  });
});
