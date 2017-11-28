import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Exercise } from '../exercises/exercises.component';
import { ApiService } from '../api.service';
import { Workout } from '../workouts/workouts.component';

@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent {

  titleTxt = 'Create exercise';
  confirmBtn = 'Create';

  constructor(public dialogRef: MatDialogRef<ExerciseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService) {
    if (!data.isNew) {
      this.titleTxt = 'Edit exercise';
      this.confirmBtn = 'Save';
    }
  }

  onSave(exercise: Exercise) {
    if (this.data.isNew) {
      this.apiService.createExercise(exercise, this.data.workout);
      this.dialogRef.close();
    } else {
      this.apiService.updateExercise(exercise);
      this.dialogRef.close(true);
    }
  }

}
