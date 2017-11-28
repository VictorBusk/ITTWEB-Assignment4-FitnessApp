import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesDialogComponent } from './exercises-dialog.component';

describe('ExercisesDialogComponent', () => {
  let component: ExercisesDialogComponent;
  let fixture: ComponentFixture<ExercisesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
