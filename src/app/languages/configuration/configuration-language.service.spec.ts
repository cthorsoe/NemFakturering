import { TestBed, inject } from '@angular/core/testing';

import { ConfigurationLanguageService } from './configuration-language.service';

describe('ConfigurationLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationLanguageService]
    });
  });

  it('should be created', inject([ConfigurationLanguageService], (service: ConfigurationLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
