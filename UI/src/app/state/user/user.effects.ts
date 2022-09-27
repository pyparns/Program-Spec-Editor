import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { AccountService } from '../../service/account.service';


@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private accountService: AccountService,
    private router: Router,
  ) {}

  // effects go here

}