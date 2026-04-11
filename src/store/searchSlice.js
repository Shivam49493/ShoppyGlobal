import { createSlice } from '@reduxjs/toolkit'

// Search slice manages the product search/filter query via Redux state
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
  },
  reducers: {
    // Update search query
    setSearchQuery: (state, action) => {
      state.query = action.payload
    },
    // Clear search
    clearSearch: (state) => {
      state.query = ''
    },
  },
})

export const { setSearchQuery, clearSearch } = searchSlice.actions

// Selector to get current search query
export const selectSearchQuery = (state) => state.search.query

export default searchSlice.reducer
