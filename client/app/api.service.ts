import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout, Workouts } from './workouts/workouts.component';
import { Subject } from 'rxjs/Rx';
import { Credentials, User } from './users/users.component';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../environments/environment';
import { Exercise } from './exercises/exercises.component';

@Injectable()
export class ApiService {

  url: string;

  private loadingSource = new Subject<boolean>();
  onLoading$ = this.loadingSource.asObservable();

  private createUserSource = new Subject<User>();
  onCreateUser$ = this.createUserSource.asObservable();
  private deleteUserSource = new Subject<User>();
  onDeleteUser$ = this.deleteUserSource.asObservable();
  private updateUserSource = new Subject<User>();
  onUpdateUser$ = this.updateUserSource.asObservable();

  private createWorkoutSource = new Subject<Workout>();
  onCreateWorkout$ = this.createWorkoutSource.asObservable();
  private deleteWorkoutSource = new Subject<Workout>();
  onDeleteWorkout$ = this.deleteWorkoutSource.asObservable();
  private updateWorkoutSource = new Subject<Workout>();
  onUpdateWorkout$ = this.updateWorkoutSource.asObservable();

  private createExerciseSource = new Subject<Exercise>();
  onCreateExercise$ = this.createExerciseSource.asObservable();
  private deleteExerciseSource = new Subject<Exercise>();
  onDeleteExercise$ = this.deleteExerciseSource.asObservable();
  private updateExerciseSource = new Subject<Exercise>();
  onUpdateExercise$ = this.updateExerciseSource.asObservable();

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  public isAuthenticated(): boolean {
    const token = (localStorage.getItem('token'));
    const authenticated = tokenNotExpired(null, token);
    return authenticated;
  }

  login(credentials: Credentials) {
    this.loadingSource.next(true);
    return this.http.post(`${this.url}/login`, credentials);
  }

  logout() {
    this.loadingSource.next(true);
    return this.http.post(`${this.url}/logout`, null);
  }

  me() {
    this.loadingSource.next(true);
    return this.http.get<User>(`${this.url}/me`);
  }

  getUsers() {
    this.loadingSource.next(true);
    return this.http.get<User[]>(`${this.url}/users`);
  }

  createUser(user: User) {
    this.loadingSource.next(true);
    return this.http.post<User>(`${this.url}/users`, user)
      .subscribe(
        data => {
          const token = data['token'];
          if (token) {
            localStorage.setItem('token', token);
            this.me()
              .subscribe(_user => {
                localStorage.setItem('_id', _user._id);
                localStorage.setItem('name', _user.name);
                localStorage.setItem('email', _user.email);
              });
            this.createUserSource.next(data);
          }
        },
        err => console.log(err));
  }

  updateUser(user: User) {
    this.loadingSource.next(true);
    return this.http.put<User>(`${this.url}/users`, user)
      .subscribe(
        data => this.updateUserSource.next(data),
        err => console.log(err)
      );
  }

  deleteUser(user: User) {
    this.loadingSource.next(true);
    return this.http.delete<User>(`${this.url}/users/${user._id}`)
      .subscribe(
        data => this.deleteUserSource.next(data),
        err => console.log(err)
      );
  }

  getWorkouts() {
    this.loadingSource.next(true);
    return this.http.get<Workout[]>(`${this.url}/workouts`);
  }

  createWorkout(workout: Workout) {
    this.loadingSource.next(true);
    return this.http.post<Workout>(`${this.url}/workouts`, workout)
      .subscribe(
        data => this.createWorkoutSource.next(data),
        err => console.log(err)
      );
  }

  updateWorkout(workout: Workout) {
    this.loadingSource.next(true);
    return this.http.put<Workout>(`${this.url}/workouts`, workout)
      .subscribe(
        data => this.updateWorkoutSource.next(data),
        err => console.log(err)
      );
  }

  deleteWorkout(workout: Workout) {
    this.loadingSource.next(true);
    return this.http.delete<Workout>(`${this.url}/workouts/${workout._id}`)
      .subscribe(
        data => this.deleteWorkoutSource.next(data),
        err => console.log(err)
      );
  }

  getExercises(workout: Workout) {
    this.loadingSource.next(true);
    return this.http.get<Exercise[]>(`${this.url}/exercises/${workout._id}`);
  }

  createExercise(exercise: Exercise, workout: Workout) {
    this.loadingSource.next(true);
    return this.http.post<Exercise>(`${this.url}/exercises`, exercise)
      .subscribe(
        data => {
          workout.exercises.push(data);
          this.updateWorkout(workout);
          this.createExerciseSource.next(data);
        },
        err => console.log(err)
      );
  }

  updateExercise(exercise: Exercise) {
    this.loadingSource.next(true);
    return this.http.put<Exercise>(`${this.url}/exercises`, exercise)
      .subscribe(
        data => this.updateExerciseSource.next(data),
        err => console.log(err)
      );
  }

  deleteExercise(exercise: Exercise) {
    this.loadingSource.next(true);
    return this.http.delete<Exercise>(`${this.url}/exercises/${exercise._id}`)
      .subscribe(
        data => this.deleteExerciseSource.next(data),
        err => console.log(err)
      );
  }

  loading(bool: boolean) {
    this.loadingSource.next(bool);
  }
}
