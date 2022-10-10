import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { ProgramSpec } from '../model/programspec.model';
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
    status: new FormControl('')
  });

  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private programSpecService: ProgramSpecService,
    private accountService: AccountService,
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onAddBtn(): void {
    this.isSubmitted = true;

    // Check program form is valid.
    if (this.programForm.invalid) {
      return;
    }

    this.programSpecService.createProgramSpec(this.programForm.value as Program).subscribe(
      () => {
        this.messageService.add({key: 'tl', severity: 'success', summary: 'Program created', detail: ''});
        this.router.navigate(['home']);
      }, () => {
        this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to create', detail: 'please wait and try again'});
      }, () => {
        this.isSubmitted = false;
      }
    )
  }
}
