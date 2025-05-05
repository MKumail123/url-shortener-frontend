import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import useUrlStore from '../store/urlStore';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasCheckedAuth: false,

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          if (response.success) {
            set({ 
              user: { id: response.data.id, email: response.data.email },
              accessToken: response.data.accessToken,
              isAuthenticated: true,
              isLoading: false,
              hasCheckedAuth: true,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response;
          } else {
            set({ 
              error: response.message || 'Registration failed',
              isLoading: false,
              hasCheckedAuth: true,
            });
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
            hasCheckedAuth: true,
          });
          throw error;
        }
      },
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          console.log('Login response:', response);
          if (response.success) {
            set({ 
              user: { id: response.data.id, email: response.data.email },
              accessToken: response.data.accessToken,
              isAuthenticated: true,
              isLoading: false,
              hasCheckedAuth: true,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            try {
              await useUrlStore.getState().getUserLinks();
            } catch (fetchError) {
              console.error('Failed to fetch links after login:', fetchError);
            }
            return response;
          } else {
            set({ 
              error: response.message || 'Login failed',
              isLoading: false,
              hasCheckedAuth: true,
            });
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
            hasCheckedAuth: true,
          });
          throw error;
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          set({ 
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
            hasCheckedAuth: false,
          });
          localStorage.removeItem('accessToken');
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Logout failed',
            isLoading: false,
            hasCheckedAuth: false,
          });
        }
      },
      
      checkAuth: async () => {
        const state = get();
        if (state.hasCheckedAuth) return;

        set({ isLoading: true });
        const token = localStorage.getItem('accessToken');
        if (token) {
          try {
            // Validate the token by fetching user links
            await useUrlStore.getState().getUserLinks();
            set({ accessToken: token, isAuthenticated: true, hasCheckedAuth: true, isLoading: false });
          } catch (error) {
            console.error('Token validation failed:', error);
            // If token is invalid, log the user out
            set({ 
              user: null,
              accessToken: null,
              isAuthenticated: false,
              hasCheckedAuth: true,
              isLoading: false,
              error: 'Session expired. Please log in again.',
            });
            localStorage.removeItem('accessToken');
          }
        } else {
          set({ hasCheckedAuth: true, isLoading: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        accessToken: state.accessToken,
        user: state.user
      }),
    }
  )
);

export default useAuthStore;