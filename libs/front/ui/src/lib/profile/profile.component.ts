import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '@nx-workspace-experiments/data-models';

@Component({
  selector: 'nx-workspace-experiments-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Output() profileValues = new EventEmitter<Profile>();
  @Output() onCancel = new EventEmitter<void>();
  @Input() profile: Profile;
  @Input() mode: 'create' | 'edit' = 'create';

  profileForm = this.formBuilder.group({
    identification: [null, [Validators.required]],
    name: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.maxLength(10)]],
    address: [null, [Validators.required]],
    about: [null, [Validators.required]],
    id: [null],
  });

  constructor(private formBuilder: FormBuilder) {
    this.profile = this.profileForm.value;
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.profile);
  }

  save() {
    this.profileValues.emit(this.profileForm.value);
    this.profileForm.reset();
  }

  cancel() {
    this.onCancel.emit();
  }
}
