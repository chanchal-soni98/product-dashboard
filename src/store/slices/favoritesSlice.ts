import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Product } from '../../types/product';


interface FavoritesState {
  items: Product[];
}

const getFromLocalStorage = (): Product[] =>{
  try{
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : []
  }catch{
    return []
  }
}
const saveToLocalStorage = (products: Product[]) =>{
  try{
    localStorage.setItem('favorites', JSON.stringify(products))
  }catch(e){
    alert(`Failed to save: ${e}`)
  }
}

const initialState: FavoritesState = {
  items: getFromLocalStorage()
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        saveToLocalStorage(state.items)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items)
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;