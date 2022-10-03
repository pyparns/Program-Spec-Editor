import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramSpec } from '../model/programspec.model';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-program-spec-version',
  templateUrl: './program-spec-version.component.html',
  styleUrls: ['./program-spec-version.component.scss']
})
export class ProgramSpecVersionComponent implements OnInit {
  programSpec: ProgramSpec = new ProgramSpec();
  @Input() id: string | null = '';
  @Output() version = new EventEmitter<string>();

  date: any[] = [
    {programName: "Program Spec", date: "sep 13, 2022", version: "1"},
    {programName: "Program Spec", date: "sep 20, 2022", version: "2"},
    {programName: "Program Spec Editor", date: "sep 22, 2022", version: "3"},
  ];

  constructor(
    private router: Router,
    private programSpecService: ProgramSpecService
  ) {
  }
  
  ngOnInit(): void {
    this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.programSpec = response;
    });
  }

  onSelect(version: string): void {
    this.version.emit(version);
  }
}
