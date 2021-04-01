import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeejoblistComponent } from './employeejoblist.component';

describe('EmployeejoblistComponent', () => {
  let component: EmployeejoblistComponent;
  let fixture: ComponentFixture<EmployeejoblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeejoblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeejoblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
