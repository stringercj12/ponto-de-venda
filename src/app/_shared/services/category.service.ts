import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Category } from "../interfaces/categories";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  listCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('category');
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