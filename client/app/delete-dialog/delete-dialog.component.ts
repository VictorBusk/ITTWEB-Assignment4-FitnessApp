import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  public loading = false;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onCancel() {
    this.loading = true;
    this.dialogRef.close(false);
    this.loading = false;
  }

  onConfirm() {
    this.loading = true;
    this.dialogRef.close(true);
    this.loading = false;
  }
}
