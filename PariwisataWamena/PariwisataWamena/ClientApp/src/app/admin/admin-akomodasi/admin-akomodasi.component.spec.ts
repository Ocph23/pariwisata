import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAkomodasiComponent } from './admin-akomodasi.component';

describe('AdminAkomodasiComponent', () => {
  let component: AdminAkomodasiComponent;
  let fixture: ComponentFixture<AdminAkomodasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAkomodasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAkomodasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
