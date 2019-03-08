import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinasiComponent } from './admin-destinasi.component';

describe('AdminDestinasiComponent', () => {
  let component: AdminDestinasiComponent;
  let fixture: ComponentFixture<AdminDestinasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDestinasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDestinasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
