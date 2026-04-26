import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CategoryResponse } from "../interfaces/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  listCategories(): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>('categoria');
  }


  tratamentoError() {
    catchError(error => {
      console.error('Ocorreu um erro na requisição:', error);
      // Exibir mensagem para o usuário, por exemplo
      // return of([]); // Retorna um array vazio para o subscribe
      return throwError(() => new Error('Algo deu errado!')); // Retorna um erro para o subscribe
    })
  }
}