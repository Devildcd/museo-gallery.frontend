import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala7Component } from './sala7.component';

describe('Sala7Component', () => {
  let component: Sala7Component;
  let fixture: ComponentFixture<Sala7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sala7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
