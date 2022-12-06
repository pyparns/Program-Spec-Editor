import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  userForm!: FormGroup;
  
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  blockSpace: RegExp = /[^\s]/;
  hiddenPassword: boolean = true;
  showTerms: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    if (this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'info', summary: 'Already logged in', detail: ''});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      token: new FormControl(''),
      isAgree: new FormControl(false)
    })
  }
  
  get f() {
    return this.userForm.controls;
  }

  underline(e: any): void {
    e.style.textDecorationLine = "underline";
  }
  noneUnderline(e: any): void {
    e.style.textDecorationLine = "none";
  }
  okTerms(): void {
    this.showTerms = false;
    this.userForm.patchValue({isAgree: true});
  }
  
  onRegis(): void {
    this.isSubmitted = true;

    // check user form is valid
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to register?',
      header: 'Delete confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.register(this.userForm.value)
          .pipe(first())
          .subscribe(
            () => {
              this.messageService.add({key: 'tl', severity: 'success', summary: 'Registration successful', detail: ''});
              this.router.navigate(['../login'], { relativeTo: this.route });
            }, () => {
              this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to register', detail: 'please try again'})
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
}
