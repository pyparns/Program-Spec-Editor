import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-program-page',
  templateUrl: './add-program-page.component.html',
  styleUrls: ['./add-program-page.component.scss']
})
export class AddProgramPageComponent implements OnInit {
  projectName!: string;
  programId!: string;
  programName!: string;
  systemWorkId!: string;
  systemWorkName!: string;
  systemWorkDesigner!: string;
  specStatus!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddBtn(): void {
    this.router.navigate(['home']);
  }
}
