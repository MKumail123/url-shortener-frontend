import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import useUrlStore from './urlStore';

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
      googleLogin: async (credential) => {
        set({ isLoading: true, error: null });
        try {
          // Decode the Google credential to extract email and sub (Google ID)
          const payload = JSON.parse(atob(credential.split('.')[1]));
          const googleId = payload.sub;
          const email = payload.email;

          const response = await fetch('https://localhost:44320/api/User/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, googleId }), // Send email and googleId to match GoogleLoginDto
            credentials: 'include', // Enable credentials for cookie support
          });
          const data = await response.json();
          console.log(data)
          if (data.success) {
            set({ 
              user: { id: data.data.id, email: data.data.email }, // Adjust based on your API response structure
              accessToken: data.data.accessToken,
              isAuthenticated: true,
              isLoading: false,
              hasCheckedAuth: true,
            });
            localStorage.setItem('accessToken', data.data.accessToken);
            try {
              await useUrlStore.getState().getUserLinks();
            } catch (fetchError) {
              console.error('Failed to fetch links after Google login:', fetchError);
            }
            // Note: navigate('/dashboard') is handled in the component
          } else {
            set({ 
              error: data.Message || 'Google login failed',
              isLoading: false,
              hasCheckedAuth: true,
            });
            throw new Error(data.Message || 'Google login failed');
          }
        } catch (error) {
          set({ 
            error: error.message || 'Network error',
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
            await useUrlStore.getState().getUserLinks();
            set({ accessToken: token, isAuthenticated: true, hasCheckedAuth: true, isLoading: false });
          } catch (error) {
            console.error('Token validation failed:', error);
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