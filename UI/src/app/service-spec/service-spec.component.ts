import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DetailServiceTable, ServiceComponent, ServiceTable } from '../model/serviceSpec.model';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-service-spec',
  templateUrl: './service-spec.component.html',
  styleUrls: ['./service-spec.component.scss']
})
export class ServiceSpecComponent implements OnInit {
  @Input() serviceSpec!: ServiceComponent;
  @Input() isEdit: boolean = false;

  isUpload: boolean = false;

  clonedServices: { [s: string]: ServiceTable; } = {};
  clonedDetailService: { [s: string]: DetailServiceTable; } = {};

  constructor(
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
  ) { }

  ngOnInit(): void {
  }

  onUpload(event: any, type: string): void {
    this.isUpload = true;

    const formData: FormData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("description", "service");

    if (type === 'er') this.serviceSpec.erDiagram = event.files[0].name;
    else if (type === 'class') this.serviceSpec.classDiagram = event.files[0].name;

    this.programSpecService.uploadFile(formData).subscribe(
      (res: any) => {
        console.log(res);
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'File Uploaded', detail: '' });
      },
      (err: any) => {
        console.log(err);
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed to upload', detail: 'please wait and try again' });
      },
      () => {  }
    );
  }

  addServiceRow(service: ServiceTable = new ServiceTable()): void {
    service.id = (this.serviceSpec.services!.length + 1).toString();
    service.detail = new DetailServiceTable();

    this.serviceSpec.services!.push(service);
  }

  onServiceRowEditInit(service: any): void {
    this.clonedServices[service.id!] = {...service};
  }

  onServiceRowEditSave(service: any): void {
    delete this.clonedServices[service.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onServiceRowEditCancel(service: any, index: number): void {
    this.serviceSpec.services!.splice(index, 1, this.clonedServices[service.id!]);
    delete this.clonedServices[service.id!];
    this.serviceSpec.services! = this.serviceSpec.services!.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }

  onDetailServiceRowEditInit(service: any): void {
    this.clonedServices[service.id!] = {...service};
  }

  onDetailServiceRowEditSave(service: any): void {
    delete this.clonedServices[service.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onDetailServiceRowEditCancel(service: any, index: number): void {
    this.serviceSpec.services!.splice(index, 1, this.clonedServices[service.id!]);
    delete this.clonedServices[service.id!];
    this.serviceSpec.services! = this.serviceSpec.services!.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
}
