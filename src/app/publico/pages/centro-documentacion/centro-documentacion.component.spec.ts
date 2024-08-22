import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDocumentacionComponent } from './centro-documentacion.component';

describe('CentroDocumentacionComponent', () => {
  let component: CentroDocumentacionComponent;
  let fixture: ComponentFixture<CentroDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroDocumentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
