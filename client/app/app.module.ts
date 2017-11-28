import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDialogComponent } from './workout-dialog/workout-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UsersComponent } from './users/users.component';
import { ApiService } from './api.service';
import { AuthInterceptor } from './auth.interceptor';
import { JWTInterceptor } from './jwt.interceptor';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ExercisesDialogComponent } from './exercises-dialog/exercises-dialog.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginDialogComponent,
    WorkoutsComponent,
    WorkoutDialogComponent,
    DeleteDialogComponent,
    UsersComponent,
    ExercisesComponent,
    ExerciseDialogComponent,
    UserDialogComponent,
    ExercisesDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    UserDialogComponent,
    WorkoutDialogComponent,
    ExerciseDialogComponent,
    ExercisesDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
}
