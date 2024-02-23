import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await response.json();
    return categories.reduce((acc, category) => {
      acc[category] = {
        products: [],
        productsPending: false,
        productsError: null,
        page: 1,
        pageSize: 5
      };
      return acc;
    }, {});
  }
);

// Async think to fetch products per category. Fake store API does not support
// pagination with index + limit so instead, we fetch everything and then slice later
export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}?sort=asc`);
    const products = await response.json();
    return { category, products };
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: {},
    categoriesPending: false,
    categoriesError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesPending = true;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesPending = false;
      state.data = action.payload;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.categoriesPending = false;
      state.categoriesError = action.error.message;
    })
    .addCase(fetchProductsByCategory.pending, (state, action) => {
      const category = action.meta.arg;
      if (state.data[category]) {
        state.data[category].productsPending = true;
      }
    })
    .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      const { category, products } = action.payload;
      if (state.data[category]) {
        state.data[category].products = products;
        state.data[category].productsPending = false;
        state.data[category].page = 1;
        state.data[category].pageSize = 5;
        state.data[category].hasMore = products.length > 5
      }
    })
    .addCase(fetchProductsByCategory.rejected, (state, action) => {
      const category = action.meta.arg;
      if (state.data[category]) {
        state.data[category].productsPending = false;
        state.data[category].productsError = action.error.message;
      }
    })
  },
  reducers: {
    updatePage: (state, action) => {
      const { category, newPage, newHasMore } = action.payload;
      if (state.data[category]) {
        state.data[category].page = newPage;
        state.data[category].hasMore = newHasMore;
      }
    }
  },
});

const categoriesReducer = categoriesSlice.reducer;

export const {
  updatePage,
} = categoriesSlice.actions;
export {categoriesReducer};
