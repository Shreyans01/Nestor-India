import { ApiServicesService } from './../../services/api-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-e-commerce-footer',
  templateUrl: './e-commerce-footer.component.html',
  styleUrls: ['./e-commerce-footer.component.css'],
})
export class ECommerceFooterComponent implements OnInit {
  result: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  result6: any = '';
  has_best_seller: boolean;

  constructor(private userData: ApiServicesService) {
    this.has_best_seller = false;
  }

  ngOnInit(): void {
    this.bestSellerProduct();
  }

  bestSellerProduct() {
    this.userData.bestSellerProduct().subscribe(
      (response) => {
        this.result6 = 'Data not found';
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result5 = a.data.bestSeller;
              if (Object.keys(this.result5).length == 0) {
                this.has_best_seller = false;
              } else {
                this.has_best_seller = true;
              }
            } else {
              this.result6 = a.message;
            }
          } else {
            this.result6 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result6 = b.message;
        }
      }
    );
  }
}
