import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksModulePage } from './tasks-module.page';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { TaskAddComponent } from './task-add/task-add.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardSummaryComponent
  },
   {
    path: 'table',
    component: TaskTableComponent
  },
  {
    path: 'new',
    component: TaskAddComponent
  },
  {
    path: ':id/new',
    component: TaskAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksModulePageRoutingModule {}
