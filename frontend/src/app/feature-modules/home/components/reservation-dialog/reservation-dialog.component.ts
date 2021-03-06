import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReservationService } from '@shared/services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent implements OnInit {

  public reservationForm: FormGroup;
  sendError = false;

  constructor(
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.reservationForm = new FormGroup({
      numberOfPersons: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000)]),
      date: new FormControl(null, [Validators.required]),
      clientMessage: new FormControl(null)
    });
  }

  sendReservation() {
    const numberOfPersons: number = this.reservationForm.controls['numberOfPersons'].value;
    const dateAndTime: Date = this.reservationForm.controls['date'].value;
    const clientMessage: string = this.reservationForm.controls['clientMessage'].value;

    this.reservationService
      .sendReservation({ restaurantApiId: this.data.restaurantApiId, numberOfPersons, dateAndTime, clientMessage })
      .subscribe(reservation => {
        this.dialogRef.close();
        this.toastr.success('Prośba o rezerwacje została wysłana');
      }, error => {
        this.toastr.error('Błąd podczas wysyłania zapytania o stolik');
      });
  }

}
