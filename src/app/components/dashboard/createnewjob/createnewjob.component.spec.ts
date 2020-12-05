import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewjobComponent } from './createnewjob.component';

describe('CreatenewjobComponent', () => {
  let component: CreatenewjobComponent;
  let fixture: ComponentFixture<CreatenewjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
