import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsolicitudrecolectaComponent } from './modalsolicitudrecolecta.component';

describe('ModalsolicitudrecolectaComponent', () => {
  let component: ModalsolicitudrecolectaComponent;
  let fixture: ComponentFixture<ModalsolicitudrecolectaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsolicitudrecolectaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsolicitudrecolectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
