import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Table, TableRequest } from "../interfaces/tables";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  getAllTables(): Observable<Table[]> {
    return this.httpClient.get<Table[]>('tables').pipe();
  }

  updateTableStatus(tableId: number, status: string) {
    return this.httpClient.patch(`tables/${tableId}/status`, { status }).pipe();
  }

  createTable(form: TableRequest) {
    return this.httpClient.post(`tables`, form).pipe();
  }

  updateTable(tableId: string, form: TableRequest) {
    return this.httpClient.put(`tables/${tableId}`, form).pipe();
  }

}