import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Credentials } from '../users/users.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  credentials: Credentials;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              private apiService: ApiService) {
    this.credentials = new Credentials();
  }

  onLogin() {
    this.apiService.login(this.credentials)
      .subscribe(
        (data) => {
          const token = data['token'];
          if (token) {
            localStorage.setItem('token', token);
            this.apiService.me()
              .subscribe(user => {
                localStorage.setItem('_id', user._id);
                localStorage.setItem('name', user.name);
                localStorage.setItem('email', user.email);
                this.dialogRef.close(true);
              });
          } else {
            this.dialogRef.close(false);
          }
        },
        err => console.log(err)
      );
    this.dialogRef.close(false);
  }
}
