import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  login = false;
  isLoading = false;
  CarousalHeader1 = [
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
    }
  ];
  CarousalHeader2 = [
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
    }
  ];

  constructor(
    private rendrer: Renderer2,
    private userData: ApiServicesService,
    private cdr:ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.appendScript();
    this.cdr.detectChanges()
  }

  ngOnInit(): void {
    this.timeout();
    this.userData.getLocation();
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  appendScript() {

    const script = this.rendrer.createElement('script');
    script.src = 'assets/nirmalshreeUserInterface/js/theme.js';
    document.body.appendChild(script);

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  clickCarousal1(nav1: any) {
    const index = this.CarousalHeader1.findIndex((e: any) => e?.route === nav1);
    const ele = this.CarousalHeader1.splice(index, 1);
    this.CarousalHeader1.splice(0, 0, ...ele);
    localStorage.setItem('dataSource', JSON.stringify(this.CarousalHeader1));
  }

  clickCarousal2(nav2: any) {
    const index = this.CarousalHeader2.findIndex((e: any) => e?.route === nav2);
    const ele = this.CarousalHeader2.splice(index, 1);
    this.CarousalHeader2.splice(0, 0, ...ele);
    localStorage.setItem('dataSource', JSON.stringify(this.CarousalHeader2));
  }
}
