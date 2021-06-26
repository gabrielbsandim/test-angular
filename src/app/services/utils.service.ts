import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) { }

  public snackBarError(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: 'errorPanel',
    });
  }

  public snackBarSuccess(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 4000,
      panelClass: 'successPanel',
    });
  }
}
