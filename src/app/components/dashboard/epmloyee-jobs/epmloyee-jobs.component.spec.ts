import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpmloyeeJobsComponent } from './epmloyee-jobs.component';

describe('EpmloyeeJobsComponent', () => {
  let component: EpmloyeeJobsComponent;
  let fixture: ComponentFixture<EpmloyeeJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpmloyeeJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpmloyeeJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
