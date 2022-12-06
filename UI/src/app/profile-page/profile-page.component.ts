import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ProgramSpec } from '../model/programspec.model';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { ProjectService } from '../service/project.service';
import { SystemAnalystService } from '../service/system-analyst.service';
import { SystemService } from '../service/system.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  isEditLoading: boolean = false;
  isProgramSpecLoading: boolean = false;
  isSubmitted: boolean = false;

  userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });
  clonedUser: any = {};
  myProgramSpec!: ProgramSpec[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private systemService: SystemService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
    private systemAnalystService: SystemAnalystService,
  ) { }

  ngOnInit(): void {
    this.userForm.patchValue(this.accountService.userValue.value);

    this.isProgramSpecLoading = true;

    this.programSpecService.getMyProgramSpecs(this.userForm.value.id).subscribe(response => {
      let result: any[] = [];
      response.forEach((item: any) => {
        let program = [item.programs?.filter((spec: any) => Number(spec.version) === item.latest)[0]!][0];
        Object.assign(item, program)
        delete item.programs;

        this.projectService.getProject(item.projectId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        this.systemService.getSystem(item.systemId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        this.systemAnalystService.getSystemAnalyst(item.systemAnalystId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        
        result.push(item);
      });

      this.myProgramSpec = result;
      this.isProgramSpecLoading = false
    });
  }

  get f() {
    return this.userForm.controls;
  }

  getSeverity(status: string): string {
    return this.programSpecService.getSeverity(status);
  }

  onSave(): any {
    this.isSubmitted = true;

    // check user form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.isEditLoading = true;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to save?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.editProfile(this.userForm.value).subscribe(
          () => {
            this.messageService.add({key: 'tl', severity: 'success', summary: 'Edit successful', detail: ''});
            this.router.navigate(['../profile'], { relativeTo: this.route });
          }, () => {
            this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to edit', detail: 'please try again'})
            this.isEditLoading = false;
          }
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

  onUserRowEditInit(user: any): void {
    this.clonedUser = {...user};
  }
  onUserRowEditSave(): void {
    this.onSave();
    this.clonedUser = {};
  }
  onUserRowEditCancel(): void {
    this.userForm.patchValue(this.clonedUser);
    this.clonedUser = {};
    this.messageService.add({key: 'tl', severity: 'error', summary: 'Edit canceled', detail: ''});
  }

  changePassword(): void {
    console.log(this.userForm.value)
  }

  detailSpec(id: string): void {
    this.router.navigate(['programspec/' + id ]);
  }

  addProgramSpec(): void {
    this.router.navigate(["/create/spec/program"]);
  }
}
