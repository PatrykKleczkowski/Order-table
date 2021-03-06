import { ReservationDialogComponent } from '@features/home/components/reservation-dialog/reservation-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '@features/home/components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '@features/home/components/register-dialog/register-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: {}
    });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      width: '250px',
      data: {}
    });
  }

  openReservationDialog(restaurantApiId: string) {
    this.dialog.open(ReservationDialogComponent, {
      width: '350px',
      data: {restaurantApiId: restaurantApiId}
    });
  }

  closeAllDialogs() {
    this.dialog.closeAll();
  }

}
