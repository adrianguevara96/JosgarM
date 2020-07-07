import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasbasicasComponent } from './tablasbasicas.component';

describe('TablasbasicasComponent', () => {
  let component: TablasbasicasComponent;
  let fixture: ComponentFixture<TablasbasicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablasbasicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasbasicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
