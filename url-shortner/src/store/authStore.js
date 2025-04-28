import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          if (response.success) { // Updated to lowercase
            set({ 
              user: { id: response.data.id, email: response.data.email }, // Map data to user object
              accessToken: response.data.accessToken, // Updated to lowercase
              isAuthenticated: true,
              isLoading: false
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response;
          } else {
            set({ 
              error: response.message || 'Registration failed', // Updated to lowercase
              isLoading: false 
            });
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', // Updated to lowercase
            isLoading: false 
          });
          throw error;
        }
      },
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          console.log('Login response:', response);
          if (response.success) { // Updated to lowercase
            set({ 
              user: { id: response.data.id, email: response.data.email }, // Map data to user object
              accessToken: response.data.accessToken, // Updated to lowercase
              isAuthenticated: true,
              isLoading: false
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return response;
          } else {
            set({ 
              error: response.message || 'Login failed', // Updated to lowercase
              isLoading: false 
            });
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed', // Updated to lowercase
            isLoading: false 
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
            isLoading: false
          });
          localStorage.removeItem('accessToken');
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Logout failed', // Updated to lowercase
            isLoading: false 
          });
        }
      },
      
      checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (token && !get().isAuthenticated) {
          set({ accessToken: token, isAuthenticated: true });
          // Optionally, validate the token by making a request to the backend
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