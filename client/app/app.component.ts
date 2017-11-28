import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ApiService } from './api.service';
import { WorkoutDialogComponent } from './workout-dialog/workout-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './users/users.component';
import { Workout } from './workouts/workouts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadingSubscription: Subscription;

  loading = false;
  title = 'FitnessApp';
  name: string;
  email: string;

  constructor(public loginDialog: MatDialog,
              public userDialog: MatDialog,
              public workoutDialog: MatDialog,
              public snackBar: MatSnackBar,
              public apiService: ApiService) {
    this.loadingSubscription = this.apiService.onLoading$.subscribe((status) => setTimeout(() => this.loading = status, 0));
  }

  openLoginDialog() {
    const dialogRef = this.loginDialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe((bool) => {
      if (bool) {
        this.snackBar.open('Welcome ' + localStorage.getItem('name'), 'x', {duration: 3000});
      } else {
        this.snackBar.open('Login failed', 'x', {duration: 3000});
      }
      this.apiService.loading(false);
    });
  }

  onLogOut() {
    this.apiService.logout().subscribe((data) => {
        const auth = data['auth'];
        if (!auth) {
          localStorage.clear();
          this.snackBar.open('You are logged out', 'x', {duration: 3000});
        } else {
          this.snackBar.open('Logout failed', 'x', {duration: 3000});
        }
        this.apiService.loading(false);
      },
      err => console.log(err)
    );
  }

  openUserDialog() {
    const dialogRef = this.userDialog.open(UserDialogComponent, {data: {isNew: true, user: new User()}});
    dialogRef.afterClosed().subscribe((bool) => {
      if (bool) {
        this.snackBar.open('Welcome ' + localStorage.getItem('name'), 'x', {duration: 3000});
      } else {
        this.snackBar.open('Create failed', 'x', {duration: 3000});
      }
      this.apiService.loading(false);
    });
  }

  openEditUserDialog() {
    const user = new User();
    user._id = localStorage.getItem('_id');
    user.name = localStorage.getItem('name');
    user.email = localStorage.getItem('email');
    const dialogRef = this.userDialog.open(UserDialogComponent, {data: {isNew: false, user: user}});
    dialogRef.afterClosed().subscribe((bool) => {
      if (bool) {
        this.snackBar.open('Updated ' + localStorage.getItem('name'), 'x', {duration: 3000});
      } else {
        this.snackBar.open('Edit/update user not yet implemented', 'x', {duration: 3000});
      }
      this.apiService.loading(false);
    });
  }
}
