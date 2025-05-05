import { create } from 'zustand';
import { urlService } from '../services/urlService';

const FRONTEND_BASE_URL = 'http://localhost:5173';

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
      const newLink = {
        ...response.data,
        shortCode: response.data.shortUrl.split('/').pop(),
        displayShortUrl: `${FRONTEND_BASE_URL}/${response.data.shortUrl.split('/').pop()}`, // For display
      };
      set(state => ({ 
        userLinks: [newLink, ...state.userLinks],
        currentLink: newLink,
        isLoading: false
      }));
      return newLink;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create short URL', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  getUserLinks: async () => {
    set({ isLoading: true, error: null });
    try {
      const links = await urlService.getUserLinks();
      const updatedLinks = links.data.map(link => ({
        ...link,
        shortCode: link.shortUrl.split('/').pop(),
        displayShortUrl: `${FRONTEND_BASE_URL}/${link.shortUrl.split('/').pop()}`, // For display
      }));
      set({ userLinks: updatedLinks, isLoading: false });
      return updatedLinks;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch links', 
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
        error: error.response?.data?.message || 'Failed to fetch analytics', 
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