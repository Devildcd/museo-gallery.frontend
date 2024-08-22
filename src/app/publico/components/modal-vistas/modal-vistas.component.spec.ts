import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVistasComponent } from './modal-vistas.component';

describe('ModalVistasComponent', () => {
  let component: ModalVistasComponent;
  let fixture: ComponentFixture<ModalVistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
