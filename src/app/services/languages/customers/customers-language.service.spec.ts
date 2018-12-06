import { TestBed, inject } from '@angular/core/testing';

import { CustomersLanguageService } from './customers-language.service';

describe('CustomersLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersLanguageService]
    });
  });

  it('should be created', inject([CustomersLanguageService], (service: CustomersLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
