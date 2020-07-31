import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalguiascargasComponent } from './modalguiascargas.component';

describe('ModalguiascargasComponent', () => {
  let component: ModalguiascargasComponent;
  let fixture: ComponentFixture<ModalguiascargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalguiascargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalguiascargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
