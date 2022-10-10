import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
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
      token: new FormControl('')
    })
  }
  
  get f() {
    return this.userForm.controls;
  }
  
  onRegis(): void {
    this.isSubmitted = true;

    // check user form is valid
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.accountService.register(this.userForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.messageService.add({key: 'tl', severity: 'success', summary: 'Registration successful', detail: ''});
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        () => {
          this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to register', detail: 'please try again'})
          this.isLoading = false;
        });

  }
}
