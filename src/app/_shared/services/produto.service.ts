import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product, ProductListResponse } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpClient: HttpClient) { }

  getAllProdutos(): Observable<ProductListResponse[]> {
    return this.httpClient.get<ProductListResponse[]>(`products`).pipe();
  }

  getProdutoBycategoria(categoriaId: string): Observable<ProductListResponse[]> {
    return this.httpClient.get<ProductListResponse[]>(`products/category/${categoriaId}`).pipe();
  }

  getProdutoByCodigo(codigo: string): Observable<Product> {
    return this.httpClient.get<Product>(`products/sku/${codigo}`).pipe();
  }
}
