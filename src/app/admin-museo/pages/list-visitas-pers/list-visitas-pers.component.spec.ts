import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitasPersComponent } from './list-visitas-pers.component';

describe('ListVisitasPersComponent', () => {
  let component: ListVisitasPersComponent;
  let fixture: ComponentFixture<ListVisitasPersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVisitasPersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVisitasPersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
