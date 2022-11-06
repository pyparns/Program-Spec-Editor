import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { ProgramSpec } from '../model/programspec.model';
import { Project } from '../model/project.model';
import { ProgramSpecService } from '../service/program-spec.service';
import { ProjectService } from '../service/project.service';
import { SystemAnalystService } from '../service/system-analyst.service';
import { SystemService } from '../service/system.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  programSpecs: any[] = [];
  test: any[] = [{programName: "asdsads"}];

  isLoading: boolean = true;

  subscribeProgramSpec!: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private systemService: SystemService,
    private projectService: ProjectService,
    private systemAnalystService: SystemAnalystService,
    private programSpecService: ProgramSpecService
  ) { }

  ngOnInit(): void {
    this.subscribeProgramSpec = this.programSpecService.getProgramSpecs().subscribe(response => {
      response.forEach((item: any) => {
        let program = [item.programs?.filter((spec: any) => Number(spec.version) === item.latest)[0]!][0];
        Object.assign(item, program)
        delete item.programs;

        this.projectService.getProject(item.projectId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        this.systemService.getSystem(item.systemId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        this.systemAnalystService.getSystemAnalyst(item.systemAnalystId!).subscribe((res: any) => {
          delete res.id;
          Object.assign(item, res)
        });
        
        this.programSpecs.push(item);
      });
      console.log(this.programSpecs);
      
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscribeProgramSpec.unsubscribe();
  }

  getTarget (e: Event): any {
    return e.target as HTMLInputElement;
  }

  detailSpec(id: string): void {
    console.log(id);
    this.router.navigate(['programspec/' + id ]);
  }
}