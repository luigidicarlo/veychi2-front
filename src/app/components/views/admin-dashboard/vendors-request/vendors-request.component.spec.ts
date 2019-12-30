import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsRequestComponent } from './vendors-request.component';

describe('VendorsRequestComponent', () => {
  let component: VendorsRequestComponent;
  let fixture: ComponentFixture<VendorsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
