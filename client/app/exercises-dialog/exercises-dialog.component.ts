import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';

@Component({
  selector: 'app-exercises-dialog',
  templateUrl: './exercises-dialog.component.html',
  styleUrls: ['./exercises-dialog.component.css']
})
export class ExercisesDialogComponent {

  constructor(public dialogRef: MatDialogRef<ExerciseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
}
