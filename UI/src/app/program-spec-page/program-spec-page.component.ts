import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProgramSpecService } from '../service/program-spec.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import '../../THSarabunNew-normal';
import { ProgramSpec } from '../model/programspec.model';
import { Program } from '../model/program.model';

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  programSpec: ProgramSpec = new ProgramSpec();
  programForm = new FormGroup({
    projectName: new FormControl(''),
    programId: new FormControl(''),
    programName: new FormControl(''),
    systemWorkId: new FormControl(''),
    systemWorkName: new FormControl(''),
    systemWorkDesigner: new FormControl(''),
    status: new FormControl(''),
    images: new FormControl(),
    version: new FormControl(''),
  });

  id!: string | null;
  isEdit: boolean = false;
  canEdit: boolean = false;
  isVersion: boolean = true;
  isAddPage: boolean = false;
  subscribeProgramSpec!: Subscription;

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
    this.subscribeProgramSpec = this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.programSpec = response;
    });

    // this.programSpecService.getImage("image1.png").subscribe(response => {
    //   console.log(response);
    // });
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  onSave(id: string | null): void {
    this.subscribeProgramSpec = this.programSpecService.updateProgramSpec(id, this.programForm.value as Program).subscribe(
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

  onSelectVersion(version: string): void {
    this.isVersion = false;
    if (Number(version) == this.programSpec.latest) this.canEdit = true;
    this.programForm.patchValue(this.programSpec.programs?.filter(spec => spec.version === version)[0]!);
    this.initPdf();
  }

  toVersion(): void {
    this.isVersion = true;
    this.canEdit = false;
    this.isEdit = false;
    this.isAddPage = false;
  }

  lenText(doc: jsPDF, text: string): any {
    return (doc.internal.pageSize.getWidth() - doc.getTextWidth(text))/2
  }

  initPdf(): any {
    console.log(this.programForm.value.programName!);
    this.doc.setProperties({ title: this.programForm.value.programName! });
    this.doc.setFont("THSarabunNew", "bold");
    this.doc.text(this.programForm.value.programName!, this.lenText(this.doc, this.programForm.value.programName!), 40);

    if (this.programForm.value.images)
    this.programForm.value.images.forEach((item: any, index: number) => {
      let x = 47;
      let y = 80;

      if (index != 0) this.doc.addPage("a4");

      this.doc.addImage("/assets/image1.png", "PNG", x, y, 500, 250)

      this.doc.setFont("THSarabunNew", "normal");
      this.doc.text("Component : " + item.imageDescription, x, y += 290);

      const components:any = [];
      const actions:any = [];
      item.components!.forEach((com: any) => components.push([com.label, com.attribute, com.action]));
      item.actions!.forEach((act: any) => actions.push([act.action, act.description]));

      (this.doc as any).autoTable({columns: ["Label", "Attribute", "Event"], body: components, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 20});
      (this.doc as any).autoTable({columns: ["Event", "Description"], body: actions, styles: {font: "THSarabunNew", fontSize: 13}, startY: y += 130});
    });

    this.pdfDat = this.doc.output('datauristring');
  }
}