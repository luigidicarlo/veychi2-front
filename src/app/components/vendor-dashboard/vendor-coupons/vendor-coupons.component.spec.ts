import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCouponsComponent } from './vendor-coupons.component';

describe('VendorCouponsComponent', () => {
  let component: VendorCouponsComponent;
  let fixture: ComponentFixture<VendorCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
