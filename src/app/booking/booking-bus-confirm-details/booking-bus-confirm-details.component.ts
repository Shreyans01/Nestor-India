import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingApiService } from './../../services/booking-api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { BookingBusResponse } from './booking-bus.model';

@Component({
  selector: 'app-booking-bus-confirm-details',
  templateUrl: './booking-bus-confirm-details.component.html',
  styleUrls: ['./booking-bus-confirm-details.component.css'],
})
export class BookingBusConfirmDetailsComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  submitteds: boolean = false;
  isLoading = false;
  result: any;
  result1: any;
  result2: any;
  result3: any;
  result4: any;
  promocode: any;
  pickupSelectBusValue: any = [];
  pickupTimeValue: any = [];
  busTotalPrice: any = '';
  SelectSeart: any[] = [];
  JourneyDate: any = '';
  bookingbusConfirmForm: any;
  promocodeForm: FormGroup = new FormGroup({});
  pickupId: any = '';
  droppingId: any = '';
  BoardingTimes: any = '';
  dropingTimes: any = [];
  Seat_data: any = [];
  seat_obj: BookingBusResponse[] = [];
  seat_number: any;
  passengerDetails: any = [];
  fromValue: any = '';
  toValue: any = '';
  arr: any[] = [];
  constructor(
    private bookingServiceApi: BookingApiService,
    private route: Router,
    private fb: FormBuilder,
    private Notification: NotificationServiceService
  ) {
    this.promocodeForm = this.fb.group({
      promocode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$'),
        ],
      ],
    });
  }
  ngOnDestroy(): void {}

  get getForm() {
    return this.bookingbusConfirmForm.controls;
  }

  isNan(value: any) {
    return isNaN(value);
  }

  promocodeValue(value: any) {
    this.submitteds = true;
    if (this.promocodeForm.valid) {
      this.promocode = value.promocode;
      
      let data: any = {
        promocode: value.promocode,
        amount: this.busTotalPrice,
      };
      this.bookingServiceApi.promocodes(data).subscribe(
        (response: any) => {
          
          this.result = 'Data not found';
          
        },
        (error: any) => {
          let errors = error.error;
          

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            console.warn(a);
            if (error.error.text) {
              if (a.status === 'Success') {
                

                this.result4 = a.message;
                this.Notification.showSuccess(this.result4, '');
                if (this.promocode == undefined) {
                  this.promocode = '';
                } else if (this.result4 != 'Promocode applied successfully.') {
                  this.promocode = '';
                }

                
                localStorage.setItem('promocode', this.promocode);
              } else {
                this.result3 = a.message;
                this.Notification.showError(this.result3, '');
              }
            } else {
              this.result3 = a.message;
              this.Notification.showError(this.result3, '');
            }
          } else {
            let b = this.bookingServiceApi.get(errors);
            
            this.result3 = b.message;
            this.Notification.showError(this.result3, '');
          }
        }
      );
    }
  }
  get getFormpromocode() {
    return this.promocodeForm.controls;
  }

  bookingbusConfirm(data: any) {
    this.submitted = true;
    if (this.bookingbusConfirmForm.valid) {
      this.isLoading = true;
      const passenArray: any[] = [];
      this.passengerDetails = JSON.stringify(data?.ClassDetails);
      if (this.promocode == undefined) {
        this.promocode = '';
      } else if (this.result4 != 'Promocode applied successfully.') {
        this.promocode = '';
      }
      

      let data1: any = {
        mobileNo: data.mobileNumber,
        emailId: data.emailId,
        journeyDate: this.JourneyDate,
        boardingPointName: this.BoardingTimes.Location,
        boardingPointTime: this.BoardingTimes.Time,
        droppingPointName: this.dropingTimes.Location,
        droppingPointTime: this.dropingTimes.Time,
        passengerDetails: this.passengerDetails,
        busEncodedString: this.pickupSelectBusValue.BusEncodedString,
        boardingId: this.pickupId,
        droppingId: this.droppingId,
        promocode: this.promocode,
      };

      this.bookingServiceApi.bookingbusConfirm(data1).subscribe(
        (response: any) => {
          
          this.result1 = 'Data not found';
          this.isLoading = false;
        },
        (error: any) => {
          let errors = error.error;
          

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            console.warn(a);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result2 = a.data;

                localStorage.setItem(
                  'BlockSeatBlocked',
                  JSON.stringify(this.result2)
                );
                
                localStorage.setItem('busbookingSeatMessage', a.message);
                
                this.route.navigate(['/booking/busBookingPayment']);
              } else {
                this.isLoading = false;
                this.result1 = a.message;
                this.Notification.showError(this.result1, '');
              }
            } else {
              this.isLoading = false;
              this.result1 = a.message;
              this.Notification.showError(this.result1, '');
            }
          } else {
            this.isLoading = false;
            let b = this.bookingServiceApi.get(errors);
            
            this.result1 = b.message;
            this.Notification.showError(this.result1, '');
          }
        }
      );
    } else {
      return;
    }
  }

  ngOnInit(): void {
    
    this.fromValue = localStorage.getItem('fromNameValue');
    this.toValue = localStorage.getItem('toNameValue');

    /* this.pickupTimeValue = this.bookingServiceApi.getPickupTimeValue(); */

    const pickupTime: any = localStorage.getItem('value');
    this.pickupTimeValue = JSON.parse(pickupTime);

    this.pickupId = this.pickupTimeValue.boardingTime;
    this.droppingId = this.pickupTimeValue.DroppingTimes;

    /* this.pickupSelectBusValue = this.bookingServiceApi.getSelectBusValue(); */

    const selectBuas: any = localStorage.getItem('selectBusAvailable');
    this.pickupSelectBusValue = JSON.parse(selectBuas);

    this.BoardingTimes = this.pickupSelectBusValue.BoardingTimes.find(
      (e: any) => e.PointId == this.pickupId
    );

    

    this.dropingTimes = this.pickupSelectBusValue.DroppingTimes.find(
      (e: any) => e.PointId == this.droppingId
    );

    

    const total: any = localStorage.getItem('totalPrice');
    this.busTotalPrice = JSON.parse(total);

    /* this.busTotalPrice = this.bookingServiceApi.getBusTotalPrice(); */

    const datesValue: any = localStorage.getItem('journeyDate');

    this.JourneyDate = JSON.parse(datesValue);

    this.Seat_data = this.bookingServiceApi.getSeat_data();

    const SelectSeats: any = localStorage.getItem('seat');
    this.SelectSeart = JSON.parse(SelectSeats);

    /* this.SelectSeart = this.bookingServiceApi.getSelectSeart(); */

    
    for (let index = 0; index < this.SelectSeart.length; index++) {
      const element = this.SelectSeart[index];
      
      this.seat_obj.push(this.Seat_data[element]);
    }
    

    /*  localStorage.setItem('seat_obj', JSON.stringify(this.seat_obj)); */

    /* const seatData: any = localStorage.getItem('seat_obj');
    this.seat_obj = JSON.parse(seatData); */

    this.seat_obj = this.seat_obj.filter(function (element) {
      return element !== undefined;
    });

    for (let i = 0; i < this.seat_obj.length; i++) {
      this.arr.push(this.BuildFormDynamic(this.seat_obj[i]));
    }
    
    this.bookingbusConfirmForm = this.fb.group({
      emailId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      ClassDetails: this.fb.array(this.arr),
    });
  }

  BuildFormDynamic(product: any): FormGroup {
    return this.fb.group({
      Title: [product?.IsLadiesSeat === 'True' ? 'Mrs' : ''],
      Name: [''],
      Gender: [product?.IsLadiesSeat === 'True' ? 'F' : ''],
      Age: [''],
      SeatNo: [product?.SeatNumber],
      SeatEncodedString: [product?.SeatEncodedString],
      IsLadiesSeat: [product?.IsLadiesSeat],
    });
  }
}
