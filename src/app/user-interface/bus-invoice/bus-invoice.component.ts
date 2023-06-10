import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingApiService } from 'src/app/services/booking-api.service';

@Component({
  selector: 'app-bus-invoice',
  templateUrl: './bus-invoice.component.html',
  styleUrls: ['./bus-invoice.component.css']
})
export class BusInvoiceComponent implements OnInit {
  ticketId: any;
  Invoice: any;
  passangerDetails: any[] = [];
  isLoading: boolean = false;
  constructor(public router: Router, public bookingServiceApi: BookingApiService) {
    if (this.router.getCurrentNavigation()?.extras) {
      this.ticketId = this.router.getCurrentNavigation()?.extras?.state?.TicketId;
      this.getViewBookingDetails(this.ticketId)
    }
  }

  ngOnInit(): void {
  }

  getViewBookingDetails(ticketId: any) {
    this.isLoading = true;
    this.bookingServiceApi.getTicketDetails(ticketId).subscribe(
      (response) => {
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.bookingServiceApi.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.Invoice = a.data;
              this.passangerDetails = this.Invoice.passangerDetails
              
            } else {

              this.isLoading = false;

            }
          } else {
            this.isLoading = false;

          }
        } else {
          this.isLoading = false;

        }
      }
    );
  }


}
