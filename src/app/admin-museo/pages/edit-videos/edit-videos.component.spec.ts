import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideosComponent } from './edit-videos.component';

describe('EditVideosComponent', () => {
  let component: EditVideosComponent;
  let fixture: ComponentFixture<EditVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
