import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProgramSpecService } from '../service/program-spec.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../../THSarabunNew-normal';
import { ProgramSpec } from '../model/programspec.model';
import { Program } from '../model/program.model';
import { Sheet } from '../model/sheet.model';

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];
  uploadedFiles: File[] = [];

  programSpec: ProgramSpec = new ProgramSpec();
  programForm = new FormGroup({
    projectName: new FormControl(''),
    programId: new FormControl(''),
    programName: new FormControl(''),
    systemWorkId: new FormControl(''),
    systemWorkName: new FormControl(''),
    systemWorkDesigner: new FormControl(''),
    status: new FormControl(''),
    sheet: new FormControl(new Sheet),
    version: new FormControl(0),
  });

  id!: string | null;
  isEdit: boolean = true;
  canEdit: boolean = false;
  isVersion: boolean = true;
  isUploaded: boolean = false;
  subscribeProgramSpec!: Subscription;
  items: MenuItem[] = [];

  doc: jsPDF = new jsPDF("p", "pt", "a4");
  pdfDat!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
    this.subscribeProgramSpec = this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.programSpec = response;
    });
    this.items = [
      {
        label:'Text',
        icon:'pi pi-pencil',
        items:[
          {
            label:'Heading 1',
            icon:'pi pi-pencil'
          },
          {
            label:'Heading 2',
            icon:'pi pi-pencil'
          },
          {
            label:'Heading 3',
            icon:'pi pi-pencil'
          },
          {
            label:'Content',
            icon:'pi pi-pencil'
          },
        ]
      },
      {
        label:'Table',
        icon:'pi pi-pencil',
        items:[
          {
            label:'Component table',
            icon: 'pi pi-table',
            command: () => {
                this.messageService.add({ key: 'tl', severity: 'info', summary: 'Add', detail: 'component table' });
            }
          },
          {
            label:'Action table',
            icon: 'pi pi-table',
            command: () => {
                this.messageService.add({ key: 'tl', severity: 'info', summary: 'Add', detail: 'action table' });
            }
          },
          {
            label:'Service table',
            icon: 'pi pi-table',
            command: () => {
              this.messageService.add({ key: 'tl', severity: 'info', summary: 'Add', detail: 'service table' });
            }
          },
        ]
      }
  ];

    // this.programSpecService.getImage("image1.png").subscribe(response => {
    //   console.log(response);
    // });
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
    this.programForm.patchValue(this.programSpec.programs?.filter(spec => spec.version === version)[0]!);
    this.initPdf();
  }

  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
    this.doc = new jsPDF("p", "pt", "a4");
  }

  lenText(doc: jsPDF, text: string): any {
    return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  }

  onPrint(): any {
    this.confirmationService.confirm({
      message: 'Do you want to print this spec?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.doc.save();
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

  initPdf(): any {
    this.doc.setProperties({ title: this.programForm.value.programName! });
    this.doc.setFont("THSarabunNew", "bold");
    this.doc.text(this.programForm.value.programName!, this.lenText(this.doc, this.programForm.value.programName!), 40);

    let sheet = this.programForm.value.sheet;

    if (sheet) {
      if (sheet.ui) {
        sheet.ui.forEach((item: any, index: number) => {
          let x = 47;
          let y = 80;
  
          if (index != 0) this.doc.addPage("a4");
  
          this.doc.addImage("/assets/image1.png", "PNG", x, y, 500, 250)
  
          this.doc.setFont("THSarabunNew", "normal");
          this.doc.text("Component : " + item.imageDescription, x, y += 290);
  
          const components: any = [];
          const actions: any = [];
          item.components!.forEach((com: any) => components.push([com.label, com.attribute, com.action]));
          item.actions!.forEach((act: any) => actions.push([act.action, act.description]));
  
          (this.doc as any).autoTable({columns: ["Label", "Attribute", "Event"], body: components, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 20});
          (this.doc as any).autoTable({columns: ["Event", "Description"], body: actions, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 130});
        });
      }
      if (sheet.services) {
        let x = 47;
        let y = 80;

        this.doc.setFont("THSarabunNew", "normal");
        this.doc.text("Host : " + sheet.host, x, y);
        this.doc.text("Post : " + sheet.port, x, y += 20);
        this.doc.text("contextRoot : " + sheet.contextRoot, x, y += 20);
        this.doc.text("ER Diagram", x, y += 40);
        let textWidth = this.doc.getTextWidth("ER Diagram");
        this.doc.line(x, y += 2, x + textWidth, y)
        this.doc.addImage("/assets/er.png", "PNG", x, y += 20, 500, 350)

        this.doc.addPage("a4");
        x = 47; y = 60;

        this.doc.text("Class Diagram", x, y);
        textWidth = this.doc.getTextWidth("Class Diagram");
        this.doc.line(x, y += 2, x + textWidth, y)
        this.doc.addImage("/assets/class.png", "PNG", x, y += 20, 500, 400)

        const services: any = [];
        sheet.services!.forEach((service: any, index: number) => services.push([index + 1, service.service, service.method, service.action]));
        (this.doc as any).autoTable({columns: ["No.", "Service", "Method", "Action"], body: services, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 440});

        sheet.services!.forEach((service: any) => {
          const services: any = [
            ['Method Name', service.methodName],
            ['Input Parameter', service.inputParameter],
            ['Example Response', service.exampleResponse],
            [{content: service.description, colSpan: 2}]
          ];
          (this.doc as any).autoTable({head: [[{content: service.action, colSpan: 2, styles: { halign: 'center' }}]], body: services, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 300})
        })
      }
    }

    this.pdfDat = this.doc.output('datauristring');
  }
}