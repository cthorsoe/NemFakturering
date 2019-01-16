import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionLanguageService } from './subscription-language.service';

describe('SubscriptionLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionLanguageService]
    });
  });

  it('should be created', inject([SubscriptionLanguageService], (service: SubscriptionLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
