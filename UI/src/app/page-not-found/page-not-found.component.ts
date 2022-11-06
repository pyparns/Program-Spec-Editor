import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.subscribeProgramSpec = this.programSpecService.getProgramSpecs().subscribe(response => {
    //   response.forEach((item: any) => {
    //     let program = [item.programs?.filter((spec: any) => Number(spec.version) === item.latest)[0]!][0];
    //     Object.assign(item, program)
    //     delete item.programs;

    //     this.projectService.getProject(item.projectId!).subscribe((res: any) => {
    //       delete res.id;
    //       Object.assign(item, res)
    //     });
    //     this.systemService.getSystem(item.systemId!).subscribe((res: any) => {
    //       delete res.id;
    //       Object.assign(item, res)
    //     });
    //     this.systemAnalystService.getSystemAnalyst(item.systemAnalystId!).subscribe((res: any) => {
    //       delete res.id;
    //       Object.assign(item, res)
    //     });
        
    //     this.programSpecs.push(item);
    //   });
    //   console.log(this.programSpecs);
      
    //   this.isLoading = false;
    // });
  }


}
