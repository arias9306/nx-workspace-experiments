import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

const materialModules = [
  FlexLayoutModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class FrontMaterialModule {}