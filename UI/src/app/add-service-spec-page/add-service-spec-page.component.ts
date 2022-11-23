import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Program } from '../model/program.model';
import { map, Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailServiceTable, ServiceComponent, ServiceTable } from '../model/serviceSpec.model';
import { UiComponent } from '../model/uiSpec.model';

@Component({
  selector: 'app-add-service-spec-page',
  templateUrl: './add-service-spec-page.component.html',
  styleUrls: ['./add-service-spec-page.component.scss']
})
export class AddServiceSpecPageComponent implements OnInit {
  program!: Program;
  componentSpec!: UiComponent;
  serviceSpec!: ServiceComponent;

  isSubmitted: boolean = false;

  state$!: Observable<object>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.program = window.history.state.program;
    this.componentSpec = window.history.state.uiComponent;
    
    let sc = new ServiceComponent();
    sc.services = [];
    this.serviceSpec = sc;
  }

  createProgram(serviceSpec: ServiceComponent): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isSubmitted = true;

        this.program.uiComponent = this.componentSpec;
        this.program.serviceComponent = serviceSpec;

        console.log(this.program);

        this.programSpecService.createProgramSpec(this.program).subscribe(
          () => {
            this.messageService.add({key: 'tl', severity: 'success', summary: 'Program created', detail: ''});
            this.router.navigate(['home']);
          }, () => {
            this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to create', detail: 'please wait and try again'});
          }, () => {
            this.isSubmitted = false;
            this.router.navigate(['home']);
          }
        );

      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({key: 'tl', severity:'error', summary:'Rejected', detail:'You have rejected'});
          break;
        }
      }
    });
  }
}
