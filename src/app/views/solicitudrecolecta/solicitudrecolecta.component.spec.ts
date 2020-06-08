import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudrecolectaComponent } from './solicitudrecolecta.component';

describe('SolicitudrecolectaComponent', () => {
  let component: SolicitudrecolectaComponent;
  let fixture: ComponentFixture<SolicitudrecolectaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudrecolectaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudrecolectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
