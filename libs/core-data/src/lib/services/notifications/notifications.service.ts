import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(message: string, type = 'Error', duration = 5000) {
    this._snackbar.open(message, type, { duration });
  }
}
