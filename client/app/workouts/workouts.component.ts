import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { WorkoutDialogComponent } from '../workout-dialog/workout-dialog.component';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { ExercisesDialogComponent } from '../exercises-dialog/exercises-dialog.component';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnDestroy {

  createWorkoutSubscription: Subscription;
  updateWorkoutSubscription: Subscription;
  deleteWorkoutSubscription: Subscription;

  workouts: Workouts;
  dataSource: WorkoutsDataSource;

  constructor(public apiService: ApiService,
              public exercisesDialog: MatDialog,
              public deleteDialog: MatDialog,
              public workoutDialog: MatDialog) {
    this.workouts = new Workouts(this.apiService);
    this.dataSource = new WorkoutsDataSource(this.workouts);
    this.createWorkoutSubscription = this.apiService.onCreateWorkout$.subscribe(workout => this.workouts.addWorkout(workout));
    this.updateWorkoutSubscription = this.apiService.onUpdateWorkout$.subscribe(workout => this.workouts.editWorkout(workout));
    this.deleteWorkoutSubscription = this.apiService.onDeleteWorkout$.subscribe(workout => this.workouts.removeWorkout(workout));
  }

  openExercisesDialog(workout: Workout) {
    this.exercisesDialog.open(ExercisesDialogComponent, {
      width: '80%',
      height: '80%',
      data: {isNew: false, workout: workout}
    });
  }

  openNewDialog() {
    this.workoutDialog.open(WorkoutDialogComponent, {data: {isNew: true, workout: new Workout()}});
  }

  openEditDialog(workout: Workout) {
    this.workoutDialog.open(WorkoutDialogComponent, {data: {isNew: false, workout: workout}});
  }

  openDeleteDialog(workout: Workout) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {data: {name: workout.name}});
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.apiService.deleteWorkout(workout);
        }
      });
  }

  ngOnDestroy(): void {
    this.createWorkoutSubscription.unsubscribe();
    this.updateWorkoutSubscription.unsubscribe();
    this.deleteWorkoutSubscription.unsubscribe();
  }
}

export class Workout {
  _id?: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export class Workouts {
  dataChange: BehaviorSubject<Workout[]> = new BehaviorSubject<Workout[]>([]);
  get data(): Workout[] { return this.dataChange.value; }

  constructor(private apiService: ApiService) {
    this.apiService.getWorkouts()
      .subscribe((workouts) => {
        this.dataChange.next(workouts);
        this.apiService.loading(false);
      });
  }

  addWorkout(workout: Workout) {
    this.data.push(workout);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }

  editWorkout(workout: Workout) {
    // let index = this.data.indexOf(workout);
    // this.data.findIndex((obj, i) => {
    //   if (obj._id === workout._id) {
    //     index = i;
    //     return true;
    //   }
    // });
    // this.data[index] = workout;
    this.apiService.getWorkouts()
      .subscribe((workouts) => {
        this.dataChange.next(workouts);
        this.apiService.loading(false);
      });
    this.apiService.loading(false);
  }

  removeWorkout(workout: Workout) {
    let index = this.data.indexOf(workout);
    this.data.findIndex((obj, i) => {
      if (obj._id === workout._id) {
        index = i;
        return true;
      }
    });
    this.data.splice(index, 1);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }
}

export class WorkoutsDataSource extends DataSource<any> {
  constructor(private _workouts: Workouts) {
    super();
  }

  connect(): Observable<Workout[]> {
    return this._workouts.dataChange;
  }

  disconnect() {
  }
}
