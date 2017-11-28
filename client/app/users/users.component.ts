import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  createUserSubscription: Subscription;
  updateUserSubscription: Subscription;
  deleteUserSubscription: Subscription;

  users: Users;
  dataSource: UsersDataSource;

  constructor(private apiService: ApiService,
              public deleteDialog: MatDialog,
              public editDialog: MatDialog) {
    this.users = new Users(this.apiService);
    this.dataSource = new UsersDataSource(this.users);
    this.createUserSubscription = this.apiService.onCreateUser$.subscribe(user => this.users.addUser(user));
    this.updateUserSubscription = this.apiService.onUpdateUser$.subscribe(user => this.users.editUser(user));
    this.deleteUserSubscription = this.apiService.onDeleteUser$.subscribe(user => this.users.removeUser(user));
  }

  openEditDialog(user: User) {
    this.editDialog.open(UserDialogComponent, {data: {isNew: false, user: user}});
  }

  openDeleteDialog(user: User) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {data: {name: user.name}});
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.apiService.deleteUser(user);
        }
      });
  }

}

export class User {
  _id?: string;
  name: string;
  email: string;
}

export class Credentials {
  email: string;
  password: string;
}

export class Users {
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  get data(): User[] { return this.dataChange.value; }

  constructor(private apiService: ApiService) {
    this.apiService.getUsers()
      .subscribe((users) => {
        this.dataChange.next(users);
        this.apiService.loading(false);
      });
  }

  addUser(user: User) {
    this.data.push(user);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }

  editUser(user: User) {
    // let index = this.data.indexOf(user);
    // this.data.findIndex((obj, i) => {
    //   if (obj._id === user._id) {
    //     index = i;
    //     return true;
    //   }
    // });
    // this.data[index] = user;
    this.apiService.getUsers()
      .subscribe((users) => {
        this.dataChange.next(users);
        this.apiService.loading(false);
      });
    this.apiService.loading(false);
  }

  removeUser(user: User) {
    let index = this.data.indexOf(user);
    this.data.findIndex((obj, i) => {
      if (obj._id === user._id) {
        index = i;
        return true;
      }
    });
    this.data.splice(index, 1);
    this.dataChange.next(this.data);
    this.apiService.loading(false);
  }
}

export class UsersDataSource extends DataSource<any> {
  constructor(private _users: Users) {
    super();
  }

  connect(): Observable<User[]> {
    return this._users.dataChange;
  }

  disconnect() {
  }
}

