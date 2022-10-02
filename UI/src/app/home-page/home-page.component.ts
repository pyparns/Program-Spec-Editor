import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { ProgramSpecService } from '../service/program-spec.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  statuses: string[] = ['Create', 'Publish', 'Coding', 'Coding Success'];

  selectedStatus: string[] = [];
  filteredProgramSpecs: Program[] = [];
  programSpecs: Program[] = [];

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
      var list: Program[] = [];
      response.forEach(item => {
        list.push(item.programs?.filter(spec => spec.version === item.lartest)[0]!);
      })
      console.log(list);
      this.programSpecs = list;
      this.filteredProgramSpecs = list;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  filterSpec(): void {
    if (this.selectedStatus.length > 0)
      this.filteredProgramSpecs = this.programSpecs.filter(spec => this.selectedStatus.indexOf(spec.status!) >= 0);
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
