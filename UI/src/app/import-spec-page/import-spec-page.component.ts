import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  ) {
    if (!this.accountService.userValue) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
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

  onError(): void {
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
  }
}
