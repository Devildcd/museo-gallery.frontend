import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala4Component } from './sala4.component';

describe('Sala4Component', () => {
  let component: Sala4Component;
  let fixture: ComponentFixture<Sala4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sala4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
