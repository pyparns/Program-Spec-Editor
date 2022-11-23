import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-program-step',
  templateUrl: './add-program-step.component.html',
  styleUrls: ['./add-program-step.component.scss']
})
export class AddProgramStepComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Program',
        routerLink: 'program'
      },
      {
        label: 'Component',
        routerLink: 'component'
      },
      {
        label: 'Service',
        routerLink: 'service'
      }
    ];
  }

}
