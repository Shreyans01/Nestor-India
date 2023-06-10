import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootstrapServicesService {

  public popup: Subject<any> = new Subject<any>();
  
  constructor() { }
}
