import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSaleComponent } from './device-sale.component';

describe('DeviceSaleComponent', () => {
  let component: DeviceSaleComponent;
  let fixture: ComponentFixture<DeviceSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
