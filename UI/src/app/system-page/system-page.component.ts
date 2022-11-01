import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { System } from '../model/system.model';
import { SystemService } from '../service/system.service';

@Component({
  selector: 'app-system-page',
  templateUrl: './system-page.component.html',
  styleUrls: ['./system-page.component.scss']
})
export class SystemPageComponent implements OnInit {
  systems!: System[];
  clonedSystems: { [s: string]: System; } = {};
  isLoading: boolean = true;
  addSystemName: string = "";

  constructor(
    private systemService: SystemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.systemService.getSystems().subscribe((data: any) => {
      this.systems = data
      this.isLoading = false;
    });
  }

  getTarget (e: Event): any {
    return e.target as HTMLInputElement;
  }

  addSystem(systemName: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.systemService.addSystem({systemName: systemName} as System).subscribe((res: any) => {
          this.systems = res;
          this.addSystemName = "";
          this.messageService.add({key: 'tl', severity: 'success', summary: 'System added', detail: ''});
        })
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

  onRowEditInit(system: System) {
    this.clonedSystems[system.id!] = {...system};
  }

  onRowEditSave(system: System) {
    this.systemService.updateSystem(system).subscribe((res: any) => {
      delete this.clonedSystems[system.id!];
      this.messageService.add({key: 'tl', severity: 'success', summary: 'System edited', detail: ''});
    });
  }

  onRowEditCancel(system: System, index: number) {
    this.systems.splice(index, 1, this.clonedSystems[system.id!]);
    delete this.clonedSystems[system.id!];
    this.systems = this.systems.slice();
  }
}
