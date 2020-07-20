import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesrecolectasComponent } from './solicitudesrecolectas.component';

describe('SolicitudesrecolectasComponent', () => {
  let component: SolicitudesrecolectasComponent;
  let fixture: ComponentFixture<SolicitudesrecolectasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesrecolectasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesrecolectasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
