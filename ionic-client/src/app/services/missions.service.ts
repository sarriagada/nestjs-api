import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  private api = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getAllMissions() {
    const path = `${this.api}/missions/`;
    return this.http.get<Mission[]>(path);
  }

  getMission(id: string) {
    const path = `${this.api}/missions/${id}`;
    return this.http.get<Mission>(path);
  }

  createMission(mission: Mission) {
    const path = `${this.api}/missions`;
    return this.http.post<Mission>(path, mission);
  }

  updateMission(mission: Mission) {
    const path = `${this.api}/missions/${mission.id}`;
    return this.http.put<Mission>(path, mission);
  }

  deleteMission(id: string) {
    const path = `${this.api}/missions/${id}`;
    return this.http.delete(path);
  }
}