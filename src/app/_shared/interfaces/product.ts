export interface ProductResponse {
  total: number;
  produtos: Product[];
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  codigo: string;
  categoria: {
    id: number;
    nome: string;
    descricao: string;
    ativo: boolean;
  };
  ativo: boolean;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  extension: string;
  name: string;
  name_original: string;
  size: number;
  product_id: number;
}