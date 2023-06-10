import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingApiService {
  is_staging = true;
  api_basic_url: string;
  api_ecommerce_url: string;
  api_recharge_url: string;
  api_rechargeOnly_url: string;
  api_promocode_url: string;
  api_report_url: string;
  api_bus_url: string;

  //API Url

  url_api_basic = '/api/basic/';
  url_api_ecommerce = '/api/ecommerce/';
  url_api_recharge = '/api/recharge/';
  url_api_rechargeOnly = '/api/recharge';
  url_api_promocode = '/api/promocode/';
  url_api_report = '/api/report/';
  url_api_bus = '/api/bus/';

  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIIEIjANBgkqhkiG9w0BAQEFAAOCBA8AMIIECgKCBAEA0NQoMtpXDrzbvMjsCX6v
Pbx4crq/XFgmp1dV21P5yXyUI1lzva3AIYeRsD5cniniWZAkIo9RdS0ErCT3oPX4
f4R7CgX/xkdfrO+iQv6lqius+wkaT+G+6e1GmyDvP9sR31SWNaWdp75+wuWKZceq
Wj/gjHOZ9v8PrkK3VEWGS9u1sdTVfoCklIfz5WEVCDX5iuelYO/SnmaWicoDZrGp
wpUhlv5YqbHAyPP9edrHnY39vd7ylTZs2cCme4NB0Pk3EOj88smPa06lheOM65Qz
0jElx+wbbZYR0kQPu+OZGFiXbxPRtFgAwttL2dQyJuqWwgNLhi6xWW6iZxrrhxD+
vaofAcrnCAZkXA2BDmIWXTBHAMrp5rqkOP9oa4EaQQN9LAIBChrry8fJBdgUdcFg
a8DKMjsjpgcEI+Vbfxo8jjoFzSdNy203ChuMpbNn9elqZ/UKB9uqLLnZ7H4ocLUy
0PjM2BM+GcdyGqB1yU5g/gDViZHYMqE7FGGjHEQG6tQhA/3abuFdcOaaPSKR5Qhs
jIbSj+hvP1XC+7AcsJ+g4fMn21T++sh0DTmcnwC/1Mo6KiiD9wGgG77kbMfnZWaB
iWXIc7Rb1zvl2sBBxqjWkA3as7NrOjS+HvhdBr1wp0z88xXlbi2U5SMeeYoh+nK9
hJmpqKrLkjURzijBt32AKWjDxgowZnBGMishRSUZfNO2M4eFdTov8Xc7+5FbzMwp
+VCHQh1z8vHqwBgCYU7W4pIscu2BAdRrdYQIw2Z8JOK3rceoviuam2Ul0cA4cjkY
DbZcSXq+I3oYOXGjTg1ZYyKkpN52vEWAivuvCTh6CGh3KPplPx93H7HyVp8/aZMV
8kCfshmlI3/2NaMU8yknqwId5ZTBmNp7jY3y9oFWDl0ntO37NnfOfjVYyMbsEjE4
569OwmqSkIff+JZTYStsbrLEzvcsaoQfTYg7JFfd5EYnEWOnBWrNR70b5t1BkAHk
q1r9aUgXgAbyaOf9BFMjiGI8PH6HPT3Opd4X9QjCRohDDClmf5rwjvrZQ3po8BwM
IQGICNsycAql6GYo9m1x1VliAzeLvbfnvb4ur3T3xhxsnj/3exTHhvy7uUkl13EO
SUSsBC9N4/tOLcM7T8h17EeCvzLzvmD7racOw89vdpWeMPsSrTGcjoImLH1EEiop
KJuySBDvYfTDZoUx5E4qK/Qz0fJXap4Bd9epoSLgHHBQg8zf30wMPbvF9rkda7Qo
cVeBStcrHsnSAVGeJ74x3HNeH0A0/Potxv5zG5dZyKsWHydBMm0S1DF+l434H4uI
Ahmo3kjSUjLieWGPRTqdAjDFL+l4h7kyfYaZsIX5BBDbJMY5Z8VdscbT3w8x8Mqn
qQIDAQAB
-----END PUBLIC KEY-----`;

  encryptWithPublicKey(valueToEncrypt: string): string {
    let json = JSON.stringify(valueToEncrypt);

    const rsa = Forge.pki.publicKeyFromPem(this.publicKey);

    return window.btoa(rsa.encrypt(json.toString()));
  }

  loginEncryptWithPublicKey(valueToEncrypt: string): string {
    const user: any = localStorage.getItem('user');

    const userObj: any = JSON.parse(user);

    let publicKey1 = userObj.data.publicKey;


    let json = JSON.stringify(valueToEncrypt);
    

    const rsa = Forge.pki.publicKeyFromPem(publicKey1);

    return window.btoa(rsa.encrypt(json.toString()));
  }

  get(data: any) {
    let key = CryptoJS.enc.Utf8.parse('25527d9e52d509d72428ebf37547ff93');
    let iv = CryptoJS.enc.Utf8.parse('e59cb2dc03a6b6fc');

    let decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
    }).toString(CryptoJS.enc.Utf8);

    

    const obj = JSON.parse(decrypted);
    return obj;
  }

  currLat: any = '';
  currLng: any = '';
  user: any = '';
  userObj: any = '';
  userId: any = '';
  secretKey: any = '';
  a6: any;
  message: any = '';
  subTotalAmout: any;
  searchProduct1: any = '';
  searchNoProduct: any = '';
  promo: any = '';
  seachData: any = '';
  priceLowHigh: any = '';
  WishlistData: any = '';
  userObj2: any = '';
  result6: any = '';
  result7: any = [];
  busAvailable: any;
  url: any;
  pickupSelectBusValue: any = [];
  pickupTimeValue: any = [];
  busTotalPrice: any = '';
  SelectSeart: any = [];
  JourneyDate: any = '';
  Seat_data: any = [];
  blockedSeatValue: any = [];
  promocode: any = '';
  busBookSeatMsg: any = [];
  busbookingSeat: any = [];

  constructor(private http: HttpClient) {
    if (this.is_staging) {
      this.api_basic_url = environment.url_api_staging_basic;
      this.api_ecommerce_url = environment.url_api_staging_ecommerce;
      this.api_recharge_url = environment.url_api_staging_recharge;
      this.api_rechargeOnly_url = environment.url_api_staging_rechargeOnly;
      this.api_promocode_url = environment.url_api_staging_promocode;
      this.api_report_url = environment.url_api_staging_report;
      this.api_bus_url = environment.url_api_staging_bus;
    } else {
      this.api_basic_url = this.url_api_basic;
      this.api_ecommerce_url = this.url_api_ecommerce;
      this.api_recharge_url = this.url_api_recharge;
      this.api_rechargeOnly_url = this.url_api_rechargeOnly;
      this.api_promocode_url = this.url_api_promocode;
      this.api_report_url = this.url_api_report;
      this.api_bus_url = this.url_api_bus;
    }
  }

  getID() {
    this.user = localStorage.getItem('user');

    this.userObj = JSON.parse(this.user);

    if (this.userObj == null) {
      this.userId = '';
      this.secretKey = '';
    } else {
      this.userId = this.userObj.data.userId;
      this.secretKey = this.userObj.data.secretKey;
    }
  }

  getLocation() {
    this.getLoc().then((resp) => {
      localStorage.setItem('resp', JSON.stringify(resp));
    });

    const getl: any = localStorage.getItem('resp');

    let userObj1 = JSON.parse(getl);
    /* this.currLat = userObj1.lat;
    this.currLng = userObj1.lng; */

    if (userObj1 == null) {
      this.currLat = '00.00';
      this.currLng = '00.00';
    } else {
      this.currLat = userObj1.lat;
      this.currLng = userObj1.lng;
    }
  }

  isLogin(): any {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  setSelectBusValue(value: any) {
    this.pickupSelectBusValue = [];
    this.pickupSelectBusValue = value;
  }

  getSelectBusValue() {
    return this.pickupSelectBusValue;
  }
  setPickupTimeValue(value: any) {
    this.pickupTimeValue = [];
    this.pickupTimeValue = value;
  }

  getPickupTimeValue() {
    return this.pickupTimeValue;
  }

  setBusTotalPrice(value: any) {
    this.busTotalPrice = [];
    this.busTotalPrice = value;
  }

  getBusTotalPrice() {
    return this.busTotalPrice;
  }

  setSelectSeart(value: any) {
    this.SelectSeart = [];
    this.SelectSeart = value;
  }

  getSelectSeart() {
    return this.SelectSeart;
  }

  setJourneyDate(value: any) {
    this.JourneyDate = [];
    this.JourneyDate = value;
  }

  getJourneyDate() {
    return this.JourneyDate;
  }

  setSeat_data(value: any) {
    this.Seat_data = [];
    this.Seat_data = value;
  }

  getSeat_data() {
    return this.Seat_data;
  }

  getLoc(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      });
    });
  }

  busCityList(data: any) {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      searchText: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'getStops',
      encUser,
      requestOptions
    );
  }

  setBookSeatMsg(value: any) {
    this.busBookSeatMsg = value;
  }

  getBookSeatMsg() {
    return this.busBookSeatMsg;
  }

  setbusbookingSeat(value: any) {
    this.busbookingSeat = value;
  }

  getbusbookingSeat() {
    return this.busbookingSeat;
  }

  getAvailableBuses(data: any) {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      sourceId: data.sourceId,
      destinationId: data.destinationId,
      journeyDate: data.journeyDate,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'getAvailableBuses',
      encUser,
      requestOptions
    );
  }

  setBusAvailable(data: any) {
    this.busAvailable = [];
    this.busAvailable = data;
  }

  getBusAvailable() {
    return this.busAvailable;
  }

  busAvailableSeats(data: any) {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      sourceId: data.sourceId,
      destinationId: data.destinationId,
      journeyDate: data.journeyDate,
      tripId: data.tripId,
      provider: data.provider,
      operator: data.operator,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'getSeatLayout',
      encUser,
      requestOptions
    );
  }

  promocodes(data: any) {
    this.getID();
    this.getLocation();

    let data_to_send: any = {
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      userId: this.userId,
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      promocode: data.promocode,
      promocodeType: 'Bus',
      amount: data.amount,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_promocode_url + 'apply',
      encUser,
      requestOptions
    );
  }

  setBlockSeatBlocked(value: any) {
    this.blockedSeatValue = [];
    this.blockedSeatValue = value;
  }

  getBlockSeatBlocked() {
    return this.blockedSeatValue;
  }

  bookingbusConfirm(data: any) {
    this.getID();
    this.getLocation();

    let data_to_send: any = {
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      userId: this.userId,
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      mobileNo: data.mobileNo,
      emailId: data.emailId,
      journeyDate: data.journeyDate,
      boardingPointName: data.boardingPointName,
      boardingPointTime: data.boardingPointTime,
      droppingPointName: data.droppingPointName,
      droppingPointTime: data.droppingPointTime,
      passengerDetails: data.passengerDetails,
      busEncodedString: data.busEncodedString,
      boardingId: data.boardingId,
      droppingId: data.droppingId,
      promocode: data.promocode,
    };



    const encUser: string = btoa(JSON.stringify(data_to_send));


    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'blockSeat',
      encUser,
      requestOptions
    );
  }

  payment_status(data: any) {
    this.getID();
    this.getLocation();

    let data_to_send: any = {
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      userId: this.userId,
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      paymentGatewayId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http
      .post(this.api_bus_url + 'getPaymentStatus', encUser, requestOptions)
      .pipe(timeout(120000));
  }

  bookSeat(data: any) {

    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      ticketId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http
      .post(this.api_bus_url + 'bookSeat', encUser, requestOptions)
      .pipe(timeout(120000));
  }

  cancellationDetails(data: any, twoValue: any) {
    this.getID();
    let encryptSeatNos: any = [];
    encryptSeatNos.push(data.seatNos);
    let decryptSeat = Object.assign({}, encryptSeatNos);
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      ticketId: data.encyptedTicketId,
      seatNos: JSON.stringify(decryptSeat),
      emailId: twoValue.email,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'cancellationDetails',
      encUser,
      requestOptions
    );
  }

  cancelTicket(data: any, twoValue: any) {
    this.getID();
    let encryptSeatNos: any = [];
    encryptSeatNos.push(data.seatNos);
    let decryptSeat = Object.assign({}, encryptSeatNos);
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      ticketId: data.encyptedTicketId,
      seatNos: JSON.stringify(decryptSeat),
      emailId: twoValue.email,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'cancelTicket',
      encUser,
      requestOptions
    );
  }

  getMyBusBookings() {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'getMyBusBookings',
      encUser,
      requestOptions
    );
  }

  getTicketDetails(ticket: any) {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      ticketId: ticket,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'getTicketDetails',
      encUser,
      requestOptions
    );
  }

  setPromocode(value: any) {
    this.promocode = '';
    this.promocode = value;
  }

  getPromocode() {
    return this.promocode;
  }

  doPayment(data: any) {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      ticketId: data.ticketId,
      paymentMode: data.paymentMode,
      promocode: data.promocode,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_bus_url + 'doPayment',
      encUser,
      requestOptions
    );
  }
}
