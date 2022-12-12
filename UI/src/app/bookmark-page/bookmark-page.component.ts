import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ProgramSpec } from '../model/programspec.model';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.scss']
})
export class BookmarkPageComponent implements OnInit {
  isLoading: boolean = true;
  myProgramSpec: any[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private accountService: AccountService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.refreshBookmark();
    
    this.isLoading = false;
  }

  getSeverity(status: string): string {
    return this.programSpecService.getSeverity(status);
  }

  refreshBookmark() {
    const results: any[] = [];
    this.accountService.userValue.value.bookmark.forEach((pid: string) => {
      if (pid)
        this.programSpecService.getProgramSpec(pid).subscribe((res: ProgramSpec) => {
          const program = res.programs?.filter(p => p.version === res.latest)[0]!;

          this.accountService.getNameById(res.accId!).subscribe((user: any) => {
            const result = {
              id: res.id,
              programId: program.programId,
              programName: program.programName,
              creator: user.fullName,
              status: program.status
            }

            results.push(result);
          });
        });
    })
    this.myProgramSpec = results;
  }

  detailSpec(id: string): void {
    this.router.navigate(['programspec/' + id ]);
  }

  unBookmark(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to bookmark?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.unbookmark(id).subscribe(
          (res: any) => this.messageService.add({key: 'tl', severity: 'success', summary: 'Unbookmarked', detail: ''}),
          () => this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to unbookmark', detail: 'please wait and try again'}),
          () => this.refreshBookmark()
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
