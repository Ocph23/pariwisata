import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKulinerComponent } from './admin-kuliner.component';

describe('AdminKulinerComponent', () => {
  let component: AdminKulinerComponent;
  let fixture: ComponentFixture<AdminKulinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKulinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKulinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
