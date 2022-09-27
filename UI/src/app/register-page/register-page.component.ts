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
  
  loading: boolean = false;
  submitted: boolean = false;
  blockSpace: RegExp = /[^\s]/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) {
    if (this.accountService.userValue) {
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
    this.submitted = true;

    // check user form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.userForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.messageService.add({key: 'tl', severity: 'success', summary: 'Registration successful', detail: ''});
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        () => {
          this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to register', detail: 'please try again'})
          this.loading = false;
        });

  }
}
