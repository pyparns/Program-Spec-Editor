import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  loginForm!: FormGroup;

  blockSpace: RegExp = /[^\s]/;
  isLoading = false;
  loggedin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) {
    if (this.accountService.userValue) {
      this.messageService.add({key: 'tl', severity: 'info', summary: 'Already logged in', detail: ''});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.loggedin = true;

    // Check login form is valid.
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.accountService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        () => {
          this.messageService.add({key: 'tl', severity: 'success', summary: 'Login successful', detail: ''});
          this.router.navigate(["/"]).then(() => window.location.reload());
        },
        () => {
          this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to login', detail: 'please try again'})
          this.isLoading = false;
        });
  }

  toRegis(): void {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }

  toRecovPass(): void {

  }
}
