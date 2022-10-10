import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    token: new FormControl('')
  });

  isLoading: boolean = false;
  isSubmitted: boolean = false;
  mode: string = "profile";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userForm.patchValue(this.accountService.userValue.value);

    this.mode = this.route.snapshot.url[0].path;
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

    this.accountService.editProfile(this.userForm.value).subscribe(
      () => {
        this.messageService.add({key: 'tl', severity: 'success', summary: 'Edit successful', detail: ''});
        this.router.navigate(['../profile'], { relativeTo: this.route });
      },
      () => {
        this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to edit', detail: 'please try again'})
        this.isLoading = false;
      });;
  }

}
