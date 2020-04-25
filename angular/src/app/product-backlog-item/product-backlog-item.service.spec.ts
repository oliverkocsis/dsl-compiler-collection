import { TestBed } from '@angular/core/testing';

import { ProductBacklogItemService } from './product-backlog-item.service';

describe('ProductBacklogItemService', () => {
  let service: ProductBacklogItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBacklogItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
