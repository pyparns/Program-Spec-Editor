import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System } from '../model/system.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getSystems(): any {
    return this.http.get<System[]>("/api/system");
  }

  addSystem(system: System): any {
    return this.http.post("/api/system", system);
  }

  updateSystem(system: System): any {
    return this.http.put("/api/system/" + system.id, system);
  }

  deleteSystem(id: string): any {
    return this.http.delete("/api/system/" + id);
  }
}
