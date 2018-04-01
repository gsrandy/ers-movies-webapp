import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRentModalComponent } from './movie-rent-modal.component';

describe('MovieRentModalComponent', () => {
  let component: MovieRentModalComponent;
  let fixture: ComponentFixture<MovieRentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
