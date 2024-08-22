import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoSala10Component } from './contenido-sala10.component';

describe('ContenidoSala10Component', () => {
  let component: ContenidoSala10Component;
  let fixture: ComponentFixture<ContenidoSala10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoSala10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoSala10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
