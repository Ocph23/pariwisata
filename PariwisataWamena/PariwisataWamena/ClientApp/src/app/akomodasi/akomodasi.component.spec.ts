import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkomodasiComponent } from './akomodasi.component';

describe('AkomodasiComponent', () => {
  let component: AkomodasiComponent;
  let fixture: ComponentFixture<AkomodasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkomodasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkomodasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
