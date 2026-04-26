import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) { }


  getAllProdutos(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('produtos').pipe();
  }

  getProdutoBycategoria(categoriaId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`produtos/categoria/${categoriaId}`).pipe();
  }

  getProdutoByCodigo(codigo: string): Observable<Product> {
    return this.httpClient.get<Product>(`produtos/codigo/${codigo}`).pipe();
  }
}
