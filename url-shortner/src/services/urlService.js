// src/services/urlService.js
import api from './api';

export const urlService = {
  createShortUrl: async (urlData) => {
    const response = await api.post('/urlshortener/shorten', urlData);
    console.log('Create Short URL response:', response);
    return response.data;
  },
  
  getUserLinks: async () => {
    const response = await api.get('/urlshortener/user-links');
    console.log('Get User Links response:', response.data);
    return response.data;
  },
  
  getAnalytics: async (shortCode) => {
    const response = await api.get(`/urlshortener/analytics/${shortCode}`);
    return response.data;
  }
};