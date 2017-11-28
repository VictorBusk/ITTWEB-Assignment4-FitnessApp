import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../api.service';
import { User } from '../users/users.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {

  titleTxt = 'Create user';
  confirmBtn = 'Create';

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService) {
    if (!data.isNew) {
      this.titleTxt = 'Edit user';
      this.confirmBtn = 'Save';
    }
  }

  onSave(user: User) {
    if (this.data.isNew) {
      this.apiService.createUser(user);
      this.dialogRef.close(true);
    } else {
      // this.apiService.updateUser(user);
      this.dialogRef.close(false);
    }
  }

}
