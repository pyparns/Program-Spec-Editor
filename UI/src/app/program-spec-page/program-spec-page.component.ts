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

  programSpec: ProgramSpec = new ProgramSpec();
  serviceComponent!: ServiceComponent;
  uiComponent!: UiComponent;
  projects!: Project[];
  systems!: System[];
  systemAnalysts!: SystemAnalyst[];
  exportFile: any = {fileSelect: [], type: ''};
  
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

  clonedProgram: any = {};

  id!: string | null;
  isEdit: boolean = false;
  canEdit: boolean = false;
  isVersion: boolean = true;
  isUpload: boolean = false;
  isExport: boolean = false;
  isExportSubmit: boolean = false;

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

  receiveComponentSpec(value: UiComponent): void {
    this.uiComponent = value;
  }
  receiveServiceSpec(value: ServiceComponent): void {
    this.serviceComponent = value;
  }

  cancleEdit(): void {
    this.isEdit = false;
    this.isUpload = false;
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
        console.log(program);
        this.subscribeProgramSpec = this.programSpecService.updateProgramSpec(id, program).subscribe(
          () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Program updated', detail: ''}),
          () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to update', detail: 'please wait and try again'}),
          () => this.cancleEdit()
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
  }
  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
  }

  // lenText(doc: jsPDF, text: string): any {
  //   return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  // }

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

  openExportDialog(): void {
    this.isExport = true;
  }
  hideExportDialog(): void {
    this.isExport = false;
    this.isExportSubmit = false;
    this.exportFile = {name: '', type: ''};
  }
  onExport(exportFile: any): void {
    this.isExportSubmit = true;

    if (exportFile.type && exportFile.fileSelect.length > 0) {
      console.log(exportFile);
      this.hideExportDialog();
    }
  }

  onProgramRowEditInit(program: any): void {
    this.clonedProgram = {...program};
  }
  onProgramRowEditSave(): void {
    this.clonedProgram = {};
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Program edited', detail: ''});
  }
  onProgramRowEditCancel(): void {
    console.log(this.clonedProgram);
    this.programForm.patchValue(this.clonedProgram);
    this.clonedProgram = {};
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
  
  onBookmark(id: string | null): void {

  }
}