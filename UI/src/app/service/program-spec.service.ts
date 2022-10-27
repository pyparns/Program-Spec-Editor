import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../model/program.model';
import { ProgramSpec } from '../model/programspec.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramSpecService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) { }
  
  getProgramSpec(id: string | null) {
    return this.http.get<ProgramSpec>("/api/programspec/" + id);
  }
  getProgramSpecs() {
    return this.http.get<ProgramSpec[]>("/api/programspec");
  }
  createProgramSpec(program: Program) {
    var programSpec: ProgramSpec = new ProgramSpec;
    program.date = new Date();
    program.version = 1;
    programSpec.latest = 1;
    programSpec.programs = [program];
    programSpec.accId = this.accountService.userValue.id;

    return this.http.post("/api/programspec", programSpec);
  }
  updateProgramSpec(id: string | null, program: Program) {
    program.date = new Date();
    program.version = program.version! + 1;
    return this.http.put("/api/programspec/" + id, program);
  }
  deleteProgramSpec(id: string | null) {
    return this.http.delete("/api/programspec/" + id);
  }
  uploadFile(formData: FormData) {
    return this.http.post("/api/programspec/upload", formData);
  }
}
