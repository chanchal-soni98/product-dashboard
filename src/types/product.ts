export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type SortDirection = 'asc' | 'desc';

export interface FiltersState {
  searchTerm: string;
  category: string;
  sortDirection: SortDirection;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  categories: string;
}

export interface FavoritesState {
  items: Product[];
}