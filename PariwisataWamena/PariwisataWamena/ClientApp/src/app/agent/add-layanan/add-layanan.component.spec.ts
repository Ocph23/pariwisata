import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLayananComponent } from './add-layanan.component';

describe('AddLayananComponent', () => {
  let component: AddLayananComponent;
  let fixture: ComponentFixture<AddLayananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLayananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
