import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrontMaterialModule } from '@nx-workspace-experiments/front/material';

import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  imports: [CommonModule, FrontMaterialModule, ReactiveFormsModule],
  declarations: [ProfileComponent, ProfileEditComponent],
  exports: [ProfileComponent, ProfileEditComponent],
})
export class FrontUiModule {}
