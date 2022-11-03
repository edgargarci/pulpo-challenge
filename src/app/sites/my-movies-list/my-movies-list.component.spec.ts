import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoviesListComponent } from './my-movies-list.component';

describe('MyMoviesListComponent', () => {
  let component: MyMoviesListComponent;
  let fixture: ComponentFixture<MyMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMoviesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
