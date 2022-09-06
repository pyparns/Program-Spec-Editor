import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  
  blockSpace: RegExp = /[^\s]/;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regis(): void {
    console.log(this.email)
    this.router.navigate(['login'])
  }
}
