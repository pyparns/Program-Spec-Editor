import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  isLoading: boolean = false;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.userForm.patchValue(this.accountService.userValue.value);
  }

  get f() {
    return this.userForm.controls;
  }

  onSave(): any {
    this.isSubmitted = true;

    // check user form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;

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
            this.isLoading = false;
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
}
