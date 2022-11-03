import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemAnalyst } from '../model/systemAnalyst.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAnalystService {

  constructor(private http: HttpClient) { }

  getSystemAnalysts(): any {
    return this.http.get<SystemAnalyst[]>("/api/systemanalyst");
  }

  getSystemAnalyst(id: string): any {
    return this.http.get<SystemAnalyst>("/api/systemanalyst/" + id);
  }

  addSystemAnalyst(systemAnalyst: SystemAnalyst): any {
    return this.http.post("/api/systemanalyst", systemAnalyst);
  }

  updateSystemAnalyst(systemAnalyst: SystemAnalyst): any {
    return this.http.put("/api/systemanalyst/" + systemAnalyst.id, systemAnalyst);
  }

  deleteSystemAnalyst(id: string): any {
    return this.http.delete("/api/systemanalyst/" + id);
  }
}
