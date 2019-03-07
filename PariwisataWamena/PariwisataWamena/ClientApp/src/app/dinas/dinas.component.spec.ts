import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinasComponent } from './dinas.component';

describe('DinasComponent', () => {
  let component: DinasComponent;
  let fixture: ComponentFixture<DinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
