import { ApiServicesService } from 'src/app/services/api-services.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingApiService } from 'src/app/services/booking-api.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeBtn1') closeBtn1!: ElementRef;
  isLoading: boolean = false;
  pastBooking: any[] = [];
  upComingBooking: any[] = [];
  getModelUpcomingData: any;
  getModelPastData: any;
  firstName: any = '';
  upcomingForm: FormGroup;
  isSubmittedUpcoming = false;
  isSubmittedPast = false;
  isCancelDetailsValid: boolean = false;
  CancelDetailsData: any;
  cancelDetailsMessage: any;
  result: any = '';
  result2: any = '';
  result3: any = '';
  result6: any = '';
  clicked: any = '';
  orderIdValue: any = '';

  constructor(
    public bookingServiceApi: BookingApiService,
    public router: Router,
    public fb: FormBuilder,
    private Notification: NotificationServiceService,
    private userData: ApiServicesService
  ) {
    this.upcomingForm = this.fb.group({
      email: [
        '',
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    });
  }

  orderIds1(value: any) {
    this.orderIdValue = '';
    this.orderIdValue = value;
  }

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }

  viewOrders() {
    this.isLoading = true;
    this.userData.myOrders().subscribe(
      (response) => {
        this.result = 'Data not found';
        this.isLoading = false;
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.result2 = a.data.myOrders;
            } else {
              this.isLoading = false;
              this.result = a.message;
            }
          } else {
            this.isLoading = false;
            this.result = a.message;
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);

          this.result = b.message;
        }
      }
    );
  }

  orderIds(data: any) {
    this.isLoading = true;
    this.userData.orderIds(data).subscribe(
      (response) => {
        this.result = 'Data not found';
        this.isLoading = false;
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.closeModal();
              this.result3 = a.message;
              this.Notification.showSuccess(this.result3, '');
              this.ngOnInit();
            } else {
              this.isLoading = false;
              this.result3 = a.message;
              this.Notification.showError(this.result3, '');
            }
          } else {
            this.isLoading = false;
            this.result3 = a.message;
            this.Notification.showError(this.result3, '');
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);

          this.result3 = b.message;
          this.Notification.showError(this.result3, '');
        }
      }
    );
  }

  receiptOrderIds(value: any) {
    this.userData.downloadRechargePdf(value).subscribe(
      (response: any) => {
        this.result = 'Data not found';
      },
      (error: any) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result3 = a.data.receiptURL;

              var FileSaver = require('file-saver');
              var blob = new Blob([this.result3], {
                type: 'text/pdf;charset=utf-8',
              });
              FileSaver.saveAs(blob, 'Receipt.pdf');
            } else {
              this.result2 = a.message;
            }
          } else {
            this.result2 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result2 = b.message;
        }
      }
    );
  }

  ngOnInit() {
    this.getBookingDetails();
    this.viewOrders();
  }

  get getValidationupcoming() {
    return this.upcomingForm.controls;
  }

  getBookingDetails() {
    this.bookingServiceApi.getMyBusBookings().subscribe(
      (response) => {
        this.result6 = 'Data not found';
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.bookingServiceApi.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              // this.isLoading = false;

              this.pastBooking = a.data.pastBookings;
              this.upComingBooking = a.data.upcomingBookings;
              // this.result5 = a.data.availableBuses;
              // this.bookingServiceApi.setBusAvailable(this.result5);
              // this.route.navigate(['/booking/busList']);

            } else {
              // this.isLoading = false;
              // this.result6 = a.message;
            }
          } else {
            // this.isLoading = false;
            // this.result6 = a.message;
          }
        } else {
          // this.isLoading = false;
          // let b = this.bookingServiceApi.get/(errors);
          // this.result6 = b.message;
        }
      }
    );
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  GetTicketId(ticketId: any) {
    this.router.navigate(['/busInvoice'], {
      state: { TicketId: ticketId },
    });
  }

  getModelUpcomingDetails(upcomingValue: any) {
    this.getModelUpcomingData = upcomingValue;

  }

  getModelPastDetails(pastValue: any) {
    this.getModelPastData = pastValue;

  }

  upcomingConformTicket(upComingData: any) {
    this.isSubmittedUpcoming = true;
    this.isLoading = true;
    if (this.upcomingForm.valid) {
      // this.closeModal();
      this.bookingServiceApi
        .cancellationDetails(
          this.getModelUpcomingData,
          this.upcomingForm.value.email
        )
        .subscribe(
          (response) => {

            this.isLoading = false;
            // this.result6 = 'Data not found';
            // this.clicked = false;
          },
          (error) => {
            let errors = error.error;
            if (error.status === 200) {
              let result1 = error.error.text;
              let a = this.bookingServiceApi.get(result1);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isLoading = false;
                  this.isCancelDetailsValid = true;
                  this.CancelDetailsData = a.data;
                  this.cancelDetailsMessage = a.message;

                  // this.getBookingDetails();
                  // this.Notification.showSuccess(a.message, '');
                } else {
                  this.isLoading = false;

                  this.Notification.showError(a.message, '');
                  // this.result6 = a.message;
                }
              } else {
                this.Notification.showError(a.message, '');
                this.isLoading = false;
                // this.result6 = a.message;
              }
            } else {
              this.isLoading = false;
              let b = this.bookingServiceApi.get(errors);
              this.Notification.showError(b.message, '');
              // this.result6 = b.message;
            }
          }
        );
    }
  }

  upComingCancelTicket() {
    this.closeModal();
    this.isLoading = true;
    this.bookingServiceApi
      .cancelTicket(this.getModelUpcomingData, this.upcomingForm.value.email)
      .subscribe(
        (response) => {

          this.isLoading = false;
          // this.result6 = 'Data not found';
          // this.clicked = false;
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.Notification.showSuccess(a.message, '');
                this.getBookingDetails();
              } else {
                this.isLoading = false;

                this.Notification.showError(a.message, '');
                // this.result6 = a.message;
              }
            } else {
              this.Notification.showError(a.message, '');
              this.isLoading = false;
              // this.result6 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.bookingServiceApi.get(errors);
            this.Notification.showError(b.message, '');
            // this.result6 = b.message;
          }
        }
      );
  }
}
