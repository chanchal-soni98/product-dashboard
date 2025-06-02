import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    return response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return response.json();
  }
);

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch products';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const exists = state.items.some(item => item.id === action.payload.id);
        if (!exists) {
          state.items.push(action.payload);
        }
      });
  },
});

export default productsSlice.reducer;