import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMuestraMesComponent } from './list-muestra-mes.component';

describe('ListMuestraMesComponent', () => {
  let component: ListMuestraMesComponent;
  let fixture: ComponentFixture<ListMuestraMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMuestraMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMuestraMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
