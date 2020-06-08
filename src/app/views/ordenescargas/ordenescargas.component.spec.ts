import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenescargasComponent } from './ordenescargas.component';

describe('OrdenescargasComponent', () => {
  let component: OrdenescargasComponent;
  let fixture: ComponentFixture<OrdenescargasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenescargasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenescargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
