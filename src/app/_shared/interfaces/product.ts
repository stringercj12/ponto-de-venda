import { Category } from "./categories";

export interface BaseProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  active: boolean;
}
export interface ProductListResponse extends BaseProduct {
  categories: string[];
  thumbnailUrl: string;
}
export interface Product extends BaseProduct {
  categories: Category[];
  attachments: Attachment[];
}

export interface Attachment {
  attachmentId: string;
  url: string;
  extension: string;
  originalName: string;
  isPrimary: boolean,
  displayOrder: number
}