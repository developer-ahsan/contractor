import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfviewersComponent } from './pdfviewers.component';

describe('PdfviewersComponent', () => {
  let component: PdfviewersComponent;
  let fixture: ComponentFixture<PdfviewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfviewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
