import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Program } from '../model/program.model';
import { map, Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionTable, ComponentPage, ComponentTable } from '../model/uiSpec.model';

@Component({
  selector: 'app-add-ui-spec-page',
  templateUrl: './add-ui-spec-page.component.html',
  styleUrls: ['./add-ui-spec-page.component.scss']
})
export class AddUiSpecPageComponent implements OnInit {
  isSubmitted: boolean = false;
  program!: Program;
  pages: ComponentPage[] = [];
  text: string = "";
  isUpload: boolean = false;
  // uploadedFile!: File;

  clonedComponents: { [s: string]: ComponentTable; } = {};
  clonedActions: { [s: string]: ActionTable; } = {};

  state$!: Observable<object>;

  title: string = '';

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

    console.log(this.program);

    this.addPage();
  }

  goToServiceSpec(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isSubmitted = true;

        let uiComponent: any = {
          title: this.title,
          componentPage: this.pages
        };

        this.router.navigate(['../service'], { relativeTo: this.activatedRoute, state: { program: this.program, uiComponent: uiComponent } });
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

  onUpload(event: any, index: number): void {
    this.isUpload = true;
    // console.log("onUpload :", event.files[0]);

    this.pages[index].image = event.files[0];

    // const formData: FormData = new FormData();
    // formData.append("file", event.files[0]);
    // formData.append("description", "abc");
    
    // this.uploadedFile = event.files[0];
    // this.programSpecService.uploadFile(formData).subscribe(
      //   () => { this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' }) },
      //   () => { this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' }) },
      //   () => { console.log('Success :', this.uploadedFile) }
      // );

    this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' });
  }

  addPage(): void {
    let componentPage = new ComponentPage();
    componentPage.id = (this.pages.length + 1).toString();
    componentPage.componentTable = [];
    componentPage.actionTable = [];

    this.pages.push(componentPage);
  }

  addComponentRow(index: number, component: ComponentTable = new ComponentTable): void {
    component.id = (this.pages[index].componentTable?.length! + 1).toString();
    this.pages[index].componentTable?.push(component);
  }

  addActionRow(index: number, action: ActionTable = new ActionTable): void {
    action.id = (this.pages[index].actionTable?.length! + 1).toString();
    this.pages[index].actionTable?.push(action);
  }

  onComponentRowEditInit(component: ComponentTable): void {
    this.clonedComponents[component.id!] = {...component};
  }

  onComponentRowEditSave(component: ComponentTable): void {
    delete this.clonedComponents[component.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onComponentRowEditCancel(component: ComponentTable, index: number): void {
    this.pages[index].componentTable?.splice(index, 1, this.clonedComponents[component.id!]);
    delete this.clonedComponents[component.id!];
    this.pages[index].componentTable = this.pages[index].componentTable?.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }

  onActionRowEditInit(action: ActionTable): void {
    this.clonedActions[action.id!] = {...action};
  }

  onActionRowEditSave(action: ActionTable): void {
    delete this.clonedActions[action.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onActionRowEditCancel(action: ActionTable, index: number): void {
    this.pages[index].actionTable?.splice(index, 1, this.clonedActions[action.id!]);
    delete this.clonedActions[action.id!];
    this.pages[index].actionTable = this.pages[index].actionTable?.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
}
