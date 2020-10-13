import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
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
  @Output() submit = new EventEmitter<Profile>();

  profileForm = this.formBuilder.group({
    identification: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', [Validators.required]],
    about: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // ..
  }

  save() {
    this.submit.emit(this.profileForm.value);
  }
}
