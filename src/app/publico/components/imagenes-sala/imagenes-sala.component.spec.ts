import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesSalaComponent } from './imagenes-sala.component';

describe('ImagenesSalaComponent', () => {
  let component: ImagenesSalaComponent;
  let fixture: ComponentFixture<ImagenesSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenesSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
