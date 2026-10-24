import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksModulePage } from './tasks-module.page';

describe('TasksModulePage', () => {
  let component: TasksModulePage;
  let fixture: ComponentFixture<TasksModulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
