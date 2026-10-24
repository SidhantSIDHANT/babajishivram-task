import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/model/data.model';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.scss'],
  standalone: false
})
export class DashboardSummaryComponent  implements OnInit {
  dashboardDetails: {name: string, count: number, text: string, class?: string}[] = [
    {
      name: 'Total tasks',
      count: 0,
      text: 'across all statuses',
      class: 'dark'
    },
    {
      name: 'Completed',
      count: 0,
      text: 'Completed all tasks',
      class: 'success'
    },
    {
      name: 'In progres',
      count: 0,
      text: 'being worked on',
      class: 'warning'
    },
    {
      name: 'Overdue',
      count: 0,
      text: 'past due, not completed',
      class:'danger'
    }
  ]

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getTaskList();
  }

    getTaskList(): void {
      this.sessionService
        .list<ITask[]>(null, 'task')
        .subscribe((response: ITask[]) => {
          const totalTask = response.length;
          const completedTask = response.filter(item => item.status_id === 1).length;
          const inProgress = response.filter(item => item.status_id === 0).length;
          const overdue = response.filter(item =>{
            // console.log(formatDate(item.due_date, 'dd-MM-yyyy', 'en-US'));
            // console.log(formatDate(new Date(), 'dd-MM-yyyy', 'en-US'));
            return  formatDate(item.due_date, 'dd-MM-yyyy', 'en-US') < formatDate(new Date(), 'dd-MM-yyyy', 'en-US')
            }).length;
          
            this.dashboardDetails[0].count = totalTask;
            this.dashboardDetails[1].count = completedTask;
            this.dashboardDetails[2].count = inProgress;
            this.dashboardDetails[3].count = overdue;

        });
    }
}
