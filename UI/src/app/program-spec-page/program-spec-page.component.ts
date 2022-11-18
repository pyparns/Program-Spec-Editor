import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProgramSpecService } from '../service/program-spec.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../../THSarabunNew-normal';
import { ProgramSpec } from '../model/programspec.model';
import { Program } from '../model/program.model';
import { SystemAnalystService } from '../service/system-analyst.service';
import { ProjectService } from '../service/project.service';
import { SystemService } from '../service/system.service';
import { Project } from '../model/project.model';
import { System } from '../model/system.model';
import { SystemAnalyst } from '../model/systemAnalyst.model';
import { ServiceComponent } from '../model/serviceSpec.model';
import { ActionTable, ComponentPage, ComponentTable, UiComponent } from '../model/uiSpec.model';

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];
  uploadedFiles: File[] = [];

  programSpec: ProgramSpec = new ProgramSpec();
  serviceComponent!: ServiceComponent;
  uiComponent!: UiComponent;
  projects!: Project[];
  systems!: System[];
  systemAnalysts!: SystemAnalyst[];
  
  programForm = new FormGroup({
    programId: new FormControl(''),
    programName: new FormControl(''),
    projectId: new FormControl(''),
    projectName: new FormControl(''),
    systemId: new FormControl(''),
    systemName: new FormControl(''),
    systemAnalystId: new FormControl(''),
    systemAnalystName: new FormControl(''),
    status: new FormControl(''),
    version: new FormControl(0),
  });

  id!: string | null;
  isEdit: boolean = false;
  canEdit: boolean = false;
  isVersion: boolean = true;
  isUploaded: boolean = false;
  isUpload: boolean = false;

  clonedComponents: { [s: string]: ComponentTable; } = {};
  clonedActions: { [s: string]: ActionTable; } = {};

  subscribeProgramSpec!: Subscription;
  subscribeProject!: Subscription;
  subscribeSystem!: Subscription;
  subscribeSystemAnalyst!: Subscription;

  constructor(
    private router: Router,
    private systemService: SystemService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
    private systemAnalystService: SystemAnalystService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.subscribeProgramSpec = this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.programSpec = response;
      console.log(response);
    });
    this.subscribeProject = this.projectService.getProjects().subscribe((response: Project[]) => {
      this.projects = response;
    });
    this.subscribeSystem = this.systemService.getSystems().subscribe((response: System[]) => {
      this.systems = response;
    });
    this.subscribeSystemAnalyst = this.systemAnalystService.getSystemAnalysts().subscribe((response: SystemAnalyst[]) => {
      this.systemAnalysts = response;
    });
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
    this.subscribeProject.unsubscribe();
    this.subscribeSystem.unsubscribe();
    this.subscribeSystemAnalyst.unsubscribe();
  }

  onSave(id: string | null): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let program = this.programForm.value as Program;
        program.uiComponent = this.uiComponent;
        program.serviceComponent = this.serviceComponent;
        this.subscribeProgramSpec = this.programSpecService.updateProgramSpec(id, program).subscribe(
          () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Program updated', detail: ''}),
          () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to update', detail: 'please wait and try again'}),
          () => this.isEdit = false
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

  onDelete(id: string | null): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this spec?',
      header: 'Delete confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscribeProgramSpec = this.programSpecService.deleteProgramSpec(id).subscribe(
          () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Program deleted', detail: ''}),
          () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to delete', detail: 'please wait and try again'}),
          () => this.router.navigate(['home'])
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

  onSelectVersion(version: number): void {
    this.isVersion = false;

    let result: any = {};

    if (version == this.programSpec.latest) this.canEdit = true;
    result = this.programSpec.programs?.filter(spec => spec.version === version)[0]!;

    let program = [result.programs?.filter((spec: any) => Number(spec.version) === result.latest)[0]!][0];
    Object.assign(result, program)
    delete result.programs;

    this.programForm.patchValue(result);
    this.uiComponent = result.uiComponent;
    this.serviceComponent = result.serviceComponent;

    let project: Project = this.projects.find(ele => ele.id === result.projectId)!;
    delete project.id;
    this.programForm.patchValue(project);
    Object.assign(result, project);

    let system: System = this.systems.find(ele => ele.id === result.systemId)!;
    delete system.id;
    this.programForm.patchValue(system);
    Object.assign(result, system);

    let systemAnalyst: SystemAnalyst = this.systemAnalysts.find(ele => ele.id === result.systemAnalystId)!;
    delete systemAnalyst.id;
    this.programForm.patchValue(systemAnalyst);
    Object.assign(result, systemAnalyst);

    console.log(this.uiComponent);
    console.log(this.serviceComponent);
  }

  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
  }

  // lenText(doc: jsPDF, text: string): any {
  //   return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  // }

  onPrint(): any {
    this.confirmationService.confirm({
      message: 'Do you want to print this spec?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({key: 'tl', severity:'info', summary:'Confirmed', detail:'You have accepted'});
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

    this.uiComponent.componentPage![index].image = event.files[0].name;

    const formData: FormData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("description", "ui");
    
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
  }

  onSavePdf(): void {
    
  }

  onChangeOption(e: any, type: string) {
    console.log("Type, " + type);
    console.log("ID, " + e.value.id);
    
    if (!e.value.id) {
      console.log("not");
    } else if (e.value.projectName) {
      console.log("Name, " + e.value.projectName);
      this.programForm.patchValue({
        projectId: e.value.id,
        projectName: e.value.projectName
      });
    } else if (e.value.systemName) {
      console.log("Name, " + e.value.systemName);
      this.programForm.patchValue({
        systemId: e.value.id,
        systemName: e.value.systemName
      });
    } else if (e.value.systemAnalystName) {
      console.log("Name, " + e.value.systemAnalystName);
      this.programForm.patchValue({
        systemAnalystId: e.value.id,
        systemAnalystName: e.value.systemAnalystName
      });
    }
  }

  addPage(): void {
    let componentPage = new ComponentPage();
    componentPage.id = (this.uiComponent.componentPage!.length + 1).toString();
    componentPage.componentTable = [];
    componentPage.actionTable = [];

    this.uiComponent.componentPage!.push(componentPage);
  }

  addComponentRow(index: number, component: ComponentTable = new ComponentTable()): void {
    component.id = (this.uiComponent.componentPage![index].componentTable?.length! + 1).toString();
    this.uiComponent.componentPage![index].componentTable?.push(component);
  }

  addActionRow(index: number, action: ActionTable = new ActionTable()): void {
    action.id = (this.uiComponent.componentPage![index].actionTable?.length! + 1).toString();
    this.uiComponent.componentPage![index].actionTable?.push(action);
  }

  onComponentRowEditInit(component: ComponentTable): void {
    this.clonedComponents[component.id!] = {...component};
  }

  onComponentRowEditSave(component: ComponentTable): void {
    delete this.clonedComponents[component.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onComponentRowEditCancel(component: ComponentTable, index: number): void {
    this.uiComponent.componentPage![index].componentTable?.splice(index, 1, this.clonedComponents[component.id!]);
    delete this.clonedComponents[component.id!];
    this.uiComponent.componentPage![index].componentTable = this.uiComponent.componentPage![index].componentTable?.slice();
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
    this.uiComponent.componentPage![index].actionTable?.splice(index, 1, this.clonedActions[action.id!]);
    delete this.clonedActions[action.id!];
    this.uiComponent.componentPage![index].actionTable = this.uiComponent.componentPage![index].actionTable?.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
}