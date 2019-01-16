import { TestBed, inject } from '@angular/core/testing';

import { SubscribeLanguageService } from './subscribe-language.service';

describe('SubscribeLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscribeLanguageService]
    });
  });

  it('should be created', inject([SubscribeLanguageService], (service: SubscribeLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
