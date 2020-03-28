import { TestBed } from '@angular/core/testing';

import { ShippingInformationService } from './shipping-information.service';

describe('ShippingInformationService', () => {
  let service: ShippingInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
