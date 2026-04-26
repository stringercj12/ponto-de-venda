export interface CategoryResponse {
  total: number;
  categories: Category[];
}

export interface Category {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  selecionado?: boolean;
}