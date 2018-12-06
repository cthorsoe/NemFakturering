import { TestBed, inject } from '@angular/core/testing';

import { TheProductLanguageService } from './the-product-language.service';

describe('TheProductLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TheProductLanguageService]
    });
  });

  it('should be created', inject([TheProductLanguageService], (service: TheProductLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
