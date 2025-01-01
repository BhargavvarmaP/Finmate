import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  displayOptions: {
    compactView: boolean;
    showBalance: boolean;
    defaultDateRange: '7d' | '30d' | '90d' | '1y' | 'all';
  };
}

interface SettingsState {
  data: Settings;
  isLoading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  data: {
    theme: 'system',
    language: 'en',
    currency: 'INR',
    notifications: {
      email: true,
      push: true,
      desktop: true,
    },
    displayOptions: {
      compactView: false,
      showBalance: true,
      defaultDateRange: '30d',
    },
  },
  isLoading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch settings');
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (data: Partial<Settings>, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update settings');
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.data.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.data.language = action.payload;
    },
    setCurrency: (state, action) => {
      state.data.currency = action.payload;
    },
    setNotificationPreference: (state, action) => {
      state.data.notifications = {
        ...state.data.notifications,
        ...action.payload,
      };
    },
    setDisplayOption: (state, action) => {
      state.data.displayOptions = {
        ...state.data.displayOptions,
        ...action.payload,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTheme,
  setLanguage,
  setCurrency,
  setNotificationPreference,
  setDisplayOption,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
