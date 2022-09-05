import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramSpec } from '../model/programspec.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramSpecService {

  constructor(private http: HttpClient) { }

  getProgramSpec() {
    return this.http.get<ProgramSpec[]>("/api/programspec");
  }
}
