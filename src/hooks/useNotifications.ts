import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  fetchNotifications, 
  markAsRead, 
  markAllAsRead, 
  clearError 
} from '@/store/slices/notificationSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { items, unreadCount, isLoading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = async (id: string) => {
    await dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = async () => {
    await dispatch(markAllAsRead());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    notifications: items,
    unreadCount,
    isLoading,
    error,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    clearError: handleClearError,
  };
};
