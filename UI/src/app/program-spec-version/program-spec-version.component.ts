import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-spec-version',
  templateUrl: './program-spec-version.component.html',
  styleUrls: ['./program-spec-version.component.scss']
})
export class ProgramSpecVersionComponent implements OnInit {

  date: any[] = [
    {name: "Program Spec", date: "sep 13, 2022", version: "1"},
    {name: "Program Spec", date: "sep 20, 2022", version: "2"},
    {name: "Program Spec Editor", date: "sep 22, 2022", version: "3"},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
