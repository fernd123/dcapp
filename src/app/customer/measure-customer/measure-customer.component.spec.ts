import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureCustomerComponent } from './measure-customer.component';

describe('MeasureCustomerComponent', () => {
  let component: MeasureCustomerComponent;
  let fixture: ComponentFixture<MeasureCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasureCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
