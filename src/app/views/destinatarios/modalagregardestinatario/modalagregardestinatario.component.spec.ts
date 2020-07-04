import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalagregardestinatarioComponent } from './modalagregardestinatario.component';

describe('ModalagregardestinatarioComponent', () => {
  let component: ModalagregardestinatarioComponent;
  let fixture: ComponentFixture<ModalagregardestinatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalagregardestinatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalagregardestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
