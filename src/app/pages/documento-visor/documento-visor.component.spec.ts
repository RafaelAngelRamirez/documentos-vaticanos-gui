import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoVisorComponent } from './documento-visor.component';

describe('DocumentoVisorComponent', () => {
  let component: DocumentoVisorComponent;
  let fixture: ComponentFixture<DocumentoVisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoVisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
