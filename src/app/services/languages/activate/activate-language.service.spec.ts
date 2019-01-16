import { TestBed, inject } from '@angular/core/testing';

import { ActivateLanguageService } from './activate-language.service';

describe('ActivateLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateLanguageService]
    });
  });

  it('should be created', inject([ActivateLanguageService], (service: ActivateLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
