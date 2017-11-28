import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Workout } from '../workouts/workouts.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  @Input() workout: Workout;

  createExerciseSubscription: Subscription;
  updateExerciseSubscription: Subscription;
  deleteExerciseSubscription: Subscription;

  exercises: Exercises;
  dataSource: ExercisesDataSource;

  constructor(public apiService: ApiService,
              public deleteDialog: MatDialog,
              public exerciseDialog: MatDialog) {
    this.createExerciseSubscription = this.apiService.onCreateExercise$.subscribe(exercise => this.exercises.addExercise(exercise));
    this.updateExerciseSubscription = this.apiService.onUpdateExercise$.subscribe(exercise => this.exercises.editExercise(exercise));
    this.deleteExerciseSubscription = this.apiService.onDeleteExercise$.subscribe(exercise => this.exercises.removeExercise(exercise));
  }

  ngOnInit(): void {
    this.exercises = new Exercises(this.apiService, this.workout);
    this.dataSource = new ExercisesDataSource(this.exercises);
  }

  openNewDialog() {
    this.exerciseDialog.open(ExerciseDialogComponent, {data: {isNew: true, exercise: new Exercise(), workout: this.workout}});
  }

  openEditDialog(exercise: Exercise) {
    this.exerciseDialog.open(ExerciseDialogComponent, {data: {isNew: false, exercise: exercise, workout: this.workout}});
  }

  openDeleteDialog(exercise: Exercise) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {data: {name: exercise.name}});
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.apiService.deleteExercise(exercise);
        }
      });
  }

  ngOnDestroy(): void {
    this.createExerciseSubscription.unsubscribe();
    this.updateExerciseSubscription.unsubscribe();
    this.deleteExerciseSubscription.unsubscribe();
  }
}


export class Exercise {
  _id?: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
}

export class Exercises {

  dataChange: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  get data(): Exercise[] { return this.dataChange.value; }

  constructor(private apiService: ApiService,
              private workout: Workout) {
    this.apiService.getExercises(this.workout)
      .subscribe((exercises) => {
        this.dataChange.next(exercises);
        this.apiService.loading(false);
      });
  }

  addExercise(exercise: Exercise) {
    this.data.push(exercise);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }

  editExercise(exercise: Exercise) {
    // let index = this.data.indexOf(exercise);
    // this.data.findIndex((obj, i) => {
    //   if (obj._id === exercise._id) {
    //     index = i;
    //     return true;
    //   }
    // });
    // this.data[index] = exercise;
    this.apiService.getExercises(this.workout)
      .subscribe((exercises) => {
        this.dataChange.next(exercises);
        this.apiService.loading(false);
      });
    // this.apiService.loading(false);
  }

  removeExercise(exercise: Exercise) {
    let index = this.data.indexOf(exercise);
    this.data.findIndex((obj, i) => {
      if (obj._id === exercise._id) {
        index = i;
        return true;
      }
    });
    this.data.splice(index, 1);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }
}

export class ExercisesDataSource extends DataSource<any> {
  constructor(private _exercises: Exercises) {
    super();
  }

  connect(): Observable<Exercise[]> {
    return this._exercises.dataChange;
  }

  disconnect() {
  }
}
