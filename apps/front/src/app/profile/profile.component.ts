import { Component } from '@angular/core';
import { Profile } from '@nx-workspace-experiments/data-models';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'front-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private storeService: StoreService) {}

  save(profile: Profile) {
    this.storeService
      .save(profile)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
}
