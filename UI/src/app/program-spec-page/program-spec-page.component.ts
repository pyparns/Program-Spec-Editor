import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Subscription } from 'rxjs';

import { jsPDF } from "jspdf";
import '../../THSarabunNew-normal';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType } from "docx";

import { SystemService } from '../service/system.service';
import { AccountService } from '../service/account.service';
import { ProjectService } from '../service/project.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { SystemAnalystService } from '../service/system-analyst.service';

import { System } from '../model/system.model';
import { Program } from '../model/program.model';
import { Project } from '../model/project.model';
import { ProgramSpec } from '../model/programspec.model';
import { SystemAnalyst } from '../model/systemAnalyst.model';
import { DetailServiceTable, ServiceComponent, ServiceTable } from '../model/serviceSpec.model';
import { ActionTable, ComponentPage, ComponentTable, UiComponent } from '../model/uiSpec.model';

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  programSpec: ProgramSpec = new ProgramSpec();
  componentSpec!: UiComponent;
  serviceSpec!: ServiceComponent;
  clonedProgramSpec!: ProgramSpec;
  clonedComponentSpec!: UiComponent;
  clonedServiceSpec!: ServiceComponent;
  
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

  id!: string;
  isEdit: boolean = false;
  canEdit: boolean = false;
  isVersion: boolean = true;
  bookmarked: boolean = false;
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
    private accountService: AccountService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
    private systemAnalystService: SystemAnalystService,
  ) { }

  ngOnInit(): void {
    this.onLoadData();
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

  onLoadData(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
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
    if (this.accountService.userValue.value.bookmark.indexOf(this.id) >= 0) {
      this.bookmarked = true;
    }
  }

  editMode(programSpec: ProgramSpec, componentSpec: UiComponent, serviceSpec: ServiceComponent): void {
    this.clonedProgramSpec = { ...programSpec },
    this.clonedComponentSpec = { ...componentSpec },
    this.clonedServiceSpec = { ...serviceSpec },
    
    this.isEdit = true;
  }

  cancleEdit(): void {
    this.programSpec = { ...this.clonedProgramSpec };
    this.componentSpec = { ...this.clonedComponentSpec };
    this.serviceSpec = { ...this.clonedServiceSpec };

    // let v: number = this.programForm.value.version!;

    // this.onSelectVersion(v);
    
    this.isEdit = false;
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
  }
  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
  }

  // Bug
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
  
  onBookmark(id: string, bookmarked: boolean): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to bookmark?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (bookmarked) {
          this.accountService.unbookmark(id).subscribe(
            () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Unbookmarked', detail: ''}),
            () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to unbookmark', detail: 'please wait and try again'}),
            () => this.bookmarked = false
          );
        } else {
          this.accountService.bookmark(id).subscribe(
            () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Bookmarked', detail: ''}),
            () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to bookmark', detail: 'please wait and try again'}),
            () => this.bookmarked = true
          );
        }
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
      if (exportFile.type === 'doc') {
        exportFile.fileSelect.forEach((f: any) => {
          if (f.spec === 'Component') this.ExportComponentSpec2Word(f.name);
          else if (f.spec === 'Service') this.ExportServiceSpec2Word(f.name);
        })
      } else if (exportFile.type === 'pdf') {
        exportFile.fileSelect.forEach((f: any) => {
          if (f.spec === 'Component') this.ExportComponentSpec2Pdf(f.name);
          else if (f.spec === 'Service') this.ExportServiceSpec2Pdf(f.name);
        })
      }

      this.hideExportDialog();
      this.messageService.add({key: 'tl', severity: 'success', summary: 'File exported', detail: ''});
    }
  }

  // Word
  componentPage2Word(cp: ComponentPage[]): any[] {
    const cpw: any[] = [
      new Paragraph({
        children: [ new TextRun({ text: this.componentSpec.title, bold: true, }) ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 700 }
      }),
    ];

    cp.forEach((p: ComponentPage) => {
      cpw.push( new Paragraph({ text: 'This is image', spacing: { after: 2500, before: 2500 }, alignment: AlignmentType.CENTER }) );
      cpw.push( new Table({ rows: this.componentTable2Word(p.componentTable!, p.name!), width: { size: 9000, type: WidthType.DXA } }) );
      cpw.push( new Paragraph({ spacing: { after: 300 } }) );
      cpw.push( new Table({ rows: this.actionTable2Word(p.actionTable!), width: { size: 9000, type: WidthType.DXA } }) );
      cpw.push( new Paragraph({ spacing: { after: 300 } }) );
    })

    return cpw;
  }

  componentTable2Word(ct: ComponentTable[], cpName: string): any[] {
    const ctw: any[] = [
      new TableRow({
        children: [
          new TableCell({ 
            children: [
              new Paragraph({ children: [ new TextRun({ text: cpName, bold: true, font: 'THSarabunNew', size: 24 }) ] })
            ],
            columnSpan: 4,
          })
        ],
        tableHeader: true,
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Label', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 2250, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Attribute', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 2250, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Property', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 2250, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Event', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 2250, type: WidthType.DXA },
          }),
        ]
      })
    ];

    ct.forEach((c: any) => {
      ctw.push(
        new TableRow({
          children: [
            new TableCell({ children: [ new Paragraph({ text: c.label }) ] }),
            new TableCell({ children: [ new Paragraph({ text: c.attribute }) ] }),
            new TableCell({ children: [ new Paragraph({ text: c.property }) ] }),
            new TableCell({ children: [ new Paragraph({ text: c.event }) ] }),
          ]
        })
      )
    });

    return ctw;
  }

  actionTable2Word(at: ActionTable[]): any[] {
    const atw: any[] = [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Action', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 2250, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Description', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 6750, type: WidthType.DXA },
          }),
        ]
      })
    ];

    at.forEach((a) => {
      atw.push(
        new TableRow({
          children: [
            new TableCell({ children: [ new Paragraph({ text: a.action }) ] }),
            new TableCell({ children: [ new Paragraph({ text: a.description }) ] }),
          ]
        })
      )
    })

    return atw;
  }

  servicePage2Word(sp: ServiceComponent): any[] {
    const spw: any[] = [
      new Paragraph({
        children: [ new TextRun({ text: sp.title, bold: true, font: 'THSarabunNew' }) ],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Host : ', bold: true, font: 'THSarabunNew' }),
          new TextRun({ text: sp.host, font: 'THSarabunNew' }),
        ],
        spacing: { before: 700, },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Port : ', bold: true, font: 'THSarabunNew' }),
          new TextRun({ text: sp.port, font: 'THSarabunNew' }),
        ],
        spacing: { before: 500, },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Context Root : ', bold: true, font: 'THSarabunNew' }),
          new TextRun({ text: sp.contextRoot, font: 'THSarabunNew' }),
        ],
        spacing: { before: 500, },
      }),
      new Paragraph({
        children: [ new TextRun({ text: 'Er Diagram', bold: true, font: 'THSarabunNew' }) ],
        spacing: { before: 500, },
      }),
      new Paragraph({ text: 'This is Er Diagram image', spacing: { after: 2500, before: 2500 }, alignment: AlignmentType.CENTER }),
      new Paragraph({ text: 'This is Class Diagram image', spacing: { after: 2500, before: 2500 }, alignment: AlignmentType.CENTER }),
      new Table({ rows: this.serviceTable2Word(sp.services!), width: { size: 9000, type: WidthType.DXA } }),
      new Paragraph({ spacing: { after: 300 } }),
    ];

    sp.services!.forEach((st: ServiceTable) => {
      spw.push(
        new Table({ rows: this.detailTable2Word(st.detail!, st.action!), width: { size: 9000, type: WidthType.DXA } }),
      );
      spw.push(
        new Paragraph({ spacing: { after: 300 } }),
      );
    })

    return spw;
  }

  serviceTable2Word(st: ServiceTable[]): any[] {
    const stw: any[] = [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'No.', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Service', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 5500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Method', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 1500, type: WidthType.DXA },
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Action', bold: true, font: 'THSarabunNew', size: 20 }) ] }),
            ],
            width: { size: 1500, type: WidthType.DXA },
          }),
        ]
      })
    ];

    st.forEach((s: any, i: number) => {
      stw.push(
        new TableRow({
          children: [
            new TableCell({ children: [ new Paragraph({ text: i.toString() }) ] }),
            new TableCell({ children: [ new Paragraph({ text: s.service }) ] }),
            new TableCell({ children: [ new Paragraph({ text: s.method }) ] }),
            new TableCell({ children: [ new Paragraph({ text: s.action }) ] }),
          ]
        })
      )
    })

    return stw;
  }

  detailTable2Word(dt: DetailServiceTable, action: string): any[] {
    const dtw: any[] = [
      new TableRow({ 
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: action, bold: true, font: 'THSarabunNew', size: 22 }) ] })
            ],
            columnSpan: 2,
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Method Name', bold: true, font: 'THSarabunNew', size: 20 }) ] })
            ],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({ children: [ new Paragraph({ text: dt.methodName }) ] }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Input Parameter', bold: true, font: 'THSarabunNew', size: 20 }) ] })
            ],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({ children: [ new Paragraph({ text: dt.inputParameter }) ] }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Example Response', bold: true, font: 'THSarabunNew', size: 20 }) ] })
            ],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({ children: [ new Paragraph({ text: dt.exampleResponse }) ] }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [ new TextRun({ text: 'Description', bold: true, font: 'THSarabunNew', size: 20 }) ] })
            ],
            width: { size: 2000, type: WidthType.DXA },
          }),
          new TableCell({ children: [ new Paragraph({ text: dt.description }) ] }),
        ]
      }),
    ];

    return dtw;
  }

  // Export to Word
  ExportComponentSpec2Word(filename: string = 'document'): void {
    const doc = new Document({
      sections: [ { properties: {}, children: this.componentPage2Word(this.componentSpec.componentPage!) } ],
    });

    Packer.toBlob(doc).then((blob: any) => saveAs(blob, filename + ".docx"));
  }

  ExportServiceSpec2Word(filename: string = 'document'): void {
    const doc = new Document({
      sections: [ { properties: {}, children: this.servicePage2Word(this.serviceSpec) } ],
    });

    Packer.toBlob(doc).then((blob: any) => saveAs(blob, filename + ".docx"));
  }

  // Pdf
  lenText(doc: jsPDF, text: string): any {
    return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  }

  // Export to Pdf
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
        
    doc.save(filename);
  }
}