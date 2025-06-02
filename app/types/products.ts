export type Product = {
  image: string | Blob | undefined;
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
