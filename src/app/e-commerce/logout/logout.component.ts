import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  constructor(private router: Router, private userData: ApiServicesService) {}

  ngOnInit(): void {
    console.log("Removed User")
    localStorage.removeItem('user');
    localStorage.removeItem('resp');
    localStorage.removeItem('rzp_device_id');
    localStorage.removeItem('userName');
    localStorage.removeItem('Wishlist');
    this.userData.getLocation();
    this.router.navigate(['/home']);
    window.localStorage.clear();
   
  }
}
