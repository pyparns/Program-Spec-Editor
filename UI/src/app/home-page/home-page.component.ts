import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
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

  sortOrder!: number;
  sortField!: string;
  isLoading: boolean = true;

  subscribeProgramSpec!: Subscription;
  
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    this.subscribeProgramSpec = this.programSpecService.getProgramSpecs().subscribe(response => {
      this.programSpecs = response;
      this.programSpecs.forEach((item, index) => {
        this.programSpecs[index].programs = [item.programs?.filter(spec => spec.version === item.latest)[0]!];
      })
      this.filteredProgramSpecs = this.programSpecs;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  filterSpec(): void {
    if (this.selectedStatus.length > 0) {
      console.log(this.programSpecs);
      console.log(this.filteredProgramSpecs);
      this.filteredProgramSpecs = this.programSpecs.filter(spec => this.selectedStatus.indexOf(spec.programs![0].status!) >= 0);
    }
    else
      this.filteredProgramSpecs = this.programSpecs;
  }

  detailSpec(id: string): void {
    this.router.navigate(['programspec/' + id ]);
  }
  
  // getImage(): void {
  //   this.subscribeProgramSpec = this.programSpecService.getImage('image1.png').subscribe(
  //     res => {
  //       this.retrieveResonse = res;
  //       this.base64Data = this.retrieveResonse.picByte;
  //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //     }
  //   );
  // }
}
