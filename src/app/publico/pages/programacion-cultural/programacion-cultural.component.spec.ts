import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionCulturalComponent } from './programacion-cultural.component';

describe('ProgramacionCulturalComponent', () => {
  let component: ProgramacionCulturalComponent;
  let fixture: ComponentFixture<ProgramacionCulturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionCulturalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramacionCulturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
