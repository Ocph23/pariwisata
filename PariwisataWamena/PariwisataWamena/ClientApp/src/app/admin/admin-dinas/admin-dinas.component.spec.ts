import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDinasComponent } from './admin-dinas.component';

describe('AdminDinasComponent', () => {
  let component: AdminDinasComponent;
  let fixture: ComponentFixture<AdminDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
