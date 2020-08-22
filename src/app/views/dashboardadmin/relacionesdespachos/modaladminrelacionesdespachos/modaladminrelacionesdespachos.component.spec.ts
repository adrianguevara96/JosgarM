import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladminrelacionesdespachosComponent } from './modaladminrelacionesdespachos.component';

describe('ModaladminrelacionesdespachosComponent', () => {
  let component: ModaladminrelacionesdespachosComponent;
  let fixture: ComponentFixture<ModaladminrelacionesdespachosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaladminrelacionesdespachosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaladminrelacionesdespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
