import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProgramSpecService } from '../service/program-spec.service';

import * as fs from "fs";
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import '../../THSarabunNew-normal';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

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
  serviceSpec!: ServiceComponent;
  componentSpec!: UiComponent;
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
    this.componentSpec = value;
  }
  receiveServiceSpec(value: ServiceComponent): void {
    this.serviceSpec = value;
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
        program.uiComponent = this.componentSpec;
        program.serviceComponent = this.serviceSpec;
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
    this.componentSpec = result.uiComponent;
    this.serviceSpec = result.serviceComponent;

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

    console.log(this.componentSpec);
  }
  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
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

      if (exportFile.type === 'doc') {
        exportFile.fileSelect.forEach((f: any) => {
          console.log(f);
          if (f.spec === 'Component')
            this.ExportComponentSpec2Word(f.name);
          else if (f.spec === 'Service')
            this.ExportServiceSpec2Word(f.name);
        })
      } else if (exportFile.type === 'pdf') {
        exportFile.fileSelect.forEach((f: any) => {
          console.log(f);
          if (f.spec === 'Component')
            this.ExportComponentSpec2Pdf(f.name);
          else if (f.spec === 'Service')
            this.ExportServiceSpec2Pdf(f.name);
        })
      }

      this.hideExportDialog();

    } else {

    }
  }


  // Export
  ExportComponentSpec2Word(filename: string = 'document'): void {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: this.componentSpec.title, bold: true, })
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.HEADING_1,
            }),
            // new Paragraph({
            //   children: [
            //     new ImageRun({ data: fs.readFileSync("assets/er_diagram.png"), transformation: { width: 400, height: 300, } }),
            //   ],
            // }),
          ],
        },
      ],
    });

    // Download
    Packer.toBlob(doc).then((blob: any) => {
      saveAs(blob, filename + ".docx");
    });
  }
  ExportServiceSpec2Word(filename: string = 'document'): void {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: this.serviceSpec.title, bold: true, })
              ],
              alignment: AlignmentType.CENTER,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Host : ', bold: true, }),
                new TextRun({ text: this.serviceSpec.host }),
              ],
              spacing: {
                before: 700,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Port : ', bold: true, }),
                new TextRun({ text: this.serviceSpec.port }),
              ],
              spacing: {
                before: 500,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Context Root : ', bold: true, }),
                new TextRun({ text: this.serviceSpec.contextRoot }),
              ],
              spacing: {
                before: 500,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Er Diagram', bold: true, }),
              ],
              spacing: {
                before: 500,
              },
            }),
            // new Paragraph({
            //   children: [
            //     new ImageRun({ data: fs.readFileSync("assets/er_diagram.png"), transformation: { width: 400, height: 300, } }),
            //   ],
            // }),
          ],
        },
      ],
    });

    // Download
    Packer.toBlob(doc).then((blob: any) => {
      saveAs(blob, filename + ".docx");
    });
  }
  ExportComponentSpec2Pdf(filename: string = 'document'): void {
    let doc: jsPDF = new jsPDF('p', 'pt', 'a4');
    let height: number = 70;

    doc.setFont('THSarabunNew', 'bold');
    doc.setFontSize(20);
    doc.text(this.componentSpec.title!, this.lenText(doc, this.serviceSpec.title!), height);

    
    this.componentSpec.componentPage?.forEach((page: any, index: number) => {
      if (index > 0) {
        doc.addPage();
        height = 50;
      }
      doc.addImage('assets/image1.png', 'png', 100, height += 40, 400, 250);
      
      const componentTable: any[] = [];
      const actionTable: any[] = [];
      page.componentTable.forEach((ct: any) => {
        componentTable.push([ct.label || "", ct.attribute || "", ct.property || "", ct.event || ""]);
      })
      page.actionTable.forEach((at: any) => {
        actionTable.push([at.action || "", at.description || ""]);
      })
      autoTable(doc, {
        theme: 'grid',
        styles: { font: 'THSarabunNew', fontSize: 14 },
        headStyles: {fillColor: '#7ff7d9', textColor: '#000', lineWidth: 1},
        head: [[{ content: page.name!, colSpan: 4, styles: { halign: 'center' } }], ['Label', 'Attribute', 'Property', 'Event']],
        body: componentTable,
        startY: height += 280
      })
      autoTable(doc, {
        theme: 'grid',
        styles: { font: 'THSarabunNew', fontSize: 14 },
        headStyles: {fillColor: '#7ff7d9', textColor: '#000', lineWidth: 1},
        head: [['Action Name', 'Description']],
        body: actionTable,
        startY: height += 160
      })
    })

    doc.save(filename);
  }
  ExportServiceSpec2Pdf(filename: string = 'document'): void {
    let doc: jsPDF = new jsPDF('p', 'pt', 'a4');
    let height: number = 70;

    doc.setFont('THSarabunNew', 'bold');
    doc.setFontSize(20);
    doc.text(this.serviceSpec.title!, this.lenText(doc, this.serviceSpec.title!), height);

    doc.setFont('THSarabunNew', 'bold');
    doc.setFontSize(13);
    doc.text('Host : ', 50, height += 60);
    doc.text('Port : ', 50, height += 40);
    doc.text('Context Root : ', 50, height += 40);
    doc.text('Er Diagram', 50, height += 40);

    doc.setFont('THSarabunNew', 'normal');
    doc.setFontSize(16);
    doc.text(this.serviceSpec.contextRoot!, 140, height -= 40);
    doc.text(this.serviceSpec.port!, 90, height -= 40);
    doc.text(this.serviceSpec.host!, 90, height -= 40);

    doc.addImage('assets/er_diagram.png', 'png', 100, height += 140, 400, 300);

    doc.addPage('a4', 'p');
    height = 70;
    doc.addImage('assets/class_diagram.png', 'png', 100, height, 400, 300);

    const services: any[] = [];
    const details: any[] = [];
    this.serviceSpec.services?.forEach((service: any, index: number) => {
      services.push([index + 1, service.service || '', service.method || '', service.action || '']);
      details.push({
        name: service.action,
        action: [['Method Name', service.detail.methodName], ['Input Parameter', service.detail.inputParameter], ['Example Response', service.detail.exampleResponse], ['Description', service.detail.description]]
      })
    })
    autoTable(doc, {
      theme: 'grid',
      styles: { font: 'THSarabunNew', fontSize: 14 },
      headStyles: {fillColor: '#7ff7d9', textColor: '#000', lineWidth: 1},
      head: [['No.', 'Service', 'Method', 'Action']],
      body: services,
      startY: height += 330
    })
    details.forEach((detail: any, index: number) => {
      autoTable(doc, {
        theme: 'grid',
        styles: { font: 'THSarabunNew', fontSize: 14 },
        headStyles: {fillColor: '#7ff7d9', textColor: '#000', lineWidth: 1},
        head: [[{ content: detail.name, colSpan: 2, styles: { halign: 'center' } }]],
        body: detail.action,
        startY: height += index == 0 ? 100 : 300
      })
    })
  
    // window.open(doc.output('bloburl'));
    
    doc.save(filename);
  }

  lenText(doc: jsPDF, text: string): any {
    return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  }
}