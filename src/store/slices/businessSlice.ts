import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Business {
  id: number;
  name: string;
  type: string;
  gstNumber?: string;
  email: string;
  phone: string;
  address?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
}

interface BusinessState {
  data: Business | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BusinessState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchBusiness = createAsyncThunk(
  'business/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/business');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch business details');
    }
  }
);

export const updateBusiness = createAsyncThunk(
  'business/update',
  async (data: Partial<Business>, { rejectWithValue }) => {
    try {
      const response = await api.put('/business', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update business details');
    }
  }
);

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch business
      .addCase(fetchBusiness.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update business
      .addCase(updateBusiness.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = businessSlice.actions;
export default businessSlice.reducer;
