import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ProgramSpec } from '../model/programspec.model';

@Component({
  selector: 'app-program-spec-version',
  templateUrl: './program-spec-version.component.html',
  styleUrls: ['./program-spec-version.component.scss']
})
export class ProgramSpecVersionComponent implements OnInit {
  @Input() programSpec: ProgramSpec = new ProgramSpec();
  @Output() version = new EventEmitter<string>();

  constructor( ) { }
  
  ngOnInit(): void {
  }

  onSelect(version: string): void {
    this.version.emit(version);
  }
}
