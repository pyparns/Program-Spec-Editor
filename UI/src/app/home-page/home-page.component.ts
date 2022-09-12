import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
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

  sortOrder!: number;
  sortField!: string;
  
  // base64Data: any;
  // retrieveResonse: any;
  // retrievedImage: any;

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

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  filterSpec(): void {
    if (this.selectedStatus.length > 0)
      this.filteredProgramSpecs = this.programSpecs.filter(spec => this.selectedStatus.indexOf(spec.status) >= 0);
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
