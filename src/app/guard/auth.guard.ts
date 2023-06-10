import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userData: ApiServicesService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return true;
    let data = this.userData.isLogin();
    if (data == true) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}
