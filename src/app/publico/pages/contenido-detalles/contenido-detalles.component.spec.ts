import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoDetallesComponent } from './contenido-detalles.component';

describe('ContenidoDetallesComponent', () => {
  let component: ContenidoDetallesComponent;
  let fixture: ComponentFixture<ContenidoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
