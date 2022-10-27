import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-add-program-page',
  templateUrl: './add-program-page.component.html',
  styleUrls: ['./add-program-page.component.scss']
})
export class AddProgramPageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  programForm = new FormGroup({
    projectName: new FormControl(''),
    programId: new FormControl(''),
    programName: new FormControl(''),
    systemWorkId: new FormControl(''),
    systemWorkName: new FormControl(''),
    systemWorkDesigner: new FormControl(''),
    status: new FormControl(''),
    sheet: new FormControl('')
  });

  uploadedFile!: File;
  isUpload: boolean = false;
  isSubmitted: boolean = false;
  // items: MenuItem[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // this.items = [
    //   {
    //     label: 'Personal',
    //     routerLink: 'personal'
    //   },
    //   {
    //       label: 'Seat',
    //       routerLink: 'seat'
    //   },
    //   {
    //       label: 'Payment',
    //       routerLink: 'payment'
    //   },
    //   {
    //       label: 'Confirmation',
    //       routerLink: 'confirmation'
    //   }
    // ];
  }

  onAddBtn(): void {
    this.isSubmitted = true;

    // Check program form is valid.
    if (this.programForm.invalid) {
      return;
    }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const program: Program = this.programForm.value as Program;
        this.router.navigate(['../import'], { relativeTo: this.activatedRoute, state: { program: program } });
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
