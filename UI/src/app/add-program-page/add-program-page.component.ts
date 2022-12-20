import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType, MenuItem } from 'primeng/api';
import { Program } from '../model/program.model';
import { Project } from '../model/project.model';
import { System } from '../model/system.model';
import { SystemAnalyst } from '../model/systemAnalyst.model';
import { AccountService } from '../service/account.service';
import { ProjectService } from '../service/project.service';
import { SystemAnalystService } from '../service/system-analyst.service';
import { SystemService } from '../service/system.service';

@Component({
  selector: 'app-add-program-page',
  templateUrl: './add-program-page.component.html',
  styleUrls: ['./add-program-page.component.scss']
})
export class AddProgramPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  programForm = new FormGroup({
    programId: new FormControl('', Validators.required),
    programName: new FormControl('', Validators.required),
    projectId: new FormControl(null, Validators.required),
    systemId: new FormControl(null, Validators.required),
    systemAnalystId: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required)
  });
  
  isLoading: boolean = true;
  projects!: Project[];
  systems!: System[];
  systemAnalysts!: SystemAnalyst[];
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private systemService: SystemService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private systemAnalystService: SystemAnalystService,
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((res: any) => this.projects = res);
    this.systemService.getSystems().subscribe((res: any) => this.systems = res);
    this.systemAnalystService.getSystemAnalysts().subscribe((res: any) => this.systemAnalysts = res);

    this.isLoading = false;
  }

  onSubmit(): void {
    if (this.programForm.invalid) {
      this.messageService.add({key: 'tl', severity:'error', summary:'กรุณากรอกข้อมูลให้ครบถ้วน', detail:''});
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to submit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.isSubmitted = true;

          // Check program form is valid.
          if (this.programForm.invalid) {
            return;
          }

          const program: Program = this.programForm.value as Program;
          
          this.router.navigate(['../component'], { relativeTo: this.activatedRoute, state: { program: program } });
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
}
