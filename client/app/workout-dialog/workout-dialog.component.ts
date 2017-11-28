import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../api.service';
import { Workout } from '../workouts/workouts.component';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.css']
})
export class WorkoutDialogComponent {

  titleTxt = 'Create workout';
  confirmBtn = 'Create';

  constructor(public dialogRef: MatDialogRef<WorkoutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService) {
    if (!data.isNew) {
      this.titleTxt = 'Edit workout';
      this.confirmBtn = 'Save';
    }
  }

  onSave(workout: Workout) {
    if (this.data.isNew) {
      this.apiService.createWorkout(workout);
      this.dialogRef.close();
    } else {
      this.apiService.updateWorkout(workout);
      this.dialogRef.close(true);
    }
  }

}
