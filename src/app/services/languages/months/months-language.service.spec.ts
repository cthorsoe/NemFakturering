import { TestBed, inject } from '@angular/core/testing';

import { MonthsLanguageService } from './months-language.service';

describe('MonthsLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthsLanguageService]
    });
  });

  it('should be created', inject([MonthsLanguageService], (service: MonthsLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
