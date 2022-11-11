import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
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
  datasource: any[] = [];
  programSpecs: any[] = [];

  isLoading: boolean = true;
  totalRecords!: number;

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
      let result: any[] = [];
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
        
        result.push(item);
      });
      this.datasource = result;
      this.totalRecords = result.length;
    });
  }

  loadProgramSpecs(event: LazyLoadEvent): void {
    this.isLoading = true;

    setTimeout(() => {
      if (this.datasource) {
        this.programSpecs = this.datasource.slice(
          event.first,
          event.first! + event.rows!
        );
        this.isLoading = false;
      }
    }, 1000);
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

  getSeverity(value: string): string {
    if (value === "Publish")
      return 'warning';
    else if (value === "Coding Success")
      return 'success';
    else
      return 'info';
  }
}