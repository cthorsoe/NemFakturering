import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryLoginComponent } from './try-login.component';

describe('TryLoginComponent', () => {
  let component: TryLoginComponent;
  let fixture: ComponentFixture<TryLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
