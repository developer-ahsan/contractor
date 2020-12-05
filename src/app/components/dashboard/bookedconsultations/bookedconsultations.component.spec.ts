import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedconsultationsComponent } from './bookedconsultations.component';

describe('BookedconsultationsComponent', () => {
  let component: BookedconsultationsComponent;
  let fixture: ComponentFixture<BookedconsultationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedconsultationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedconsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
