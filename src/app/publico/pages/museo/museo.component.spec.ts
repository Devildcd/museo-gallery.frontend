import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseoComponent } from './museo.component';

describe('MuseoComponent', () => {
  let component: MuseoComponent;
  let fixture: ComponentFixture<MuseoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
