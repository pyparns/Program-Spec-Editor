import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramSpec } from '../model/programspec.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramSpecService {

  constructor(private http: HttpClient) { }
  
  getProgramSpec(id: string | null) {
    return this.http.get<ProgramSpec>("/api/programspec/" + id);
  }
  getProgramSpecs() {
    return this.http.get<ProgramSpec[]>("/api/programspec");
  }
  createProgramSpec(programSpec: any) {
    return this.http.post("/api/programspec", programSpec);
  }
  updateProgramSpec(id: string | null, programSpec: any) {
    return this.http.put("/api/programspec/" + id, programSpec);
  }
  deleteProgramSpec(id: string | null) {
    return this.http.delete("/api/programspec/" + id);
  }
  getImage(imageName: string) {
    return this.http.get('/assets/images/' + imageName);
  }
}
