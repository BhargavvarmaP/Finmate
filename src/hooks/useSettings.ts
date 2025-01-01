import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  fetchSettings,
  updateSettings,
  setTheme,
  setLanguage,
  setCurrency,
  setNotificationPreference,
  setDisplayOption,
  clearError,
} from '@/store/slices/settingsSlice';

export const useSettings = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.settings
  );

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleUpdateSettings = async (settings: any) => {
    await dispatch(updateSettings(settings));
  };

  const handleSetTheme = (theme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(theme));
  };

  const handleSetLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };

  const handleSetCurrency = (currency: string) => {
    dispatch(setCurrency(currency));
  };

  const handleSetNotificationPreference = (preferences: {
    email?: boolean;
    push?: boolean;
    desktop?: boolean;
  }) => {
    dispatch(setNotificationPreference(preferences));
  };

  const handleSetDisplayOption = (options: {
    compactView?: boolean;
    showBalance?: boolean;
    defaultDateRange?: '7d' | '30d' | '90d' | '1y' | 'all';
  }) => {
    dispatch(setDisplayOption(options));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    settings: data,
    isLoading,
    error,
    updateSettings: handleUpdateSettings,
    setTheme: handleSetTheme,
    setLanguage: handleSetLanguage,
    setCurrency: handleSetCurrency,
    setNotificationPreference: handleSetNotificationPreference,
    setDisplayOption: handleSetDisplayOption,
    clearError: handleClearError,
  };
};
