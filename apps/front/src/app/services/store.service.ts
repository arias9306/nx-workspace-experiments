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
      const id = this.firestore.createId();
      profile.id = id;
      return this.firestore.collection('profiles').doc(id).set(profile);
    }
    return new Promise<void>((resolve, reject) => reject('Invalid profile'));
  }

  get() {
    return this.firestore.collection('profiles').valueChanges();
  }

  update(profile: Profile) {
    this.firestore.doc(`profiles/${profile.id}`).update(profile);
  }

  delete(id: string) {
    this.firestore.doc(`profiles/${id}`).delete();
  }
}
