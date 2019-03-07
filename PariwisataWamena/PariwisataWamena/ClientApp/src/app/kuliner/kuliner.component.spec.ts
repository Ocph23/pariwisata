import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KulinerComponent } from './kuliner.component';

describe('KulinerComponent', () => {
  let component: KulinerComponent;
  let fixture: ComponentFixture<KulinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KulinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KulinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
