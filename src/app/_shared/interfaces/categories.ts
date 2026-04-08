export interface CategoryResponse {
  total: number;
  categories: Category[];
}

export interface Category {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  selecionado?: boolean;
}