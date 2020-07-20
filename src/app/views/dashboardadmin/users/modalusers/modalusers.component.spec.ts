import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalusersComponent } from './modalusers.component';

describe('ModalusersComponent', () => {
  let component: ModalusersComponent;
  let fixture: ComponentFixture<ModalusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
