import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownOption, ITask } from 'src/app/model/data.model';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  standalone: false,
})
export class TaskTableComponent implements OnInit {
  form!: FormGroup;
  statusDropdown!: DropdownOption[];
  priorityDropdown!: DropdownOption[];
  submittedForm: boolean = false;
  task_list: ITask[] = [];
  customPopoverOptions = {
    cssClass: 'my-custom-popover-class',
    alignment: 'start',
  };

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ionViewWillEnter(): void {
    this.form.patchValue({
      status: -2,
      priority: -2,
    });

    this.getDropdownList();
    this.getTaskList();
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(""),
      status: new FormControl(null),
      priority: new FormControl(null),
    }); 
  }

  filter_list: ITask[] = []
  getTaskList(): void {
    this.sessionService
      .list<ITask[]>(null, 'task')
      .subscribe({
        next: (response: ITask[]) => {
        this.task_list = [...response];
        this.filter_list = [...response]
      },
      error: () => {}
      });
  }

 
  getDropdownList(): void {
    this.sessionService
      .getDropdown<DropdownOption[]>(null, 'status')
      .subscribe(
        {
          next:  (response: DropdownOption[]) =>
          (this.statusDropdown = [
            { id: -1, name: 'All Statuses', value: -2 },
            ...response,
          ]),
          error: () => {}
        }
      );

    this.sessionService
      .getDropdown<DropdownOption[]>(null, 'priority')
      .subscribe({
        next: (response: DropdownOption[]) =>
          (this.priorityDropdown = [
            { id: -1, name: 'All Priorities', value: -2 },
            ...response,
          ]),
        error: () => {},
      });
  }

  filter(): void {
    const status = this.form.controls['status'].value
    const title = this.form.controls['title'].value
    const priority = this.form.controls['priority'].value
     this.task_list = this.filter_list.filter(item => {
      if( status != null && priority != null) {
        if(title.length > 0 && status == -2 || priority == -2) {
           return item.title.trim().toLowerCase().includes(title.trim().toLowerCase()) 
        } else {
           return item.status_id == status
           && item.priority_id == priority && item.title.trim().toLowerCase().includes(title.trim().toLowerCase())
        }
      }  else {
        return this.filter_list;
      }
     })
  }

  edit = (element: ITask) =>  this.router.navigate(['tasks/'+element.id+'/new'])
  
  onDelete(id: number): void {
    this.sessionService.delete(null, 'task/'+ id).subscribe({
      next: (response) =>  this.getTaskList(),
      error: () => {}
    })
  }

  validateAndFormatDate(date: string, flag?: number): any{
   const formattedDate  = formatDate(date, 'dd-MM-yyyy', 'en-US');
    if(flag === 1) {
      return formattedDate> formatDate(new Date(), 'dd-MM-yyyy', 'en-US')
    } 

    return formattedDate;
  }
}
