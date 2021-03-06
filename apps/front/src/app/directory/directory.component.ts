import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Profile } from '@nx-workspace-experiments/data-models';
import {
  ConfirmDialogComponent,
  ProfileEditComponent,
} from '@nx-workspace-experiments/front/ui';
import { Subscription } from 'rxjs';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'front-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'identification',
    'name',
    'phone',
    'address',
    'edit',
    'delete',
  ];
  datasource: MatTableDataSource<unknown> = new MatTableDataSource();
  tableSubscription: Subscription = new Subscription();
  dialogSubscription: Subscription = new Subscription();
  deleteDialogSubscription: Subscription = new Subscription();

  constructor(
    private storeService: StoreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tableSubscription = this.storeService.get().subscribe((data) => {
      this.datasource.data = data;
    });
  }

  ngOnDestroy(): void {
    this.tableSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
    this.deleteDialogSubscription.unsubscribe();
  }

  edit(element: Profile) {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: element,
      height: '80%',
    });

    this.dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((profile: Profile) => {
        if (element !== profile) {
          this.storeService.update(profile);
          this.snackBar.open('Record updated successfuly', undefined, {
            duration: 3000,
          });
        }
      });
  }

  delete(element: Profile) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: element.name,
    });

    this.deleteDialogSubscription = dialogRef
      .afterClosed()
      .subscribe((deleteElement: boolean) => {
        if (deleteElement) {
          this.storeService.delete(element.id);
          this.snackBar.open('Record deleted successfuly', undefined, {
            duration: 3000,
          });
        }
      });
  }
}
