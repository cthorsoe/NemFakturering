import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheProductComponent } from './the-product.component';

describe('TheProductComponent', () => {
  let component: TheProductComponent;
  let fixture: ComponentFixture<TheProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
