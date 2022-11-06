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

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];
  uploadedFiles: File[] = [];

  programSpec: ProgramSpec = new ProgramSpec();
  programSpecVersion: any;
  programForm = new FormGroup({
    programId: new FormControl(''),
    programName: new FormControl(''),
    projectName: new FormControl(''),
    systemName: new FormControl(''),
    systemAnalystName: new FormControl(''),
    status: new FormControl(''),
    sheet: new FormControl(''),
    version: new FormControl(0),
  });

  id!: string | null;
  isEdit: boolean = false;
  canEdit: boolean = false;
  isVersion: boolean = true;
  isUploaded: boolean = false;
  subscribeProgramSpec!: Subscription;
  text: string = "";

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
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  onSave(id: string | null): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscribeProgramSpec = this.programSpecService.updateProgramSpec(id, this.programForm.value as Program).subscribe(
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
    if (version == this.programSpec.latest) this.canEdit = true;
    this.programSpecVersion = this.programSpec.programs?.filter(spec => spec.version === version)[0]!;
    console.log(this.programSpecVersion);

    let program = [this.programSpecVersion.programs?.filter((spec: any) => Number(spec.version) === this.programSpecVersion.latest)[0]!][0];
    Object.assign(this.programSpecVersion, program)
    delete this.programSpecVersion.programs;

    this.projectService.getProject(this.programSpecVersion.projectId!).subscribe((res: any) => {
      delete res.id;
      Object.assign(this.programSpecVersion, res)
    });
    this.systemService.getSystem(this.programSpecVersion.systemId!).subscribe((res: any) => {
      delete res.id;
      Object.assign(this.programSpecVersion, res)
    });
    this.systemAnalystService.getSystemAnalyst(this.programSpecVersion.systemAnalystId!).subscribe((res: any) => {
      delete res.id;
      Object.assign(this.programSpecVersion, res)
    });

    console.log(this.programForm.value);
    this.programForm.patchValue(this.programSpecVersion);
    console.log(this.programForm.value);
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

  onUpload(event: { files: any; }): void {
    this.isUploaded = true;
    console.log("onUpload")
    for (let file of event.files) {
        this.uploadedFiles.push(file);
    }
    console.log("success")
    this.messageService.add({key: 'tl', severity: 'success', summary: 'File Uploaded', detail: ''});
  }

  onSavePdf(): void {
    
  }
}