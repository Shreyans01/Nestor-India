import { TestBed } from '@angular/core/testing';

import { BootstrapServicesService } from './bootstrap-services.service';

describe('BootstrapServicesService', () => {
  let service: BootstrapServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootstrapServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
