// src/api/genreService.js
import api from './axiosConfig';

export const getAllGenres = async () => {
  const response = await api.get('/genre/all-genres');
  return response.data;
};

export const createGenre = async (genre) => {
  const response = await api.post('/genre/create', genre);
  return response.data;
};

export const updateGenre = async (id, genre) => {
  const response = await api.put(`/genre/update/${id}`, genre);
  return response.data;
};

export const deleteGenre = async (id) => {
  const response = await api.delete(`/genre/delete/${id}`);
  return response.data;
};
