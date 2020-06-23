import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfrelaciondespachoComponent } from './pdfrelaciondespacho.component';

describe('PdfrelaciondespachoComponent', () => {
  let component: PdfrelaciondespachoComponent;
  let fixture: ComponentFixture<PdfrelaciondespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfrelaciondespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfrelaciondespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
