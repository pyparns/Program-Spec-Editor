import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Program } from '../model/program.model';
import { map, Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { ProgramSpecService } from '../service/program-spec.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionTable, ComponentPage, ComponentTable, UiComponent } from '../model/uiSpec.model';

@Component({
  selector: 'app-add-ui-spec-page',
  templateUrl: './add-ui-spec-page.component.html',
  styleUrls: ['./add-ui-spec-page.component.scss']
})
export class AddUiSpecPageComponent implements OnInit {
  componentSpec!: UiComponent;

  isSubmitted: boolean = false;
  program!: Program;

  state$!: Observable<object>;

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

    let pages: ComponentPage[] = [];
    let componentPage = new ComponentPage();
    componentPage.id = (pages.length + 1).toString();
    componentPage.componentTable = [];
    componentPage.actionTable = [];

    pages.push(componentPage);

    this.componentSpec = new UiComponent();
    this.componentSpec.componentPage = pages;
  }

  onSubmitBtn(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isSubmitted = true;

        this.router.navigate(['../service'], { relativeTo: this.activatedRoute, state: { program: this.program, uiComponent: this.componentSpec } });
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
