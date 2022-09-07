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
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  selectedStatus: string[] = [];
  filteredProgramSpecs: ProgramSpec[] = [];
  programSpecs: ProgramSpec[] = [];
  subscribeProgramSpec!: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    this.subscribeProgramSpec = this.programSpecService.getProgramSpecs().subscribe(response => {
      this.programSpecs = response;
      this.filteredProgramSpecs = response;
    })
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  filterSpec(): void {
    if (this.selectedStatus.length > 0)
      this.filteredProgramSpecs = this.programSpecs.filter(spec => this.selectedStatus.indexOf(spec.status) >= 0);
    else
      this.filteredProgramSpecs = this.programSpecs;
  }

  detailSpec(id: string): void {
    this.router.navigate(['programspec', { id: id }]);
  }
}
