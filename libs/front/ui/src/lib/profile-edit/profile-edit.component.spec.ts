import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from '@nx-workspace-experiments/data-models';
import { FrontMaterialModule } from '@nx-workspace-experiments/front/material';

import { ProfileComponent } from '../profile/profile.component';
import { ProfileEditComponent } from './profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockProfile: Profile = {
  about: '',
  address: '',
  id: '',
  identification: '',
  name: '',
  phone: 0,
};

const mockDialogRef = () => ({
  close: jest.fn(),
});

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditComponent, ProfileComponent],
      imports: [
        FrontMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockProfile,
        },
        { provide: MatDialogRef, useFactory: mockDialogRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close');
    const mockProfile: Profile = {
      about: null,
      address: null,
      id: null,
      identification: null,
      name: 'Andres',
      phone: null,
    };
    component.edit(mockProfile);
    expect(dialogRefSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith(mockProfile);
  });
});
