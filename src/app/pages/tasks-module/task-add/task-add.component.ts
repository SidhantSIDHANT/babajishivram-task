import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, PopoverOptions } from '@ionic/angular';
import { IonCard } from '@ionic/angular/standalone';
// import {MatDatepickerModule} from '@angular/material/datepicker';

import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionService } from 'src/app/session.service';
import { DropdownOption, ITask } from 'src/app/model/data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  standalone: false,
})
export class TaskAddComponent implements OnInit {
  form!: FormGroup;
  statusDropdown!: DropdownOption[];
  priorityDropdown!: DropdownOption[];
  submittedForm: boolean = false;
  isEditMode: boolean = false;
  id!: number;
  customPopoverOptions = {
    cssClass: 'my-custom-popover-class',
    alignment: 'start',
  };

  constructor(
    private sessionService: SessionService,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      due_date: new FormControl(null, [Validators.required]),
    });

    this.getDropdownList();
    this.paramsValueExist();
  }

  paramsValueExist(): void {
    this.isEditMode = false;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.sessionService.getTaskById<ITask>(null, 'task/' + id).subscribe({
      next: (response: ITask) => {
        this.id = response.id;
        this.form.patchValue(response);
        this.form.get('status')?.setValue(response.status_id)
        this.form.get('priority')?.setValue(response.priority_id)
        this.isEditMode = true;
      },
      error: () => {
        console.error('Error');
      },
    });
  }
  getDropdownList(): void {
    this.sessionService
      .getDropdown<DropdownOption[]>(null, 'status')
      .subscribe(
        {
          next: (response: DropdownOption[]) => (this.statusDropdown = response),
          error: () => {console.error('Error');}
        }
      );
    this.sessionService
      .getDropdown<DropdownOption[]>(null, 'priority')
      .subscribe(
         {
          next:  (response: DropdownOption[]) => (this.priorityDropdown = response),
          error: () => {console.error('Error');}
        }
      );
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();

    setTimeout(async () => {
      await alert.dismiss();
    }, 3000);
  }

  add(isEdit?: number): void {
    if (this.form.invalid) this.submittedForm = true;

    if (this.form.valid) {
      const formValue = this.form.value;
      const priorityObj = this.priorityDropdown.find(list => list.value == formValue.priority);
      const statusObj = this.statusDropdown.find(list => list.value == formValue.status);
      let requestPayload = {
        ...formValue,
        priority_id: priorityObj?.value,
        priority: priorityObj?.name,
        status_id: statusObj?.value,
        status: statusObj?.name,
      };      

      if (isEdit !== 2) {
        this.sessionService
          .add(requestPayload, 'task')
          .subscribe({
            next: (response) => {
            this.presentAlert('Message', 'Data is added sussfully');
          }, 
          error: () => {}
          });
      } else {
        this.sessionService
          .update(requestPayload, 'task/'+ this.id)
          .subscribe({
            next: (response) => {
            this.presentAlert('Message', 'Data is added sussfully');
          },
          error: () => {}
          });
      }
      this.form.reset();
    }
  }

  validationControl(name: string) {
    return (
      (this.form.controls[name].invalid && this.form.controls[name].touched) ||
      (this.form.controls[name].invalid && this.submittedForm)
    );
  }
}

