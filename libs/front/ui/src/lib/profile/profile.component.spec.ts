import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Profile } from '@nx-workspace-experiments/data-models';
import { FrontMaterialModule } from '@nx-workspace-experiments/front/material';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FrontMaterialModule,
      ],
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a new profile', () => {
    const spyEmitter = jest.spyOn(component.profileValues, 'emit');
    const mockProfile: Profile = {
      about: null,
      address: null,
      id: null,
      identification: null,
      name: 'Andres',
      phone: null,
    };
    component.profileForm.patchValue({
      name: 'Andres',
    });
    component.save();
    expect(spyEmitter).toHaveBeenCalled();
    expect(spyEmitter).toHaveBeenCalledWith(mockProfile);
  });

  it('shoudl call onCancel emitter', () => {
    const spyEmitter = jest.spyOn(component.onCancel, 'emit');
    component.cancel();
    expect(spyEmitter).toHaveBeenCalled();
  });

  it('should hide the cancel button on create mode', () => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      (element) => element.name === 'button'
    );
    expect(buttons).toHaveLength(1);
  });

  it('should show the cancel button on edit mode', () => {
    component.mode = 'edit';
    fixture.detectChanges();
    const buttons: DebugElement[] = fixture.debugElement.queryAll(
      (element) => element.name === 'button'
    );
    expect(buttons).toHaveLength(2);
  });
});
