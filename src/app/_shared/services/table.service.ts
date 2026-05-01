import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  getAllTables(): Observable<any[]> {
    return this.httpClient.get<any[]>('mesas').pipe();
  }

    updateTableStatus(tableId: string, status: string) {
    return this.httpClient.put(`mesas/${tableId}/update-status`, { status }).pipe();
  }

  createTable(formData: any) {
    return this.httpClient.post(`mesas`, formData).pipe();
  }

}