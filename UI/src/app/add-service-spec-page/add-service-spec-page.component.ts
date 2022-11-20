import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Program } from '../model/program.model';
import { map, Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailServiceTable, ServiceComponent, ServiceTable } from '../model/serviceSpec.model';

@Component({
  selector: 'app-add-service-spec-page',
  templateUrl: './add-service-spec-page.component.html',
  styleUrls: ['./add-service-spec-page.component.scss']
})
export class AddServiceSpecPageComponent implements OnInit {
  program!: Program;
  uiComponent: any;
  serviceComponent!: ServiceComponent;

  isSubmitted: boolean = false;
  isUpload: boolean = false;

  clonedServices: { [s: string]: ServiceTable; } = {};
  clonedDetailService: { [s: string]: DetailServiceTable; } = {};

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
    this.uiComponent = window.history.state.uiComponent;

    let sc = new ServiceComponent();
    sc.services = [];
    this.serviceComponent = sc;
  }

  createProgram(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isSubmitted = true;

        console.log(this.program);
        console.log(this.uiComponent);
        console.log(this.serviceComponent);

        this.program.uiComponent = this.uiComponent;
        this.program.serviceComponent = this.serviceComponent;

        this.programSpecService.createProgramSpec(this.program).subscribe(
          () => {
            this.messageService.add({key: 'tl', severity: 'success', summary: 'Program created', detail: ''});
            this.router.navigate(['home']);
          }, () => {
            this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to create', detail: 'please wait and try again'});
          }, () => {
            this.isSubmitted = false;
          }
        );

        this.router.navigate(['home']);
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

  onUpload(event: any, type: string): void {
    this.isUpload = true;
    // console.log("onUpload :", event.files[0]);

    const formData: FormData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("description", "service");

    if (type === 'er') this.serviceComponent.erDiagram = event.files[0].name;
    else if (type === 'class') this.serviceComponent.classDiagram = event.files[0].name;

    this.programSpecService.uploadFile(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' });
      },
      (err: any) => {
        console.log(err);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
      },
      () => {  }
    );

    // this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' })
  }

  addServiceRow(service: ServiceTable = new ServiceTable()): void {
    service.id = (this.serviceComponent.services!.length + 1).toString();
    service.detail = new DetailServiceTable();

    this.serviceComponent.services!.push(service);

    console.log(this.serviceComponent);
  }

  onServiceRowEditInit(service: any): void {
    this.clonedServices[service.id!] = {...service};
  }

  onServiceRowEditSave(service: any): void {
    delete this.clonedServices[service.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onServiceRowEditCancel(service: any, index: number): void {
    this.serviceComponent.services!.splice(index, 1, this.clonedServices[service.id!]);
    delete this.clonedServices[service.id!];
    this.serviceComponent.services! = this.serviceComponent.services!.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }

  onDetailServiceRowEditInit(service: any): void {
    this.clonedServices[service.id!] = {...service};
  }

  onDetailServiceRowEditSave(service: any): void {
    delete this.clonedServices[service.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onDetailServiceRowEditCancel(service: any, index: number): void {
    this.serviceComponent.services!.splice(index, 1, this.clonedServices[service.id!]);
    delete this.clonedServices[service.id!];
    this.serviceComponent.services! = this.serviceComponent.services!.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
}
