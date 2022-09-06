import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-import-spec-page',
  templateUrl: './import-spec-page.component.html',
  styleUrls: ['./import-spec-page.component.scss']
})
export class ImportSpecPageComponent implements OnInit {
  
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onUpload(event: { files: any; }): void {
    console.log("onUpload")
    for (let file of event.files) {
        this.uploadedFiles.push(file);
    }
    console.log("success")

    this.messageService.add({key: 'tl', severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onError(): void {
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
  }
}
