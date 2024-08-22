import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosEventoComponent } from './videos-evento.component';

describe('VideosEventoComponent', () => {
  let component: VideosEventoComponent;
  let fixture: ComponentFixture<VideosEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
