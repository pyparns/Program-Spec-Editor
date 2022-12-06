import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
    private accountService: AccountService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    const results: any[] = [];
    this.accountService.userValue.value.bookmark.forEach((pid: string) => {
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
    console.log(results);
    
    this.isLoading = false;
  }

  getSeverity(status: string): string {
    return this.programSpecService.getSeverity(status);
  }

  detailSpec(id: string): void {
    this.router.navigate(['programspec/' + id ]);
  }
}
