import { environment } from 'src/environments/environment';
import { OrderDetailsComponent } from './../e-commerce/order-details/order-details.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  is_staging = true;
  api_basic_url: string;
  api_ecommerce_url: string;
  api_recharge_url: string;
  api_promocode_url: string;
  api_profile_url: string;

  //API Url

  url_api_basic = '/api/basic/';
  url_api_ecommerce = '/api/ecommerce/';
  url_api_recharge = '/api/recharge/';
  url_api_promocode = '/api/promocode/';
  url_api_profile = '/api/profile/';


  /* url_api_basic = '/api/basic/';
  url_api_ecommerce = '/api/ecommerce/';

  url = this.url_api_basic+'login';
  url1 = this.url_api_basic+'signup';
  url2 = this.url_api_basic+'getProfileDetails';
  url3 = this.url_api_basic+'forgotPassword';
  url4 = this.url_api_basic+'resetPassword';
  url5 = this.url_api_basic+'changePassword';
  url6 = this.url_api_ecommerce+'categories';
  url7 = this.url_api_ecommerce+'brands';
  url8 = this.url_api_ecommerce+'addToCart';
  url9 = this.url_api_ecommerce+'getCart';
  url10 = this.url_api_ecommerce+'removeFromCart';
  url11 = this.url_api_ecommerce+'products';
  url12 = this.url_api_ecommerce+'productDetails';
  url13 = this.url_api_ecommerce+'placeOrder';
  url14 = this.url_api_ecommerce+'myOrders';
  url15 = this.url_api_ecommerce+'orderDetails';
  url16 = this.url_api_ecommerce+'topCategories';
  url17 = this.url_api_ecommerce+'relatedProducts';
  url18 = this.url_api_ecommerce+'newArrivalProducts';
  url19 = this.url_api_ecommerce+'bestSellerProduct';
  url20 = this.url_api_ecommerce+'featuredProducts';
  url21 = this.url_api_ecommerce+'getMyWishlist';
  url22 = this.url_api_ecommerce+'removeFromWishlist';
  url23 = this.url_api_ecommerce+'addToWishlist';
  url24 = '/api/basic/contactUs'; */

  /* base_url = 'https://staging.nirmalrecharge.com/api_portal'; */

  /* url = this.base_url + '/basic/login';
  url1 = this.base_url + '/basic/signup';
  url2 = this.base_url + '/basic/getProfileDetails';
  url3 = this.base_url + '/basic/forgotPassword';
  url4 = this.base_url + '/basic/resetPassword';
  url5 = this.base_url + '/basic/changePassword';
  url6 = this.base_url + '/ecommerce/categories';
  url7 = this.base_url + '/ecommerce/brands';
  url8 = this.base_url + '/ecommerce/addToCart';
  url9 = this.base_url + '/ecommerce/getCart';
  url10 = this.base_url + '/ecommerce/removeFromCart';
  url11 = this.base_url + '/ecommerce/products';
  url12 = this.base_url + '/ecommerce/productDetails';
  url13 = this.base_url + '/ecommerce/placeOrder';
  url14 = this.base_url + '/ecommerce/myOrders';
  url15 = this.base_url + '/ecommerce/orderDetails';
  url16 = this.base_url + '/ecommerce/topCategories';
  url17 = this.base_url + '/ecommerce/relatedProducts';
  url18 = this.base_url + '/ecommerce/newArrivalProducts';
  url19 = this.base_url + '/ecommerce/bestSellerProduct';
  url20 = this.base_url + '/ecommerce/featuredProducts';
  url21 = this.base_url + '/ecommerce/getMyWishlist';
  url22 = this.base_url + '/ecommerce/removeFromWishlist';
  url23 = this.base_url + '/ecommerce/addToWishlist';
  url24 = this.base_url + '/basic/contactUs'; */

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
  wishlistFetchArray: any;
  url: any;
  orderMsg: any = '';

  subTotal(data: any) {
    this.subTotalAmout = data;
  }

  getID() {
    if(localStorage.getItem('user')){
      this.user = localStorage.getItem('user');
  
      this.userObj = JSON.parse(this.user);

    }

    /* this.userId = this.userObj.data.userId;

    this.secretKey = this.userObj.data.secretKey; */
    if (this.userObj == null || this.userObj == '') {
      this.userId = '';
      this.secretKey = '';
    } else {
      this.userId = this.userObj?.data?.userId;
      this.secretKey = this.userObj.data.secretKey;
    }
  }

  fetchWishlist() {
    this.wishlistFetchArray = [];
    this.WishlistData = localStorage.getItem('Wishlist');

    this.userObj2 = JSON.parse(this.WishlistData);
    if (this.userObj2) {
      this.wishlistFetchArray = this.userObj2;
    } else {
      this.wishlistFetchArray = '';
    }
    return this.wishlistFetchArray;
  }

  setOrderId(value: any) {
    console.log("OrderValue0",value)
    this.orderMsg = value;
  }

  getOrderId() {
    console.log("OrderMessage::::::",this.orderMsg)
    return this.orderMsg;
  }

  getLocalWishlist() {
    this.result7 = [];
    this.getWishlist().subscribe(
      (response) => {
        this.result6 = 'Data not found';

      },
      (error) => {
        let errors = error.error;


        if (error.status === 200) {
          let result1 = error.error.text;

          let a = this.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {

              for (let index = 0; index < a.data.Wishlist.length; index++) {
                const element = a.data.Wishlist[index];
                this.result7.push(element.productId);
              }

              localStorage.setItem('Wishlist', JSON.stringify(this.result7));
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigateByUrl(this.url);

            } else {
              this.result6 = a.message;

            }
          } else {
            this.result6 = a.message;

          }
        } else {
          let b = this.get(errors);
          this.result6 = b.message;

        }
      }
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

  messagesSet(data: any) {
    this.message = data;
  }

  messagesGet() {
    return this.message;
  }

  getLocation() {
    this.getLoc().then((resp) => {
      localStorage.setItem('resp', JSON.stringify(resp));
    });

    const getl: any = localStorage.getItem('resp');

    let userObj1 = JSON.parse(getl);


    if (userObj1 == null) {
      this.currLat = '00.00';
      this.currLng = '00.00';
    } else {
      this.currLat = userObj1.lat;
      this.currLng = userObj1.lng;
    }
  }

  getremove() {
    localStorage.removeItem('resp');
  }
  encUser: any;
  progress: any = true;

  constructor(private http: HttpClient, private route: Router) {
    if (this.is_staging) {
      this.api_basic_url = environment.url_api_staging_basic;
      this.api_ecommerce_url = environment.url_api_staging_ecommerce;
      this.api_recharge_url = environment.url_api_staging_recharge;
      this.api_promocode_url = environment.url_api_staging_promocode;
      this.api_profile_url = environment.url_api_staging_profile;
    } else {
      this.api_basic_url = this.url_api_basic;
      this.api_ecommerce_url = this.url_api_ecommerce;
      this.api_recharge_url = this.url_api_recharge;
      this.api_promocode_url = this.url_api_promocode;
      this.api_profile_url = this.url_api_profile;
    }
    this.url = this.route.url;
  }

  urlData(value: any) {
    this.url = '';

    this.url = value;

  }

  setProductId(data: any) {
    this.a6 = data;
  }



  orderDetails(data: any) {
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
      orderId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'orderDetails',
      encUser,
      requestOptions
    );
  }

  myOrders() {
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
      this.api_ecommerce_url + 'myOrders',
      encUser,
      requestOptions
    );
  }

  setPromocodes(value: any) {
    this.promo = value;
  }

  checkOut(data: any) {
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
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      stateId: data.stateId,
      pincode: data.pincode,
      paymentMode: data.paymentMode,
      addressType: data.addressType,
      promocode: data.promocode,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
      'Access-Control-Allow-Origin': '*',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'placeOrder',
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
      orderId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_ecommerce_url + 'downloadReceipt',
      encUser,
      requestOptions
    );
  }

  states() {
    this.getID();
    this.getLocation();

    let data1: any = {
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


    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_basic_url + 'states',
      encUser,
      requestOptions
    );
  }

  login(data: any) {
    this.getLocation();

    const headerDict = {
      'Nipl-User-Key': '',
      'Access-Control-Allow-Origin': '*',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    (data.datafcmToken = '123456'),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.appVersion = ''),
      (data.modelNo = ''),
      (data.androidVersion = ''),
      (this.encUser = this.encryptWithPublicKey(data));

    return this.http.post(
      this.api_basic_url + 'login',
      this.encUser,
      requestOptions
    );
  }

  loginWithOTP(data: any){
    this.getLocation();

    const headerDict = {
      'Nipl-User-Key': '',
      'Access-Control-Allow-Origin': '*',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    (data.datafcmToken = '123456'),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.appVersion = ''),
      (data.modelNo = ''),
      (data.androidVersion = ''),
      (this.encUser = this.encryptWithPublicKey(data));

    return this.http.post(
      this.api_basic_url + 'loginWithOTP',
      this.encUser,
      requestOptions
    );
  }

  signup(data: any) {
    this.getLocation();

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    (data.shopName = 'Rambhiya Infotech'),
      (data.fcmToken = '123456'),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.appVersion = ''),
      (data.modelNo = ''),
      (data.androidVersion = '');

    const encUser: string = this.encryptWithPublicKey(data);
    return this.http.post(
      this.api_basic_url + 'signup',
      encUser,
      requestOptions
    );
  }

  contactAdd(data: any) {
    this.getLocation();

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    let data1: any = {
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      mobile: data.mobileNo,
      message: data.message,
      personName: data.fullName,
      'g-recaptcha-response': '',
    };
    /* (data.g-recaptcha-response = '123456789'); */

    const encUser: string = this.encryptWithPublicKey(data1);
    return this.http.post(
      this.api_basic_url + 'contactUs',
      encUser,
      requestOptions
    );
  }

  profile() {
    this.getID();
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
    };
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_basic_url + 'getProfileDetails',
      encUser,
      requestOptions
    );
  }

  getUpdateProfile(updateProfile: any) {
    this.getID();
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      firstName: updateProfile.firstName,
      lastName: updateProfile.lastName,
      shopName: 'Rambhiya Infotech 1',
      type: 'Android',
      version: '1',
      source: 'NirmalShree',
      appVersion: '1',
      latitude: this.currLat,
      longitude: this.currLng,
      deviceId: '123456',
      modelNo: 'Samsung M21',
      androidVersion: '11',
    };

    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_profile_url + 'update',
      encUser,
      requestOptions
    );
  }

  categoryNotLogin() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'categories',
      encUser,
      requestOptions
    );
  }

  topCategory() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'topCategories',
      encUser,
      requestOptions
    );
  }

  newArrivalProducts() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'newArrivalProducts',
      encUser,
      requestOptions
    );
  }

  bestSellerProduct() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'bestSellerProduct',
      encUser,
      requestOptions
    );
  }

  featuredProducts() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'featuredProducts',
      encUser,
      requestOptions
    );
  }

  categoryLogin() {
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
      this.api_ecommerce_url + 'categories',
      encUser,
      requestOptions
    );
  }

  brandsNotLogin() {
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
    };

    const encUser: string = this.encryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'brands',
      encUser,
      requestOptions
    );
  }

  brandsLogin() {
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
      this.api_ecommerce_url + 'brands',
      encUser,
      requestOptions
    );
  }

  forgotPassword(data: any) {
    this.getLocation();

    (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.appVersion = ''),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.modelNo = ''),
      (data.androidVersion = '');

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);


    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_basic_url + 'forgotPassword',
      encUser,
      requestOptions
    );
  }

  resetPassword(data: any) {
    this.getLocation();

    const username: any = localStorage.getItem('userName');


    const userObj2: any = JSON.parse(username);

    let username1 = userObj2.username;


    (data.username = username1),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.appVersion = ''),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.modelNo = ''),
      (data.androidVersion = '');

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);


    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_basic_url + 'resetPassword',
      encUser,
      requestOptions
    );
  }

  changePassword(data: any) {
    this.getID();

    this.getLocation();

    (data.userId = this.userId),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.appVersion = ''),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.modelNo = ''),
      (data.androidVersion = '');
    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_basic_url + 'changePassword',
      encUser,
      requestOptions
    );
  }

  addProductCart(data: any) {
    this.getID();
    this.getLocation();

    /* (data.userId = this.userId),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.appVersion = ''),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.modelNo = ''),
      (data.androidVersion = ''); */

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
      productId: data.productId,
      qty: data.qty,
    };


    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'addToCart',
      encUser,
      requestOptions
    );
  }

  addProductCart1(data: any) {
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
      productId: data,
      qty: 1,
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'addToCart',
      encUser,
      requestOptions
    );
  }

  getCart() {
    this.getID();
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
    };
    const encUser: string = this.loginEncryptWithPublicKey(data1);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_ecommerce_url + 'getCart',
      encUser,
      requestOptions
    );
  }

  getWishlist() {
    this.getID();

    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      appVersion: '1',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      latitude: this.currLat,
      longitude: this.currLng,
    };

    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'getMyWishlist',
      encUser,
      requestOptions
    );
  }

  removeProductCart(data: any) {
    this.getID();
    this.getLocation();

    /* (data.userId = this.userId),
      (data.type = 'Angular'),
      (data.version = '1'),
      (data.source = 'NirmalShree'),
      (data.appVersion = ''),
      (data.latitude = this.currLat),
      (data.longitude = this.currLng),
      (data.deviceId = ''),
      (data.modelNo = ''),
      (data.androidVersion = '');
      (data.productId = data); */

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      latitude: this.currLat,
      longitude: this.currLng,
      appVersion: '',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      productId: data,
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'removeFromCart',
      encUser,
      requestOptions
    );
  }

  removeProductWishlist(data: any) {
    this.getID();
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      latitude: this.currLat,
      longitude: this.currLng,
      appVersion: '',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      productId: data,
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'removeFromWishlist',
      encUser,
      requestOptions
    );
  }

  addProductWishlist(data: any) {
    this.getID();
    this.getLocation();

    let data1: any = {
      userId: this.userId,
      type: 'Angular',
      version: '1',
      source: 'NirmalShree',
      latitude: this.currLat,
      longitude: this.currLng,
      appVersion: '',
      deviceId: '',
      modelNo: '',
      androidVersion: '',
      productId: data,
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'addToWishlist',
      encUser,
      requestOptions
    );
  }

  CategoriesProductViewNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categoriesId,
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
      brands: data1.brandId,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  CategoriesProductViewLogin(data1: any) {
    this.getID();
    this.getLocation();

    let data: any = {
      categories: data1.categoriesId,
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
      brands: data1.brandId,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };


    const encUser: string = this.loginEncryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  allProductListNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: '',
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
      brands: data1,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  SearchProduct(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.category,
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
      brands: '',
      min_price: '',
      max_price: '',
      search: data1.search,
      sortBy: '',
      skip: '',
      show: '',
    };

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  setSearchValue(value: any) {
    this.searchNoProduct = '';
    this.searchProduct1 = value;
  }

  SearchDataSet(value: any) {
    this.seachData = value;
  }

  SearchDataGet() {
    return this.seachData;
  }

  setSearchValue1(value: any) {
    this.searchProduct1 = '';
    this.searchNoProduct = value;
  }

  getSearchValue() {
    return this.searchProduct1;
  }

  getSearchValue1() {
    return this.searchNoProduct;
  }

  allProductListLogin(data1: any) {
    this.getID();
    this.getLocation();

    let data: any = {
      categories: '',
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
      brands: data1,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  productDetails(data1: any) {

    this.getLocation();

    let data: any = {
      productId: data1,
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
    };

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'productDetails',
      encUser,
      requestOptions
    );
  }

  productDetails1() {
    this.getLocation();

    let data: any = {
      productId: this.a6,
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
    };

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'productDetails',
      encUser,
      requestOptions
    );
  }

  relatedProducts(data1: any) {

    this.getLocation();

    let data: any = {
      productId: data1,
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
    };

    //this.getremove();
    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'relatedProducts',
      encUser,
      requestOptions
    );
  }

  addProductCart2(data: any) {
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
      productId: this.a6,
      qty: data,
    };

    //this.getremove();
    const encUser: string = this.loginEncryptWithPublicKey(data1);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'addToCart',
      encUser,
      requestOptions
    );
  }

  priceLowToHighNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categories,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: '',
      sortBy: 'price-low-high',
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  priceHighToLowNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categories,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: '',
      sortBy: 'price-high-low',
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  newestNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categories,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: '',
      sortBy: 'newest',
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  priceLowHighSet(value: any) {
    if (value != '') {
      this.priceLowHigh = value;
    } else {
      this.priceLowHigh = '';
    }
  }

  noSortingNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categories,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: '',
      sortBy: data1.brandId,
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  allProductListSortBrandNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: '',
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: data1.search,
      sortBy: this.priceLowHigh,
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  allProductListSortBrandLogin(data1: any) {
    this.getID();
    this.getLocation();

    let data: any = {
      categories: '',
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
      brands: data1,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };

    const encUser: string = this.loginEncryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  CategoriesProductViewSortBrandNotLogin(data1: any) {
    this.getLocation();

    let data: any = {
      categories: data1.categories,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: data1.search,
      sortBy: this.priceLowHigh,
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  CategoriesProductViewSortBrandLogin(data1: any) {
    this.getID();
    this.getLocation();

    let data: any = {
      categories: data1.categoryId,
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
      brands: data1.brandId,
      min_price: '',
      max_price: '',
      search: '',
      sortBy: '',
      skip: '',
      show: '',
    };


    const encUser: string = this.loginEncryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  allProductListSortMinMaxiPrice(data1: any) {
    this.getLocation();

    let data: any = {
      categories: '',
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: '',
      sortBy: this.priceLowHigh,
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
      encUser,
      requestOptions
    );
  }

  CategoriesProductListSortMinMaxiPrice(data1: any): any {
    this.getLocation();

    let data: any = {
      categories: data1.categoryId,
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
      brands: data1.brandId,
      min_price: data1.min_price,
      max_price: data1.max_price,
      search: data1.search,
      sortBy: this.priceLowHigh,
      skip: '',
      show: '',
    };

    const encUser: string = this.encryptWithPublicKey(data);

    const headerDict = {
      'Nipl-User-Key': '',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(
      this.api_ecommerce_url + 'products',
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
    return this.http.post(
      this.api_ecommerce_url + 'getOrderPaymentStatus',
      encUser,
      requestOptions
    );
  }

  orderIds(data: any) {
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
      orderId: data,
    };


    const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
    const headerDict = {
      'Nipl-User-Key': this.secretKey,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(
      this.api_ecommerce_url + 'cancelOrder',
      encUser,
      requestOptions
    );
  }

  orderTracking(data: any)
  {
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
       orderId: data,
     };


     const encUser: string = this.loginEncryptWithPublicKey(data_to_send);
     const headerDict = {
       'Nipl-User-Key': this.secretKey,
     };

     const requestOptions = {
       headers: new HttpHeaders(headerDict),
     };
     return this.http.post(
       this.api_ecommerce_url + 'trackOrder',
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
      promocodeType: 'Shopping',
      amount: this.subTotalAmout,
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

  saveUserDetails(userData?:any){
    localStorage.setItem('user', JSON.stringify(userData));
  }
}
