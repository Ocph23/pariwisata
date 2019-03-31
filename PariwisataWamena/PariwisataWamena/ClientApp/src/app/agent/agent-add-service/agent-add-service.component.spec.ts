import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAddServiceComponent } from './agent-add-service.component';

describe('AgentAddServiceComponent', () => {
  let component: AgentAddServiceComponent;
  let fixture: ComponentFixture<AgentAddServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentAddServiceComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
