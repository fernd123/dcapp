import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDateComponent } from './customer-date.component';

describe('CustomerDateComponent', () => {
  let component: CustomerDateComponent;
  let fixture: ComponentFixture<CustomerDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
