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
  getMyProgramSpecs(accId: string) {
    return this.http.get<ProgramSpec[]>("/api/programspec/account/" + accId);
  }
  createProgramSpec(program: Program) {
    var programSpec: ProgramSpec = new ProgramSpec;
    program.date = new Date();
    program.version = 1;
    programSpec.latest = 1;
    programSpec.programs = [program];
    this.accountService.userValue.subscribe((item: any) => {
      programSpec.accId = item.id
    });

    // console.log(programSpec);

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
  getSeverity(value: string): string {
    if (value === "Coding Success")
      return 'success';
    else if (value === "Coding")
      return 'danger';
    else if (value === "Publish")
      return 'warning';
    else if (value === "Create")
      return 'info';
    else
      return '';
  }
}
