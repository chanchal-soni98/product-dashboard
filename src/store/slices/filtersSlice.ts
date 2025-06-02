import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { FiltersState, SortDirection } from '../../types/product';


const initialState: FiltersState = {
  searchTerm: '',
  category: '',
  sortDirection: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.category = '';
      state.sortDirection = 'asc';
    },
  },
});

export const { 
  setSearchTerm, 
  setCategory, 
  setSortDirection, 
  resetFilters 
} = filtersSlice.actions;

export default filtersSlice.reducer;