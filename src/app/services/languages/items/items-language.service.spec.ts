import { TestBed, inject } from '@angular/core/testing';

import { ItemsLanguageService } from './items-language.service';

describe('ItemsLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsLanguageService]
    });
  });

  it('should be created', inject([ItemsLanguageService], (service: ItemsLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
