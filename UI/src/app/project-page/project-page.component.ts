import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  projects: Project[] = [];
  clonedProjects: { [s: string]: Project; } = {};
  isLoading: boolean = true;
  addProjectName: string = "";

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data
      this.isLoading = false;
    });
  }

  getTarget (e: Event): any {
    return e.target as HTMLInputElement;
  }

  addProject(projectName: string): void {
    if (projectName)
      this.confirmationService.confirm({
        message: 'Are you sure that you want to submit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.projectService.addProject({projectName: projectName} as Project).subscribe((res: any) => {
            this.projects = res;
            this.addProjectName = "";
            this.messageService.add({key: 'tl', severity: 'success', summary: 'Project added', detail: ''});
          })
        },
        reject: (type: any) => {
          switch(type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({key: 'tl', severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
          }
        }
      });
    else
      this.messageService.add({key: 'tl', severity: 'error', summary: 'Please input project name', detail: ''});
  }

  onRowEditInit(project: Project) {
    this.clonedProjects[project.id!] = {...project};
  }

  onRowEditSave(project: Project) {
    if (project.projectName)
      this.projectService.updateProject(project).subscribe((res: any) => {
        delete this.clonedProjects[project.id!];
        this.messageService.add({key: 'tl', severity: 'success', summary: 'Project edited', detail: ''});
      });
    else
      this.messageService.add({key: 'tl', severity: 'error', summary: 'Please input project name', detail: ''});
  }

  onRowEditCancel(project: Project, index: number) {
    this.projects.splice(index, 1, this.clonedProjects[project.id!]);
    delete this.clonedProjects[project.id!];
    this.projects = this.projects.slice();
  }
}
