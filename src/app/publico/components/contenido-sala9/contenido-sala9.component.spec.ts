import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoSala9Component } from './contenido-sala9.component';

describe('ContenidoSala9Component', () => {
  let component: ContenidoSala9Component;
  let fixture: ComponentFixture<ContenidoSala9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoSala9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoSala9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
