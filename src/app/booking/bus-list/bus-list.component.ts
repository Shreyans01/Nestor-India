import { BookingApiService } from './../../services/booking-api.service';
import { Component, OnInit, AfterViewInit, Renderer2, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
declare function loadSeat(): any;
declare var $: any;
import * as moment from 'moment';
import { Options } from '@angular-slider/ngx-slider';
import { max } from 'rxjs/operators';
import { list } from 'ngx-bootstrap-icons';
import { EndOfLineState } from 'typescript';
import { NotificationServiceService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  [x: string]: any;
  busAvailable: any = [];
  rupee_sym: any;
  result: any;
  result1: any;
  result2: any;
  result4: any;
  result5: any;
  result6: any;
  result7: any;
  submitted: boolean = false;
  isLoading = false;
  flag: boolean = false;
  brandArray1: any = [];
  selectedArray: any = [];
  fromCity: any;
  toCity: any;
  fromCityValue: any;
  toCityValue: any;
  busOperators: any;
  searchText: any;
  selectBusAvailable: any = '';
  seatAvailable: any;
  lower: any = [];
  upper: any = [];
  selected_seats_arr: any = [];
  fromValue: any;
  toValue: any;
  fValue: any;
  tValue: any;
  dateValue: any;
  fromIdValue: any;
  toIdValue: any;
  minDate: any = '';
  selectedCheckboxArray: any[] = [];
  busBookingForm: FormGroup = new FormGroup({});
  busSeartSelectedForm: FormGroup = new FormGroup({});
  selectedCheckboxBusArray: any[] = [];
  otherData: any[] = [];
  allBusAvailable = [];
  amount: any = [];
  price: any = [];
  maxPrice: any = '';
  minPrice: any = '';
  maxPriceParameterValue: any = '';
  minPriceParameterValue: any = '';
  busMinPrice: any = '';
  busMaxPrice: any = '';
  eventId: any = '';
  id: any = '';
  priceBusAvailable: any = '';
  BusListingPrice: boolean = false;
  seat_data: any[] = [];
  Bus_type = [
    {
      Id: 1,
      Name: 'AC Semi-Sleeper',
    },
    {
      Id: 2,
      Name: 'AC Sleeper',
    },
    {
      Id: 3,
      Name: 'Non-AC Semi-Sleeper',
    },
    {
      Id: 4,
      Name: 'Non-AC Sleeper',
    },
  ];
  item: any;
  item_l: any;
  disabled: boolean = false;
  minMaxPrice: any;
  dates: any = [];

  /* value: number = this.minPrice;
  options: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    showTicks: true,
  }; */

  

  minPriceValue(value: any) {
  
    this.minPriceParameterValue = value;
    this.minBusPrice(this.minPriceParameterValue, this.maxPriceParameterValue);
  }

  maxPriceValue(value: any) {
  
    this.maxPriceParameterValue = value;
    this.minBusPrice(this.minPriceParameterValue, this.maxPriceParameterValue);
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  constructor(
    private bookingServiceApi: BookingApiService,
    private comm_ser: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private rendrer: Renderer2,
    public notification: NotificationServiceService
  ) {

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };

    this.fromValue = localStorage.getItem('fromName');
    this.toValue = localStorage.getItem('toName');
    this.fromIdValue = localStorage.getItem('fromId');
    this.toIdValue = localStorage.getItem('toId');
    this.dateValue = localStorage.getItem('date');
    this.dates = JSON.parse(this.dateValue);
  

    this.busBookingForm = this.fb.group({
      fromCity: [this.fromValue, [Validators.required]],
      toCity: [this.toValue, [Validators.required]],
      bookingDate: [
        this.dates,
        [Validators.required, Validators.min(moment(new Date()).millisecond())],
      ],
      /* Seats: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], */
    });

    this.busSeartSelectedForm = this.fb.group({
      boardingTime: ['', [Validators.required]],
      DroppingTimes: ['', [Validators.required]],
    });
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }

  ngAfterViewInit(): void {
    /* this.appendScript(); */
  }

  /* appendScript() {
    const script = this.rendrer.createElement('script');
    script.src = 'loadSeat()';
    document.body.appendChild(script);
  } */

  ngOnInit(): void {
    this.busAvailable = [];
    //this.busAvailable = this.bookingServiceApi.getBusAvailable();
    const busLists: any = localStorage.getItem('busAvailable');
    this.busAvailable = JSON.parse(busLists);
    this.priceBusAvailable = this.bookingServiceApi.getBusAvailable();
    this.selectedArray = this.busAvailable.map((e: any) => e);
    this.allBusAvailable = this.busAvailable.map((e: any) => e);
    let busarray = this.bookingServiceApi.getBusAvailable();

    for (let index = 0; index < this.busAvailable.length; index++) {
      const element = this.busAvailable[index];
      if (element.Fares.indexOf('/') !== -1) {
        let temp_amount_array = element.Fares.split('/');
        temp_amount_array.forEach((x: any) => {
          

          this.amount.push(x);
        });
      } else {
        this.amount.push(element.Fares);
      }
    }
    this.price = this.amount.join();

    function getArrayMax(price: any) {
      return Math.max.apply(null, price);
    }
    this.maxPrice = getArrayMax(this.amount);
    

    function getArrayMin(price: any) {
      return Math.min.apply(null, price);
    }
    this.minPrice = getArrayMin(this.amount);
    
  }

  sortingPrice(value: any) {
    this.amount = [];
    this.minPrice = '';
    this.maxPrice = '';
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (element.Fares.indexOf('/') !== -1) {
        let temp_amount_array = element.Fares.split('/');
        temp_amount_array.forEach((x: any) => {
          

          this.amount.push(x);
        });
      } else {
        this.amount.push(element.Fares);
      }
    }
    this.price = this.amount.join();

    function getArrayMax(price: any) {
      return Math.max.apply(null, price);
    }
    this.maxPrice = getArrayMax(this.amount);
    

    function getArrayMin(price: any) {
      return Math.min.apply(null, price);
    }
    this.minPrice = getArrayMin(this.amount);
  }

  minBusPrice(minValue: any, maxValue: any) {
    this.busAvailable = [];
    this.busMinPrice = minValue;
    this.busMaxPrice = maxValue;
    

    
    for (let index = 0; index < this.priceBusAvailable.length; index++) {
      const element = this.priceBusAvailable[index];
      

      if (
        element.Fares >= this.busMinPrice &&
        element.Fares <= this.busMaxPrice
      ) {
        this.busAvailable.push(element);
      }
    }

  }

  busBooking(data: any) {
    

    this.busAvailable = [];

    this.fCity = '';
    this.tCity = '';
    this.submitted = true;
    if (this.busBookingForm.valid) {
      const dates = data.bookingDate;

      const dateValue: any = Object.keys(dates)
        .map(function (k) {
          return dates[k];
        })
        .join('-');

      if (data.fromCity.name != undefined) {
        this.fCity = data.fromCity.name;
      } else {
        this.fCity = this.fromValue;
      }

      if (data.toCity.name != undefined) {
        this.tCity = data.toCity.name;
      } else {
        this.tCity = this.toValue;
      }

      localStorage.setItem('fromName', this.fCity);
      localStorage.setItem('toName', this.tCity);
      localStorage.setItem('date', JSON.stringify(dates));
      localStorage.setItem('fromNameValue', this.fCity);
      localStorage.setItem('toNameValue', this.tCity);

      this.fromValue = this.fCity;

      this.toValue = this.tCity;

      this.busAvailable = [];

      this.isLoading = true;

      if (this.result2) {
        this.fromCityValue = this.result2.find(
          (e: any) => e.name == data.fromCity.name
        );
      } else {
        this.isLoading = false;
      }

      if (this.result4) {
        this.toCityValue = this.result4.find(
          (e: any) => e.name == data.toCity.name
        );
      } else {
        this.isLoading = false;
      }

      if (data.fromCity.id != undefined) {
        this.fromIdValue = data.fromCity.id;
      }

      if (data.toCity.id != undefined) {
        this.toIdValue = data.toCity.id;
      }
      /* let data1 = {
        sourceId: this.fromIdValue ? this.fromIdValue : data.fromCity.id,
        destinationId: this.toIdValue ? this.toIdValue : data.toCity.id,
        journeyDate: dateValue,
      }; */

      let data1 = {
        sourceId: this.fromIdValue,
        destinationId: this.toIdValue,
        journeyDate: dateValue,
      };
      

      const journeyDate = dateValue;

      localStorage.setItem('journeyDate', JSON.stringify(journeyDate));

      this.isLoading = true;

      this.bookingServiceApi.getAvailableBuses(data1).subscribe(
        (response) => {
          this.result6 = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.selectedArray = [];
                this.flag = true;
                const result8: any = a.data.availableBuses;

                localStorage.setItem('busAvailable', JSON.stringify(result8));
                this.allBusAvailable = a.data.availableBuses.slice();
                this.selectedArray = this.busAvailable.map((e: any) => e);

                this.isLoading = false;

                const busLists: any = localStorage.getItem('busAvailable');
                this.busAvailable = JSON.parse(busLists);
              } else {
                this.result6 = a.message;
                this.isLoading = false;
                this.flag = false;
              }
            } else {
              this.result6 = a.message;
              this.isLoading = false;
              this.flag = false;
            }
          } else {
            let b = this.bookingServiceApi.get(errors);
            this.result6 = b.message;

            this.isLoading = false;
            this.flag = false;
          }
        }
      );
    }
  }

  currentDate = new Date();

  fromList(value: any) {
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
              this.result2 = a.data.busStops;
              
            } else {
              this.result = a.message;
              this.flag = false;
              this.isLoading = false;
            }
          } else {
            this.result = a.message;
            this.flag = false;
            this.isLoading = false;
          }
        } else {
          let b = this.bookingServiceApi.get(errors);
          this.result = b.message;
          this.flag = false;
          this.isLoading = false;
        }
      }
    );
  }

  get getForm() {
    return this.busBookingForm.controls;
  }

  get getSeaForm() {
    return this.busSeartSelectedForm.controls;
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
              this.flag = false;
              this.isLoading = false;
            }
          } else {
            this.result = a.message;
            this.flag = false;
            this.isLoading = false;
          }
        } else {
          let b = this.bookingServiceApi.get(errors);
          this.result = b.message;
          this.flag = false;
          this.isLoading = false;
        }
      }
    );
  }

  getValue(e: any) {
    
  }

  selectLabelActive(event: any, id: any) {
    this.busAvailable = this.allBusAvailable;
    if (event.target.checked) {
      this.selectedCheckboxArray.push(id);
    } else {
      const index = this.selectedCheckboxArray.findIndex((e: any) => e === id);
      this.selectedCheckboxArray.splice(index, 1);
    }
    
    for (let index = 0; index < this.selectedCheckboxArray.length; index++) {
      const element = this.selectedCheckboxArray[index];
      

      
      this.busAvailable = this.busAvailable.filter((e: any) => {
        return e?.Id === element || e?.SeatType === element;
      });
      
    }
    if (this.selectedCheckboxArray.length == 0) {
      
      this.busAvailable = this.selectedArray;
    }
    
  }

  getActive(id: any) {
    return this.selectedArray1.some((e: any) => e === id);
  }

  selectLabelActive1(id: any, item: any) {
    const index = this.selectedArray1.findIndex((e: any) => e === id);
    if (index === -1) {
      this.selectedArray1.push(item?.id);
      this.selectedArray1.concat(',' + item?.id);
    } else {
      this.selectedArray1.splice(index, 1);
    }
    this.selectedArray1 = this.selectedArray1.join();
  }

  availableSeatView(value: any) {
    this.isLoading = true;
    
    this.selectedBusValue = value;
    

    if (this.selectBusAvailable == undefined) {
      this.selectBusAvailable = [];
    } else {
      this.selectBusAvailable = [];
      this.selectBusAvailable = this.busAvailable.find(
        (e: any) => e.Id == value?.Id
      );

      localStorage.setItem(
        'selectBusAvailable',
        JSON.stringify(this.selectBusAvailable)
      );
    }

    

    

    let data1: any = {
      sourceId: this.selectBusAvailable.SourceId,
      destinationId: this.selectBusAvailable.DestinationId,
      journeyDate: this.selectBusAvailable.BoardingTimes[0].Time,
      tripId: this.selectBusAvailable.Id,
      provider: this.selectBusAvailable.Provider,
      operator: this.selectBusAvailable.OperatorId,
    };

    this.bookingServiceApi.busAvailableSeats(data1).subscribe(
      (response) => {
        
        this.result7 = 'Data not found';
        
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.bookingServiceApi.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
             
              this.seatAvailable = a.data.seatLayout.Seats;
              
              this.initiazeSeatLower();
              this.initiazeSeatUpper();
              
            } else {
              this.result7 = a.message;
              
            }
          } else {
            this.result7 = a.message;
            
          }
        } else {
          let b = this.bookingServiceApi.get(errors);
          this.result7 = b.message;
          this.isLoading = false;
          
        }
      }
    );
  }

  keyword = 'name';
  selectEvent(item: any) {
  
  }
  

  initiazeSeatLower() {
    this.BusListingPrice = true;
    $('.seatCharts-row').remove();
    $('.seatCharts-legendItem').remove();
    $('#seat-mapLower,#seat-mapLower *').unbind().removeData();
    var data_array = Array();
    var unavailable = Array();
    var availableLadies = Array();
    var map_arrayLower = Array();
    var price_array_seater = Array();
    var price_array_hsleeper = Array();
    var price_array_vsleeper = Array();
    var max_col = 0;
    var max_row = 0;

    

    this.seatAvailable.forEach((element: any, key: any) => {
      this.seat_data[element['SeatEncodedString']] = element;

      if (element['Zindex'] == '0') {
        if (typeof data_array[element['Column']] == 'undefined') {
          data_array[element['Column']] = Array();
        }
        data_array[element['Column']][element['Row']] = element;

        if (parseInt(element['Row']) > max_row) {
          max_row = element['Row'];
        }
        if (parseInt(element['Column']) > max_col) {
          max_col = element['Column'];
        }

        if (
          element['Length'] == 1 &&
          element['Width'] == 1 &&
          price_array_seater.indexOf(element['TotalFare']) === -1
        ) {
          price_array_seater.push(element['TotalFare']);
        }
        if (
          element['Length'] == 1 &&
          element['Width'] == 2 &&
          price_array_vsleeper.indexOf(element['TotalFare']) === -1
        ) {
          price_array_vsleeper.push(element['TotalFare']);
        }
        if (
          element['Length'] == 2 &&
          element['Width'] == 1 &&
          price_array_hsleeper.indexOf(element['TotalFare']) === -1
        ) {
          price_array_hsleeper.push(element['TotalFare']);
        }
      }
    });

    

    var seats_obj = {};
    var character_increament = 'a';
    var seat_character_mapping: any = {};
    let item_seater: any = {};
    let item_vsleeper: any = {};
    let item_hsleeper: any = {};
    let item_l: any = {};
    let seatObjectValue: any = {};
    let seatObjectValueLadies: any = {};
    
    price_array_seater.forEach((element) => {
      item_seater = {
        price: element,
        classes: 'economy-class',
        category: 'Seater',
      };
      var temp = {
        [character_increament]: item_seater,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['seater'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class ladies',
        category: 'Ladies seater',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['seater_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });

    
    price_array_vsleeper.forEach((element) => {
      item_vsleeper = {
        price: element,
        classes: 'economy-class v-sleeper',
        category: 'Sleeper',
      };
      var temp = {
        [character_increament]: item_vsleeper,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['v_sleeper'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class v-sleeper ladies',
        category: 'Ladies sleeper',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['v_sleeper_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });

    
    price_array_hsleeper.forEach((element) => {
      item_hsleeper = {
        price: element,
        classes: 'economy-class h-sleeper',
        category: 'Sleeper',
      };
      var temp = {
        [character_increament]: item_hsleeper,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['h_sleeper'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class h-sleeper ladies',
        category: 'Ladies sleeper',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['h_sleeper_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });


    map_arrayLower = [];
    var seat_layout_str = '';
    for (let i = 1; i <= max_col; i++) {
      seat_layout_str = '';
      for (let j = 1; j <= max_row; j++) {
        if (
          typeof data_array[i] == 'undefined' ||
          typeof data_array[i][j] == 'undefined' ||
          data_array[i][j] === undefined
        ) {
          seat_layout_str += '_';
        } else {
          if (
            data_array[i][j]['Length'] == '1' &&
            data_array[i][j]['Width'] == '1'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['seater'];
            } else {
              seat_layout_str += seat_character_mapping['seater_l'];
              availableLadies.push(i + '_' + j);
            }

            if (data_array[i][j]['IsAvailableSeat'] == 'False') {
              unavailable.push(i + '_' + j);
            }
          }

          if (
            data_array[i][j]['Length'] == '1' &&
            data_array[i][j]['Width'] == '2'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['v_sleeper'];
            } else {
              seat_layout_str += seat_character_mapping['v_sleeper_l'];
              availableLadies.push(i + '_' + j);
            }

            if (data_array[i][j]['IsAvailableSeat'] == 'False') {
              unavailable.push(i + '_' + j);
            }
          }

          if (
            data_array[i][j]['Length'] == '2' &&
            data_array[i][j]['Width'] == '1'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['h_sleeper'];
            } else {
              seat_layout_str += seat_character_mapping['h_sleeper_l'];
              availableLadies.push(i + '_' + j);
            }

            if (data_array[i][j]['IsAvailableSeat'] == 'False') {
              unavailable.push(i + '_' + j);
            }
          }
        }
      }
      map_arrayLower.push(seat_layout_str);
    }
    

    this.seatAvailable.forEach((element: any) => {
      if (
        element['Length'] == 1 &&
        element['Width'] == 1 &&
        price_array_seater.indexOf(element['TotalFare']) === -1
      ) {
        price_array_seater.push(element['TotalFare']);
      }
      if (
        element['Length'] == 1 &&
        element['Width'] == 2 &&
        price_array_vsleeper.indexOf(element['TotalFare']) === -1
      ) {
        price_array_vsleeper.push(element['TotalFare']);
      }
      if (
        element['Length'] == 2 &&
        element['Width'] == 1 &&
        price_array_hsleeper.indexOf(element['TotalFare']) === -1
      ) {
        price_array_hsleeper.push(element['TotalFare']);
      }
    });

    seatObjectValue = Object.values(seats_obj)[0];
    seatObjectValueLadies = Object.values(seats_obj)[1];
    
    $(document).ready(() => {
      var value: any = 0;
      const counter = document.getElementById('counter');
      if (counter) counter.innerText = value;
      const total = document.getElementById('total');
      if (total) total.innerText = value;
      const selected_seats = document.getElementById('selected-seats');
      if (selected_seats) selected_seats.innerText = '';
      var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-mapLower').seatCharts({
          map: map_arrayLower,
          seats: seats_obj,
          naming: {
            top: false,
            getLabel: function (character: any, row: any, column: any) {
              return data_array[row][column]['SeatNumber'];
            },
            getId: function (character: any, row: any, column: any) {
              return data_array[row][column]['SeatEncodedString'];
            },
          },
          legend: {
            node: $('#legendLower'),
            items: [
              ['a', 'available', seatObjectValue?.category],
              ['b', 'availableLadies', seatObjectValueLadies?.category],
              ['a', 'unavailable', 'Already Booked'],
            ],
          },
          click: function () {
            if (this.status() == 'available') {
              //let's create a new <li> which we'll add to the cart items
              if (price_array_seater) {
                $(
                  '<li>' +
                    seatObjectValue?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              } else if (price_array_vsleeper) {
                $(
                  '<li>' +
                    seatObjectValue?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              } else if (price_array_hsleeper) {
                $(
                  '<li>' +
                    seatObjectValue?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              }
              /*
               * Lets update the counter and total
               *<a id="selected-seats" class="cancel-cart-item text-danger text-4"><i class="far fa-times-circle"></i></a>
               * .find function will not find the current seat, because it will change its stauts only after return
               * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
              //  */
              // $counter.text(sc.find('selected').length + 1);
              // $total.text(recalculateTotal(sc, seatObjectValue?.price) + parseInt(seatObjectValue?.price));
              selectSeat(this.settings.id);
              return 'selected';
            } else if (this.status() == 'availableLadies') {
              //let's create a new <li> which we'll add to the cart items
              if (price_array_seater) {
                $(
                  '<li>' +
                    seatObjectValueLadies?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              } else if (price_array_vsleeper) {
                $(
                  '<li>' +
                    seatObjectValueLadies?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              } else if (price_array_hsleeper) {
                $(
                  '<li>' +
                    seatObjectValueLadies?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              }
              /*
               * Lets update the counter and total
               *
               * .find function will not find the current seat, because it will change its stauts only after return
               * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
               */
              // $counter.text(sc.find('selected').length + 1);
              // $total.text(recalculateTotal(sc, seatObjectValue?.price) + parseInt(this.data().price));
              selectSeat(this.settings.id);
              return 'selected';
            } else if (this.status() == 'selected') {
              //update the counter
              if (price_array_seater) {
                $counter.text(sc.find('selected').length - 1);
                //and total
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) -
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) - parseInt(seatObjectValue?.price)
                );

                //remove the item from our cart
                $('#cart-item-' + this.settings.id).remove();
              } else if (price_array_vsleeper) {
                $counter.text(sc.find('selected').length - 1);
                //and total
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) -
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) - parseInt(seatObjectValue?.price)
                );

                //remove the item from our cart
                $('#cart-item-' + this.settings.id).remove();
              } else if (price_array_hsleeper) {
                $counter.text(sc.find('selected').length - 1);
                //and total
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) -
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) - parseInt(seatObjectValue?.price)
                );

                //remove the item from our cart
                $('#cart-item-' + this.settings.id).remove();
              }
              unSelectSeat(this.settings.id);
              //seat has been vacated
              return 'available';
            } else if (this.status() == 'unavailable') {
              //seat has been already booked
              return 'unavailable';
            } else {
              return this.style();
            }
          },
        });

      //this will handle "[cancel]" link clicks
      $('#selected-seats').on('click', '.cancel-cart-item', () => {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc.get($(this).parents('li:first').data('seatId')).click();
      });

      //let's pretend some seats have already been booked
      sc.get(unavailable).status('unavailable');
      sc.get(availableLadies).status('availableLadies');
    });

    this.isLoading = false;

    // const recalculateTotal = (sc: any) => {
    //   var total = 0;

    //   if (price_array_seater) {
    //     sc.find('selected').each(() => {
    //       total += parseInt(seatObjectValue?.price);
    //     });
    //   }
    //   else if (price_array_vsleeper) {
    //     sc.find('selected').each(() => {
    //       total += parseInt(seatObjectValue?.price);
    //     });
    //   }
    //   else if (price_array_hsleeper) {
    //     sc.find('selected').each(() => {
    //       total += parseInt(seatObjectValue?.price);
    //     });
    //   }

    //   return total;
    // }
  }

  initiazeSeatUpper() {
    this.BusListingPrice = true;
    $('.seatCharts-row').remove();
    $('.seatCharts-legendItem').remove();
    $('#seat-mapUpper,#seat-mapUpper *').unbind().removeData();
    var data_array = Array();
    var unavailable: any[] = [];
    var availableLadies: any[] = [];
    var map_arrayUpper = Array();
    var price_array_seater = Array();
    var price_array_hsleeper = Array();
    var price_array_vsleeper = Array();
    var max_col = 0;
    var max_row = 0;

    

    this.seatAvailable.forEach(function (element: any, key: any) {
     
      if (element['Zindex'] == '1') {
        if (typeof data_array[element['Column']] == 'undefined') {
          data_array[element['Column']] = Array();
        }
        data_array[element['Column']][element['Row']] = element;

        if (parseInt(element['Row']) > max_row) {
          max_row = element['Row'];
        }
        if (parseInt(element['Column']) > max_col) {
          max_col = element['Column'];
        }

        if (
          element['Length'] == 1 &&
          element['Width'] == 1 &&
          price_array_seater.indexOf(element['TotalFare']) === -1
        ) {
          price_array_seater.push(element['TotalFare']);
        }
        if (
          element['Length'] == 1 &&
          element['Width'] == 2 &&
          price_array_vsleeper.indexOf(element['TotalFare']) === -1
        ) {
          price_array_vsleeper.push(element['TotalFare']);
        }
        if (
          element['Length'] == 2 &&
          element['Width'] == 1 &&
          price_array_hsleeper.indexOf(element['TotalFare']) === -1
        ) {
          price_array_hsleeper.push(element['TotalFare']);
        }
      }
    });

    

    var seats_obj = {};
    var character_increament = 'a';
    var seat_character_mapping: any = {};
    let item_hsleeper: any = {};
    let seatObjectValue: any = {};
    let seatObjectValueLadies: any = {};
    // Logic for build seater price
    price_array_seater.forEach((element) => {
      var item = {
        price: element,
        classes: 'economy-class',
        category: 'Seater',
      };
      var temp = {
        [character_increament]: item,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['seater'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class ladies',
        category: 'Ladies Seater',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['seater_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });

    // Logic for build Vertical Sleeper price
    price_array_vsleeper.forEach((element) => {
      var item = {
        price: element,
        classes: 'economy-class v-sleeper',
        category: 'Sleeper',
      };
      var temp = {
        [character_increament]: item,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['v_sleeper'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class v-sleeper ladies',
        category: 'Ladies Sleeper',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['v_sleeper_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });

    // Logic for build Horizontal Sleeper price
    price_array_hsleeper.forEach((element) => {
      item_hsleeper = {
        price: element,
        classes: 'economy-class h-sleeper',
        category: 'Sleeper',
      };
      var temp = {
        [character_increament]: item_hsleeper,
      };
      Object.assign(seats_obj, temp);
      seat_character_mapping['h_sleeper'] = character_increament;
      character_increament = this.nextChar(character_increament);

      var item_l = {
        price: element,
        classes: 'economy-class h-sleeper ladies',
        category: 'Ladies sleeper',
      };
      var temp_l = {
        [character_increament]: item_l,
      };
      Object.assign(seats_obj, temp_l);
      seat_character_mapping['h_sleeper_l'] = character_increament;
      character_increament = this.nextChar(character_increament);
    });

   

    map_arrayUpper = [];
    var seat_layout_str = '';
    for (let i = 1; i <= max_col; i++) {
      seat_layout_str = '';
      for (let j = 1; j <= max_row; j++) {
        if (
          typeof data_array[i] == 'undefined' ||
          typeof data_array[i][j] == 'undefined' ||
          data_array[i][j] === undefined
        ) {
          seat_layout_str += '_';
        } else {
          if (
            data_array[i][j]['Length'] == '1' &&
            data_array[i][j]['Width'] == '1'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['seater'];
            } else {
              seat_layout_str += seat_character_mapping['seater_l'];
            }
          }

          if (
            data_array[i][j]['Length'] == '1' &&
            data_array[i][j]['Width'] == '2'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['v_sleeper'];
            } else {
              seat_layout_str += seat_character_mapping['v_sleeper_l'];
            }
          }

          if (
            data_array[i][j]['Length'] == '2' &&
            data_array[i][j]['Width'] == '1'
          ) {
            if (data_array[i][j]['IsLadiesSeat'] == 'False') {
              seat_layout_str += seat_character_mapping['h_sleeper'];
            } else {
              seat_layout_str += seat_character_mapping['h_sleeper_l'];
              availableLadies.push(i + '_' + j);
            }

            if (data_array[i][j]['IsAvailableSeat'] == 'False') {
              unavailable.push(i + '_' + j);
            }
          }
        }
      }
      map_arrayUpper.push(seat_layout_str);
    }
  

    var found = map_arrayUpper.filter((res) => !res);
    if (found) {
      if (found.length == map_arrayUpper.length) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }

    this.seatAvailable.forEach((element: any) => {
      if (
        element['Length'] == 1 &&
        element['Width'] == 1 &&
        price_array_seater.indexOf(element['TotalFare']) === -1
      ) {
        price_array_seater.push(element['TotalFare']);
      }
      if (
        element['Length'] == 1 &&
        element['Width'] == 2 &&
        price_array_vsleeper.indexOf(element['TotalFare']) === -1
      ) {
        price_array_vsleeper.push(element['TotalFare']);
      }
      if (
        element['Length'] == 2 &&
        element['Width'] == 1 &&
        price_array_hsleeper.indexOf(element['TotalFare']) === -1
      ) {
        price_array_hsleeper.push(element['TotalFare']);
      }
    });

    seatObjectValue = Object.values(seats_obj)[0];
    seatObjectValueLadies = Object.values(seats_obj)[1];

    // Seat Charts
    // var firstSeatLabel = 1;
    $(document).ready(() => {
      var value: any = 0;
      const counter = document.getElementById('counter');
      if (counter) counter.innerText = value;
      const total = document.getElementById('total');
      if (total) total.innerText = value;
      const selected_seats = document.getElementById('selected-seats');
      if (selected_seats) selected_seats.innerText = '';
      var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-mapUpper').seatCharts({
          map: map_arrayUpper,
          seats: seats_obj,
          naming: {
            top: false,
            getLabel: function (character: any, row: any, column: any) {
              return data_array[row][column]['SeatNumber'];
            },
            getId: function (character: any, row: any, column: any) {
              return data_array[row][column]['SeatEncodedString'];
            },
          },
          legend: {
            node: $('#legendUpper'),
            items: [
              ['a', 'available', seatObjectValue?.category],
              ['b', 'availableLadies', seatObjectValueLadies?.category],
              ['a', 'unavailable', 'Already Booked'],
            ],
          },
          click: function () {
            if (this.status() == 'available') {
              //let's create a new <li> which we'll add to the cart items
              if (price_array_hsleeper) {
                $(
                  '<li>' +
                    seatObjectValue?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    ' ' +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                const data: any = document.getElementById('total')?.innerText;
                
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) +
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) + parseInt(seatObjectValue?.price)
                );
              }

              /*
               * Lets update the counter and total
               *
               * .find function will not find the current seat, because it will change its stauts only after return
               * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
               */
              /*$counter.text(sc.find('selected').length + 1);
              $total.text(recalculateTotal(sc, seatObjectValue?.price) + parseInt(this.data().price));*/
              selectSeat(this.settings.id);
              return 'selected';
            } else if (this.status() == 'availableLadies') {
              //let's create a new <li> which we'll add to the cart items
              if (price_array_hsleeper) {
                $(
                  '<li>' +
                    seatObjectValueLadies?.category +
                    ' Seat # ' +
                    this.settings.label +
                    ': <b>₹' +
                    seatObjectValue?.price +
                    ' ' +
                    '</b></li>'
                )
                  .attr('id', 'cart-item-' + this.settings.id)
                  .data('seatId', this.settings.id)
                  .appendTo($cart);
                $counter.text(sc.find('selected').length + 1);
                $total.text(
                  recalculateTotal(sc, seatObjectValue?.price) +
                    parseInt(seatObjectValue?.price)
                );
              }

              /*
               * Lets update the counter and total
               *
               * .find function will not find the current seat, because it will change its stauts only after return
               * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
               */
              // $counter.text(sc.find('selected').length + 1);
              // $total.text(recalculateTotal(sc) + parseInt(this.data().price));
              selectSeat(this.settings.id);
              return 'selected';
            } else if (this.status() == 'selected') {
              //update the counter
              if (price_array_hsleeper) {
                $counter.text(sc.find('selected').length - 1);
                //and total
                const data: any = document.getElementById('total')?.innerText;
                $total.text(
                  data == 0
                    ? recalculateTotal(sc, seatObjectValue?.price) -
                        parseInt(seatObjectValue?.price)
                    : parseInt(data) - parseInt(seatObjectValue?.price)
                );
                

                //remove the item from our cart
                $('#cart-item-' + this.settings.id).remove();
              }
              unSelectSeat(this.settings.id);
              //seat has been vacated
              return 'available';
            } else if (this.status() == 'unavailable') {
              //seat has been already booked
              return 'unavailable';
            } else {
              return this.style();
            }
          },
        });

      //this will handle "[cancel]" link clicks
      $('#selected-seats').on('click', '.cancel-cart-item', () => {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc.get($(this).parents('li:first').data('seatId')).click();
      });

      //let's pretend some seats have already been booked
      sc.get(unavailable).status('unavailable');
      sc.get(availableLadies).status('availableLadies');
    });

    this.isLoading = false;
  }

  cancellation() {
    var selectSeat = document.querySelector('.selectSeat') as HTMLElement;
    var styleSeat = selectSeat?.style;
    styleSeat.display = 'none';
  }

  lowerSeat() {
    var selectSeat = document.querySelector('.selectSeat') as HTMLElement;
    var styleSeat = selectSeat?.style;
    styleSeat.display = 'block';
  }

  nextChar(c: any) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  ngOnDestroy() {
    /* localStorage.removeItem('fromId');
    localStorage.removeItem('toId');
    localStorage.removeItem('fromName');
    localStorage.removeItem('toName');
    localStorage.removeItem('date');
    localStorage.removeItem('busAvailable'); */
    this.busAvailable = [];
    this.allBusAvailable = [];
    this.selectedArray = [];
    selected_seats_arr = [];
    this.closeModal();
  }

  busSeartSelected(value: any) {
    this.submitted = true;
    const seatValidation: any[] = getSelectedSeat();
    if (seatValidation.length == 0) {
      this.notification.showError('Please select a seat', '');
    } else if (this.busSeartSelectedForm.valid) {
      

      //this.bookingServiceApi.setPickupTimeValue(value);

      localStorage.setItem('value', JSON.stringify(value));

      this.closeModal();
      const totalPrice: any = document.getElementById('total')?.innerText;
      //this.bookingServiceApi.setBusTotalPrice(totalPrice);

      localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

      
      const seat: any = getSelectedSeat();
      localStorage.setItem('seat', JSON.stringify(seat));
      //this.bookingServiceApi.setSelectSeart(seat);
      

      this.bookingServiceApi.setSeat_data(this.seat_data);
      

      /* localStorage.setItem('seat_data', JSON.stringify(this.seat_data)); */

      this.route.navigate(['/booking/bookingBusConfirmDetails']);

      getSelectedSeat();
    } else {
      return;
    }
  }
}

function recalculateTotal(sc: any, price: any) {
  var total: any = 0;
  sc.find('selected').each(() => {
    total += parseInt(price);
  });
  
  return total;
}


var selected_seats_arr: any = [];

function selectSeat(seat: any) {
  selected_seats_arr.push(seat);
  
}
function unSelectSeat(seat: any) {
  var index = selected_seats_arr.indexOf(seat);
  
  if (index > -1) {
    selected_seats_arr.splice(index, 1);
    
  }
}
function getSelectedSeat() {
  
  return selected_seats_arr;
}

