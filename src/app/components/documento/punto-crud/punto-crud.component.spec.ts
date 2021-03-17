import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoCrudComponent } from './punto-crud.component';

describe('PuntoCrudComponent', () => {
  let component: PuntoCrudComponent;
  let fixture: ComponentFixture<PuntoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
