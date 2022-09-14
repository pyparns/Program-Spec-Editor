import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProgramSpecService } from '../service/program-spec.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../../THSarabunNew-normal'

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success']

  programForm = new FormGroup({
    projectName: new FormControl(''),
    programId: new FormControl(''),
    programName: new FormControl(''),
    systemWorkId: new FormControl(''),
    systemWorkName: new FormControl(''),
    systemWorkDesigner: new FormControl(''),
    status: new FormControl(''),
    images: new FormControl()
  });

  title: string = "";
  id!: string | null;
  subscribeProgramSpec!: Subscription;
  isEdit: boolean = false;

  doc: jsPDF = new jsPDF("p", "pt", "a4");
  pdfDat!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
    this.programSpecService.getImage("image1.png").subscribe(response => {
      console.log(response);
    });

    this.initPdf();
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  onSave(id: string | null): void {
    this.subscribeProgramSpec = this.programSpecService.updateProgramSpec(id, this.programForm.value).subscribe(
      () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Program updated', detail: ''}),
      () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to update', detail: 'please wait and try again'}),
      () => this.isEdit = false
    )
  }

  onDelete(id: string | null): void {
    this.subscribeProgramSpec = this.programSpecService.deleteProgramSpec(id).subscribe(
      () => this.messageService.add({key: 'tl', severity: 'success', summary: 'Program deleted', detail: ''}),
      () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to delete', detail: 'please wait and try again'}),
      () => this.router.navigate(['home'])
    )
  }

  lenText(doc: jsPDF, text: string): any {
    return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  }

  initPdf(): any {
    this.subscribeProgramSpec = this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.title = response.programName;
      this.programForm.patchValue(response);

      this.doc.setProperties({ title: response.programName });
      this.doc.setFont("THSarabunNew", "bold");
      this.doc.text(response.programName, this.lenText(this.doc, response.programName), 40);

      response.images.forEach((item, index) => {
        let x = 47;
        let y = 80;

        if (index != 0) this.doc.addPage("a4");

        this.doc.addImage("/assets/image1.png", "PNG", x, y, 500, 250)

        this.doc.setFont("THSarabunNew", "normal");
        this.doc.text("UI : " + item.imageDescription, x, y += 290);

        const components:any = [];
        const actions:any = [];
        item.components.forEach(com => components.push([com.label, com.attribute, com.action]));
        item.actions.forEach(act => actions.push([act.action, act.description]));

        (this.doc as any).autoTable({columns: ["Label", "Attribute", "Event"], body: components, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 20});
        (this.doc as any).autoTable({columns: ["Event", "Description"], body: actions, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 130});
      });
      this.pdfDat = this.doc.output('datauristring');
    })
  }
}
