import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  getAllTables(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/mesas').pipe();
  }

  updateTableStatus(tableId: number, status: string) {
    return this.httpClient.put(`/api/mesas/${tableId}/update-status`, { status }).pipe();
  }

}