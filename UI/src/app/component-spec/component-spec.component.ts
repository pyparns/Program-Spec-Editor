import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Image } from 'primeng/image';
import { ActionTable, ComponentPage, ComponentTable, UiComponent } from '../model/uiSpec.model';
import { ProgramSpecService } from '../service/program-spec.service';


@Component({
  selector: 'app-component-spec',
  templateUrl: './component-spec.component.html',
  styleUrls: ['./component-spec.component.scss']
})
export class ComponentSpecComponent implements OnInit {
  @Input() componentSpec!: UiComponent;
  @Input() isEdit: boolean = false;

  isUpload: boolean = false;
  
  clonedComponents: { [s: string]: ComponentTable; } = {};
  clonedActions: { [s: string]: ActionTable; } = {};

  image: any;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
  ) { }

  ngOnInit(): void {
    this.http.get('/api/programspec/file/' + 'image1.png', { responseType: 'text' }).subscribe(
      (res) => { console.log(res); this.image = res }
    );
  }

  onUpload(event: any, index: number): void {
    this.isUpload = true;

    this.componentSpec.componentPage![index].image = event.files[0].name;

    const formData: FormData = new FormData();
    formData.append("file", event.files[0]);
    formData.append("description", "ui");
    
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

  addPage(): void {
    let componentPage = new ComponentPage();
    componentPage.id = (this.componentSpec.componentPage!.length + 1).toString();
    componentPage.componentTable = [];
    componentPage.actionTable = [];

    this.componentSpec.componentPage!.push(componentPage);
  }

  addComponentRow(index: number, component: ComponentTable = new ComponentTable()): void {
    component.id = (this.componentSpec.componentPage![index].componentTable?.length! + 1).toString();
    this.componentSpec.componentPage![index].componentTable?.push(component);
  }

  addActionRow(index: number, action: ActionTable = new ActionTable()): void {
    action.id = (this.componentSpec.componentPage![index].actionTable?.length! + 1).toString();
    this.componentSpec.componentPage![index].actionTable?.push(action);
  }

  onComponentRowEditInit(component: ComponentTable): void {
    this.clonedComponents[component.id!] = {...component};
  }

  onComponentRowEditSave(component: ComponentTable): void {
    delete this.clonedComponents[component.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onComponentRowEditCancel(component: ComponentTable, index: number, page: number): void {
    this.componentSpec.componentPage![page].componentTable?.splice(index, 1, this.clonedComponents[component.id!]);
    delete this.clonedComponents[component.id!];
    this.componentSpec.componentPage![page].componentTable = this.componentSpec.componentPage![page].componentTable?.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }

  onActionRowEditInit(action: ActionTable): void {
    this.clonedActions[action.id!] = {...action};
  }

  onActionRowEditSave(action: ActionTable): void {
    delete this.clonedActions[action.id!];
    this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
  }

  onActionRowEditCancel(action: ActionTable, index: number, page: number): void {
    this.componentSpec.componentPage![page].actionTable?.splice(index, 1, this.clonedActions[action.id!]);
    delete this.clonedActions[action.id!];
    this.componentSpec.componentPage![page].actionTable = this.componentSpec.componentPage![page].actionTable?.slice();
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }
}
