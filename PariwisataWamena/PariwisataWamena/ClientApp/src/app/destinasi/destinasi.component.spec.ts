import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinasiComponent } from './destinasi.component';

describe('DestinasiComponent', () => {
  let component: DestinasiComponent;
  let fixture: ComponentFixture<DestinasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
