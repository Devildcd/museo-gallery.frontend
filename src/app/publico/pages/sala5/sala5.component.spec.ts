import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sala5Component } from './sala5.component';

describe('Sala5Component', () => {
  let component: Sala5Component;
  let fixture: ComponentFixture<Sala5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sala5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sala5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
