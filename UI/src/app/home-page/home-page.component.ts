import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgramSpec } from '../model/programspec.model';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success']

  selectedStatus: string[] = [];
  programSpecs: ProgramSpec[] = [];
  subscribeProgramSpec!: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    // this.programSpecs = [{
    //   projectName: "PPP",
    //   programId: "1",
    //   programName: "NN",
    //   systemWorkId: "2",
    //   systemWorkName: "SS",
    //   systemWorkDesigner: "PETER",
    //   images: []
    // },
    // {
    //   projectName: "Owen",
    //   programId: "2",
    //   programName: "newO",
    //   systemWorkId: "3",
    //   systemWorkName: "SWN",
    //   systemWorkDesigner: "Taweesak",
    //   images: []
    // }]

    this.programSpecService.getProgramSpec().subscribe(response => {
      console.log(response);
      this.programSpecs = response;
    })
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  onClickSpec(): void {
    this.router.navigate(['']);
  }

}
