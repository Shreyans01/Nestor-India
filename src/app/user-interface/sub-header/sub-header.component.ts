import { Renderer2 } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css'],
})
export class SubHeaderComponent implements OnInit, AfterViewInit {
  Carousal = [
    {
      name: 'Mobile',
      route: '/',
      icon: 'fas fa-mobile-alt',
    },
    {
      name: 'DTH',
      route: '/rechargeBillDth',
      icon: 'fas fa-tv',
    },
    {
      name: 'Broadband',
      route: '/rechargeBillBroadband',
      icon: 'fas fa-wifi',
    },
    {
      name: 'Landline',
      route: '/rechargeBillLandline',
      icon: 'fas fa-phone',
    },
    {
      name: 'CableTv',
      route: '/rechargeBillCabletv',
      icon: 'fas fa-plug',
    },
    {
      name: 'Electricity',
      route: '/rechargeBillElectricity',
      icon: 'fas fa-lightbulb',
    },
    {
      name: 'Gas',
      route: '/rechargeBillGas',
      icon: 'fas fa-flask',
    },
    {
      name: 'Water',
      route: '/rechargeBillWater',
      icon: 'fas fa-tint',
    },
    {
      name: 'Health Insurance',
      route: '/healthInsurance',
      icon: 'fas fa-heartbeat',
    },
    {
      name: 'Insurance',
      route: '/insurance',
      icon: 'fas fa-users',
    },
    {
      name: 'Life Insurance',
      route: '/lifeInsurance',
      icon: 'fas fa-umbrella',
    },
    {
      name: 'LPG GAS',
      route: '/lpgGas',
      icon: 'fas fa-burn',
    },
    {
      name: ' Municipal Taxes',
      route: '/municipalTaxes',
      icon: 'fas fa-building',
    },
    {
      name: 'Loan Repayment',
      route: '/loanRepayment',
      icon: 'fas fa-landmark',
    },
    {
      name: 'Fastag',
      route: '/fastag',
      icon: 'fas fa-landmark',
    },
  ];
  constructor(private rendrer: Renderer2, public router: Router) { }
  ngAfterViewInit(): void {
    const carousal = localStorage.getItem('dataSource');
    const array = JSON.parse(`${carousal}`);
    const index = this.Carousal.findIndex((e) => e?.route === array[0]?.route);
    const ele = this.Carousal.splice(index, 1);
    this.Carousal.splice(0, 0, ...ele);

  }

  ngOnInit(): void {
    // const script = document.createElement('script');
    // script.src = 'assets/nirmalshreeUserInterface/js/theme.js';
    // document.body.appendChild(script);
  }

  /* appendScript(){
    this.rendrer.createScript
  }   */

  clickCarousal(nav: any) {
    const index = this.Carousal.findIndex((e) => e?.route === nav);
    const ele = this.Carousal.splice(index, 1);

    this.Carousal.splice(0, 0, ...ele);
    localStorage.setItem('dataSource', JSON.stringify(this.Carousal));

  }
}
