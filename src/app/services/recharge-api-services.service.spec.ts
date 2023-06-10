import { TestBed } from '@angular/core/testing';

import { RechargeApiServicesService } from './recharge-api-services.service';

describe('RechargeApiServicesService', () => {
  let service: RechargeApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargeApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
