import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RechargeApiServicesService {
  is_staging = true;
  api_basic_url: string;
  api_ecommerce_url: string;
  api_recharge_url: string;
  api_rechargeOnly_url: string;
  api_promocode_url: string;
  api_report_url: string;

  //API Url

  url_api_basic = '/api/basic/';
  url_api_ecommerce = '/api/ecommerce/';
  url_api_recharge = '/api/recharge/';
  url_api_rechargeOnly = '/api/recharge';
  url_api_promocode = '/api/promocode/';
  url_api_report = '/api/report/';
  //operatorsApi = '/api/recharge/operators';

  /* base_url = 'https://staging.nirmalrecharge.com/api_portal';

  operatorsApi = this.base_url + '/recharge/operators'; */

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
  rechCateArray = [];
  message: any = '';
  data1: any = '';
  billPaymentAmount: any;
  billPaymentField: any;
  billPaymentFieldValue: any;
  promo: any;
  promocodeType: any;
  BillPaymentNoFetchFieldValue: any;
  orderId: any;

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
      promocodeType: data.promocodeType,
      operator: data.operatorId,
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

  isLogin(): any {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  getLoc(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve({ lat: resp.coords.latitude, lng: resp.coords.longitude });
      });
    });
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
  constructor(private http: HttpClient) {
    if (this.is_staging) {
      this.api_basic_url = environment.url_api_staging_basic;
      this.api_ecommerce_url = environment.url_api_staging_ecommerce;
      this.api_recharge_url = environment.url_api_staging_recharge;
      this.api_rechargeOnly_url = environment.url_api_staging_rechargeOnly;
      this.api_promocode_url = environment.url_api_staging_promocode;
      this.api_report_url = environment.url_api_staging_report;
    } else {
      this.api_basic_url = this.url_api_basic;
      this.api_ecommerce_url = this.url_api_ecommerce;
      this.api_recharge_url = this.url_api_recharge;
      this.api_rechargeOnly_url = this.url_api_rechargeOnly;
      this.api_promocode_url = this.url_api_promocode;
      this.api_report_url = this.url_api_report;
    }
  }

  operators(data: any) {
    this.getLocation();
    let data1: any = {
      userId: '',
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      category: data,
    };


    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'operators',
      encUser,
      requestOptions
    );
  }

  MobilePlans(data: any) {
    this.getID();
    this.getLocation();
    let data1: any = {
      userId: '',
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      operator: data.operatorId,
      number: data.MobileNo,
    };


    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'plans',
      encUser,
      requestOptions
    );
  }

  MobilePlans1(data: any) {
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
      operator: data.operatorId,
      number: data.MobileNo,
    };

    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'plans',
      encUser,
      requestOptions
    );
  }

  subscribeId(data: any) {
    this.getID();
    this.getLocation();
    let data1: any = {
      userId: '',
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      operator: data.operatorId,
      number: data.subscribeId,
    };


    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'dthCustomInfo',
      encUser,
      requestOptions
    );
  }

  subscribeId1(data: any) {
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
      operator: data.operatorId,
      number: data.subscribeId,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'dthCustomInfo',
      encUser,
      requestOptions
    );
  }

  fetchBill(data: any) {
    
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
      operator: data.operator,
      customerNo: data.customerNo,
      field1: data.field1 ? data.field1 : '',
      field2: data.field2 ? data.field2 : '',
      field3: data.field3 ? data.field3 : '',
      field4: data.field4 ? data.field4 : '',
      field5: data.field5 ? data.field5 : '',
    };


    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_recharge_url + 'fetchBill',
      encUser,
      requestOptions
    );
  }

  setBillPaymentAmount(data1: any) {
    this.billPaymentAmount = '';

    this.billPaymentAmount = data1;
  }

  setBillPaymentField(data2: any) {
    this.billPaymentField = '';

    this.billPaymentField = data2;
//    localStorage.setItem('billPaymentField', data2);

  }

  setBillPaymentFieldValue(data: any) {
    this.billPaymentFieldValue = '';

    this.billPaymentFieldValue = data;
  }

  setBillPaymentNoFetchFieldValue(data: any) {
    this.BillPaymentNoFetchFieldValue = '';
    this.BillPaymentNoFetchFieldValue = data;
  }

  setpromocodeType(data: any) {
    this.promocodeType = '';

    this.promocodeType = data;
  }

  getBillPaymentValue() {
    return this.billPaymentAmount;
  }

  getBillPaymentField() {
    if(this.billPaymentField)
    {

      return this.billPaymentField;
    }
    else
    {
      this.billPaymentField = '';
      
      return this.billPaymentField;
    }
  }

  getBillPaymentFieldValue() {
    return this.billPaymentFieldValue;
  }

  getpromocodeType() {
    return this.promocodeType;
  }

  setPromocodes(value: any) {
    this.promo = value;
  }

  getBillPaymentNoFetchFieldValue() {
    return this.BillPaymentNoFetchFieldValue;
  }

  payment(data: any) {
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
      operator: data.operator,
      customerNo: data.customerNo,
      field1: data.field1,
      field2: data.field2,
      field3: data.field3,
      field4: data.field4,
      field5: data.field5,
      amount: data.amount,
      promocode: data.promocode,
      paymentMode: data.paymentMode,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.api_rechargeOnly_url, encUser, requestOptions);
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
    return this.http.post(
      this.api_recharge_url + 'getRechargePaymentStatus',
      encUser,
      requestOptions
    );
  }

  setOrderId(value: any) {
    this.orderId = value;
  }

  getOrderId() {
    return this.orderId;
  }

  rechargeDetails(data: any) {
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
      rechargeId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_recharge_url + 'rechargeDetails',
      encUser,
      requestOptions
    );
  }

  downloadRechargePdf(data: any) {
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
      rechargeId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_recharge_url + 'downloadReceipt',
      encUser,
      requestOptions
    );
  }

  accountStatement(data: any) {
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
      reportDate: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_report_url + 'accountStatement',
      encUser,
      requestOptions
    );
  }

  passbook(data: any) {
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
      reportDate: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_report_url + 'passbook',
      encUser,
      requestOptions
    );
  }
}
