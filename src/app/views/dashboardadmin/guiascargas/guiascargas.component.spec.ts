import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiascargasComponent } from './guiascargas.component';

describe('GuiascargasComponent', () => {
  let component: GuiascargasComponent;
  let fixture: ComponentFixture<GuiascargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiascargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiascargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
