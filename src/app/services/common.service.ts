import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  flag = 0;
  rupee_symbol: any;
  cartCount;

  /* Events */
  // cartChange: Subject<number> = new Subject<number>();
  private cartChange = new Subject<any>();
  private cartRemoveChange = new Subject<any>();

  constructor() {
    this.cartCount = 0;
    this.rupee_symbol = environment.rupee_symbol;
  }

  setCartCount(count: number, price: number, getcartdata?: any){
    this.cartChange.next({count: count, price: price, getcartdata});
  }

  getCartCount(): Observable<any>{
    return this.cartChange.asObservable();
  }

  setRemoveCartCount(){
    this.cartRemoveChange.next({count: 1});
  }
  
  getRemoveCartCount(): Observable<any>{
    return this.cartRemoveChange.asObservable();
  }

  getStorageKey(val: any){
    return localStorage.getItem(val);
  }

  getflag(){
    return this.flag;
  }
  
  incrflag(){
    this.flag += 1;
  }

  decrflag(){
    this.flag -= 1;
  }

  _window() : any {
    // return the global native browser window object
    return window;
 }

  get nativeWindow() : any {
    return this._window();
  }

}
