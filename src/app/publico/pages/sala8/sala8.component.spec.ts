import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala8Component } from './sala8.component';

describe('Sala8Component', () => {
  let component: Sala8Component;
  let fixture: ComponentFixture<Sala8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sala8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
