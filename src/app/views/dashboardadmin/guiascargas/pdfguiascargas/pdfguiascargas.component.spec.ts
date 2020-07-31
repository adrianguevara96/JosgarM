import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfguiascargasComponent } from './pdfguiascargas.component';

describe('PdfguiascargasComponent', () => {
  let component: PdfguiascargasComponent;
  let fixture: ComponentFixture<PdfguiascargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfguiascargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfguiascargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
