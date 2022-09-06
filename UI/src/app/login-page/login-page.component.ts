import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username: string = '';
  password: string = '';

  blockSpace: RegExp = /[^\s]/;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.username + " : " + this.password)
    this.router.navigate(['home'])
  }

  toRegis(): void {
    this.router.navigate(['register'])
  }

  toRecovPass(): void {

  }
}
