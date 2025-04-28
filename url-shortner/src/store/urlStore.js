// src/store/urlStore.js
import { create } from 'zustand';
import { urlService } from '../services/urlService';

const useUrlStore = create((set, get) => ({
  userLinks: [],
  currentLink: null,
  analytics: null,
  isLoading: false,
  error: null,
  
  createShortUrl: async (urlData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await urlService.createShortUrl(urlData);
      if (response.shortCode) {
        // Add the new link to the user's links
        set(state => ({ 
          userLinks: [response, ...state.userLinks],
          currentLink: response,
          isLoading: false
        }));
        return response;
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.Message || 'Failed to create short URL', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getUserLinks: async () => {
    set({ isLoading: true, error: null });
    try {
      const links = await urlService.getUserLinks();
      set({ userLinks: links, isLoading: false });
      return links;
    } catch (error) {
      set({ 
        error: error.response?.data?.Message || 'Failed to fetch links', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getAnalytics: async (shortCode) => {
    set({ isLoading: true, error: null });
    try {
      const analytics = await urlService.getAnalytics(shortCode);
      set({ analytics, isLoading: false });
      return analytics;
    } catch (error) {
      set({ 
        error: error.response?.data?.Message || 'Failed to fetch analytics', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  clearCurrentLink: () => {
    set({ currentLink: null });
  }
}));

export default useUrlStore;