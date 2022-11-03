import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): any {
    return this.http.get<Project[]>("/api/project");
  }

  getProject(id: string): any {
    return this.http.get<Project>("/api/project/" + id);
  }

  addProject(project: Project): any {
    return this.http.post("/api/project", project);
  }

  updateProject(project: Project): any {
    return this.http.put("/api/project/" + project.id, project);
  }

  deleteProject(id: string): any {
    return this.http.delete("/api/project/" + id);
  }
}
