import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStatsComponent } from './vendor-stats.component';

describe('VendorStatsComponent', () => {
  let component: VendorStatsComponent;
  let fixture: ComponentFixture<VendorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
