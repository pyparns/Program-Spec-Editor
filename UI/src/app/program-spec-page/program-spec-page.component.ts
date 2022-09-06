import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgramSpec } from '../model/programspec.model';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-program-spec-page',
  templateUrl: './program-spec-page.component.html',
  styleUrls: ['./program-spec-page.component.scss']
})
export class ProgramSpecPageComponent implements OnInit {
  @Input() id: string = "630db9d3365056f8570cc5d1";
  subscribeProgramSpec!: Subscription;
  programSpec!: ProgramSpec;

  constructor(
    private router: Router,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    this.subscribeProgramSpec = this.programSpecService.getProgramSpec(this.id).subscribe(response => {
      this.programSpec = response;
    })
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

}
