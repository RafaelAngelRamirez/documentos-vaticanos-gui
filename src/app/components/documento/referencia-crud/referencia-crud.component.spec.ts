import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaCrudComponent } from './referencia-crud.component';

describe('ReferenciaCrudComponent', () => {
  let component: ReferenciaCrudComponent;
  let fixture: ComponentFixture<ReferenciaCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
