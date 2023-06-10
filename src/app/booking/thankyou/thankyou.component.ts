import { BookingApiService } from 'src/app/services/booking-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
})
export class ThankyouComponent implements OnInit, OnDestroy {
  busBookSeatMsg: any = '';
  ticketid: any = '';
  constructor(private bookingServiceApi: BookingApiService) {}
  ngOnDestroy(): void {
    localStorage.removeItem('busBookSeatMsg');
  }

  ngOnInit(): void {

    const busmsg: any = localStorage.getItem('bookedSeatmsg');
    this.busBookSeatMsg = JSON.parse(busmsg);

    //this.busBookSeatMsg = this.bookingServiceApi.getBookSeatMsg();
    
    /* if (busSeat) 
    {
      this.busBookSeatMsg = busSeat;
      localStorage.setItem('busBookSeatMsg',JSON.stringify(this.busBookSeatMsg));
    } 
    else 
    {
      const data: any = localStorage.getItem('busBookSeatMsg');
      this.busBookSeatMsg = JSON.parse(data);
    } */
  }
}
