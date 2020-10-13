import { Component } from '@angular/core';
import { Profile } from '@nx-workspace-experiments/data-models';
import { Observable } from 'rxjs';

import { ApiService } from './services/api.service';

@Component({
  selector: 'nx-workspace-experiments-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apiMessage$: Observable<string>;

  constructor(private apiService: ApiService) {
    this.apiMessage$ = this.apiService.getApiMessage();
  }

  save(profile: Profile) {
    console.log(profile);
  }
}
