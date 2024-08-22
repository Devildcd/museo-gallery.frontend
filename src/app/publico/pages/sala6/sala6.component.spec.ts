import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala6Component } from './sala6.component';

describe('Sala6Component', () => {
  let component: Sala6Component;
  let fixture: ComponentFixture<Sala6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sala6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
