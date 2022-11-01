import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { Program } from '../model/program.model';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-import-spec-page',
  templateUrl: './import-spec-page.component.html',
  styleUrls: ['./import-spec-page.component.scss']
})
export class ImportSpecPageComponent implements OnInit {
  
  text: string = "";
  uploadedFile!: File;
  isUpload: boolean = false;
  isSubmitted: boolean = false;
  program!: Program;

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
  }

  onUpload(event: any): void {
    this.isUpload = true;
    console.log("onUpload :", event.files[0])

    const formData: FormData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("description", "abc");

    this.uploadedFile = event.files[0];
    this.programSpecService.uploadFile(formData).subscribe(
      () => { this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' }) },
      () => { this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' }) },
      () => { console.log('Success :', this.uploadedFile) }
    );
  }

  onError(): void {
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
  }

  onSavePdf(): void {
    this.isSubmitted = true;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.program.sheet = this.uploadedFile ? this.uploadedFile.name : this.text;
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
}
