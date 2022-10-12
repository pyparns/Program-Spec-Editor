import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-import-spec-page',
  templateUrl: './import-spec-page.component.html',
  styleUrls: ['./import-spec-page.component.scss']
})
export class ImportSpecPageComponent implements OnInit {
  
  uploadedFiles: any[] = [];
  isUploaded: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private accountService: AccountService,
    private confirmationService: ConfirmationService
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onBeforeUpload(): void {
    this.confirmationService.confirm({
      message: 'Do you want to upload file?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isUploaded = true;
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
    if (this.isUploaded) {
      console.log("onUpload")
      for (let file of event.files) {
          this.uploadedFiles.push(file);
      }
      console.log("success")
      this.messageService.add({key: 'tl', severity: 'success', summary: 'File Uploaded', detail: ''});
    }
  }

  onError(): void {
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
  }
}
