import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoticiasComponent } from './list-noticias.component';

describe('ListNoticiasComponent', () => {
  let component: ListNoticiasComponent;
  let fixture: ComponentFixture<ListNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoticiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
