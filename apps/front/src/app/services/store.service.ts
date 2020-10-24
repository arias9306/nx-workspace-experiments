import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '@nx-workspace-experiments/data-models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private firestore: AngularFirestore) {}

  save(profile: Profile): Promise<void> {
    if (profile.name) {
      return this.firestore
        .collection('profiles')
        .doc(this.firestore.createId())
        .set(profile);
    }
    return new Promise<void>((resolve, reject) => reject('Invalid profile'));
  }
}
