import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Profile } from '@nx-workspace-experiments/data-models';

@Component({
  selector: 'front-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public profile: Profile
  ) {}

  edit(profile: Profile) {
    this.dialogRef.close(profile);
  }
}
