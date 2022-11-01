import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { SystemAnalyst } from '../model/systemAnalyst.model';
import { SystemAnalystService } from '../service/system-analyst.service';

@Component({
  selector: 'app-system-analyst-page',
  templateUrl: './system-analyst-page.component.html',
  styleUrls: ['./system-analyst-page.component.scss']
})
export class SystemAnalystPageComponent implements OnInit {
  systemAnalysts: SystemAnalyst[] = [];
  clonedSystemAnalysts: { [s: string]: SystemAnalyst; } = {};
  isLoading: boolean = true;
  addSystemAnalystName: string = "";

  constructor(
    private systemService: SystemAnalystService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.systemService.getSystemAnalysts().subscribe((data: any) => {
      this.systemAnalysts = data
      this.isLoading = false;
    });;
    
  }

  getTarget (e: Event): any {
    return e.target as HTMLInputElement;
  }

  addSystemAnalyst(systemAnalystName: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.systemService.addSystemAnalyst({systemAnalystName: systemAnalystName} as SystemAnalyst).subscribe((res: any) => {
          this.systemAnalysts = res;
          this.addSystemAnalystName = "";
          this.messageService.add({key: 'tl', severity: 'success', summary: 'System Analyst added', detail: ''});
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

  onRowEditInit(systemAnalyst: SystemAnalyst) {
    this.clonedSystemAnalysts[systemAnalyst.id!] = {...systemAnalyst};
  }

  onRowEditSave(systemAnalyst: SystemAnalyst) {
    this.systemService.updateSystemAnalyst(systemAnalyst).subscribe((res: any) => {
      delete this.clonedSystemAnalysts[systemAnalyst.id!];
      this.messageService.add({key: 'tl', severity: 'success', summary: 'System Analyst edited', detail: ''});
    });
  }

  onRowEditCancel(systemAnalyst: SystemAnalyst, index: number) {
    this.systemAnalysts.splice(index, 1, this.clonedSystemAnalysts[systemAnalyst.id!]);
    delete this.clonedSystemAnalysts[systemAnalyst.id!];
    this.systemAnalysts = this.systemAnalysts.slice();
  }
}
