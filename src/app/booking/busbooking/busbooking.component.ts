import { BookingApiService } from './../../services/booking-api.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NotificationServiceService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-busbooking',
  templateUrl: './busbooking.component.html',
  styleUrls: ['./busbooking.component.css'],
})
export class BusbookingComponent implements OnInit {
  result: any;
  result1: any;
  result2: any;
  result4: any;
  result5: any;
  result6: any;
  result7: any;
  submitted: boolean = false;
  isLoading = false;
  login = false;
  minDate: any = '';

  busBookingForm: FormGroup = new FormGroup({});
  constructor(
    private bookingServiceApi: BookingApiService,
    private route: Router,
    private fb: FormBuilder,
    private Notification: NotificationServiceService,
    private cdr:ChangeDetectorRef
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.busBookingForm = this.fb.group({
      fromCity: ['', [Validators.required]],
      toCity: ['', [Validators.required]],
      bookingDate: [this.minDate, [Validators.required]],
      /* Seats: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], */
    });

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  busBooking(data: any) {
    
    this.submitted = true;
    if (this.busBookingForm.valid) {
    
      this.isLoading = true;

      let fromCity: any = data.fromCity;

      let toCity: any = data.toCity;

      const dates = data.bookingDate;

      const dateValue: any = Object.keys(dates)
        .map(function (k) {
          return dates[k];
        })
        .join('-');

      let data1: any = {
        sourceId: fromCity.id,
        destinationId: toCity.id,
        journeyDate: dateValue,
      };

      const journeyDate = dateValue;
      localStorage.setItem('journeyDate', JSON.stringify(journeyDate));

      localStorage.setItem('fromId', fromCity.id);
      localStorage.setItem('toId', toCity.id);
      localStorage.setItem('fromName', fromCity.name);
      localStorage.setItem('toName', toCity.name);
      localStorage.setItem('date', JSON.stringify(data.bookingDate));
      localStorage.setItem('fromNameValue', data.fromCity.name);
      localStorage.setItem('toNameValue', data.toCity.name);

      if (data?.fromCity.id == undefined) {
        this.isLoading = false;
        this.result6 = 'please select valid from city';
      }
      else
      {
        this.result6 = ""
      }
      if (data?.toCity.id == undefined) {
        this.isLoading = false;
        this.result7 = 'please select valid to city';
      } else {
        this.result7 = '';
      }
      if (data?.fromCity.id != undefined && data?.toCity.id != undefined) {
        this.bookingServiceApi.getAvailableBuses(data1).subscribe(
          (response) => {
        
            this.isLoading = false;
            this.result6 = 'Data not found';
        
          },
          (error) => {
            let errors = error.error;
            if (error.status === 200) {
              let result1 = error.error.text;
              let a = this.bookingServiceApi.get(result1);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isLoading = false;
                  this.result5 = a.data.availableBuses;
               
                  localStorage.setItem(
                    'busAvailable',
                    JSON.stringify(this.result5)
                  );
                  this.route.navigate(['/booking/busList']);
               
                } else {
                  this.isLoading = false;
                  this.result6 = a.message;
                }
              } else {
                this.isLoading = false;
                this.result6 = a.message;
              }
            } else {
              this.isLoading = false;
              let b = this.bookingServiceApi.get(errors);
              this.result6 = b.message;
            }
          }
        );
      }
      
    }
  }

  currentDate = new Date();
  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.cdr.detectChanges()
  }

  get getForm() {
    return this.busBookingForm.controls;
  }

  toList(value: any) {
    this.bookingServiceApi.busCityList(value).subscribe(
      (response) => {
        
        this.result = 'Data not found';
        
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.bookingServiceApi.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result4 = a.data.busStops;
        
            } else {
              this.result = a.message;
              this.isLoading = false;
            }
          } else {
            this.result = a.message;
            this.isLoading = false;
          }
        } else {
          let b = this.bookingServiceApi.get(errors);
          this.result = b.message;
          this.isLoading = false;
        }
      }
    );
  }

  OnchangeError() {

  }

  keyword = 'name';

  selectEvent(item: any) {

  }

  fromList(val: string) {
    this.result6 = '';
    this.result2 = [];
    if (this.login) {
      this.bookingServiceApi.busCityList(val).subscribe(
        (response) => {
          this.result = 'Data not found';
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result2 = a.data.busStops;
              } else {
                this.result = a.message;
                this.isLoading = false;
              }
            } else {
              this.result = a.message;
              this.isLoading = false;
            }
          } else {
            let b = this.bookingServiceApi.get(errors);
            this.result = b.message;
            this.isLoading = false;
          }
        }
      );
    } else {
      let login = 'login required';
      this.Notification.showError(login, '');
    }

  }

  onFocused(e: any) {
    
  }
}
