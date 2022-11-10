import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    programId: new FormControl(''),
    programName: new FormControl(''),
    projectId: new FormControl(null),
    systemId: new FormControl(null),
    systemAnalystId: new FormControl(null),
    status: new FormControl(null),
    sheet: new FormControl(null)
  });
  
  isLoading: boolean = true;
  projects!: Project[];
  systems!: System[];
  systemAnalysts!: SystemAnalyst[];
  isSubmitted: boolean = false;
  displayDialog: boolean = false;

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

  onSelected(spec: string): void {
    this.isSubmitted = true;

    // Check program form is valid.
    if (this.programForm.invalid) {
      return;
    }

    const program: Program = this.programForm.value as Program;
    
    // this.router.navigate(['../import'], { relativeTo: this.activatedRoute, state: { program: program } });
    this.router.navigate(['../' + spec], { relativeTo: this.activatedRoute, state: { program: program } });

    this.displayDialog = false;
  }
}
