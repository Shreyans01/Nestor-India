import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private userData: ApiServicesService) {}

  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('resp');
    localStorage.removeItem('rzp_device_id');
    localStorage.removeItem('userName');
    localStorage.removeItem('Wishlist');
    this.userData.getLocation();
    this.router.navigate(['/']);
    // window.localStorage.clear();
  }
}
