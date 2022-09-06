import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramSpec } from '../model/programspec.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramSpecService {

  constructor(private http: HttpClient) { }
  
  getProgramSpec(id: string) {
    return this.http.get<ProgramSpec>("/api/programspec/" + id);
  }
  getProgramSpecs() {
    return this.http.get<ProgramSpec[]>("/api/programspec");
  }
}
