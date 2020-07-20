import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionesdespachosComponent } from './relacionesdespachos.component';

describe('RelacionesdespachosComponent', () => {
  let component: RelacionesdespachosComponent;
  let fixture: ComponentFixture<RelacionesdespachosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionesdespachosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionesdespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
