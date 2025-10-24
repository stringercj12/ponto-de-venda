import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) { }


  getAllProdutos(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/produtos').pipe();
  }

  getProdutoBycategoria(categoria: number): Observable<any> {
    return this.httpClient.get<any>(`/api/produtos/categoria/${categoria}`).pipe();
  }

  getProdutoByCodigo(codigo: string): Observable<any> {
    return this.httpClient.get<any>(`/api/produtos/codigo/${codigo}`).pipe();
  }
}
