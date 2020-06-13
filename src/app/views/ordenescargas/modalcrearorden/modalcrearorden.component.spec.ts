import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcrearordenComponent } from './modalcrearorden.component';

describe('ModalcrearordenComponent', () => {
  let component: ModalcrearordenComponent;
  let fixture: ComponentFixture<ModalcrearordenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcrearordenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcrearordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
