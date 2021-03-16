import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoPuntoComponent } from './documento-punto.component';

describe('DocumentoPuntoComponent', () => {
  let component: DocumentoPuntoComponent;
  let fixture: ComponentFixture<DocumentoPuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoPuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
