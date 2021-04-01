import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadimsComponent } from './subadims.component';

describe('SubadimsComponent', () => {
  let component: SubadimsComponent;
  let fixture: ComponentFixture<SubadimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
