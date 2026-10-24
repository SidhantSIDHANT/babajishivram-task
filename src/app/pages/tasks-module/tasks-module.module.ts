import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksModulePageRoutingModule } from './tasks-module-routing.module';

import { TasksModulePage } from './tasks-module.page';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { TaskTableComponent } from './task-table/task-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksModulePageRoutingModule, 
     MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  
  declarations: [TasksModulePage, DashboardSummaryComponent, TaskAddComponent, TaskTableComponent]
})
export class TasksModulePageModule {}
