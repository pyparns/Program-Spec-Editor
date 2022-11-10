import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Program } from '../model/program.model';
import { map, Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-service-spec-page',
  templateUrl: './add-service-spec-page.component.html',
  styleUrls: ['./add-service-spec-page.component.scss']
})
export class AddServiceSpecPageComponent implements OnInit {
  
  isSubmitted: boolean = false;
  program!: Program;
  text: string = "";

  state$!: Observable<object>;

  specForm = new FormGroup({
    title: new FormControl(null),
    host: new FormControl(null),
    port: new FormControl(null),
    contextRoot: new FormControl(null),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private programSpecService: ProgramSpecService,
    private confirmationService: ConfirmationService,
  ) {
    if (!this.accountService.userValue.value) {
      this.messageService.add({key: 'tl', severity: 'warn', summary: 'Not logged in', detail: 'please login and try again'});
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.program = window.history.state.program;
  }

  createProgram(): void {
    this.isSubmitted = true;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.program.sheet = this.text;
        this.programSpecService.createProgramSpec(this.program).subscribe(
          () => {
            this.messageService.add({key: 'tl', severity: 'success', summary: 'Program created', detail: ''});
            this.router.navigate(['home']);
          }, () => {
            this.messageService.add({key: 'tl', severity: 'error', summary: 'Failed to create', detail: 'please wait and try again'});
          }, () => {
            this.isSubmitted = false;
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
