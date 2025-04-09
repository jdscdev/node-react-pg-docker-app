import { apiRequest, apiRequestDelete } from './apiClient';

const API_URL = '/products';

export async function getProducts() {
  return await apiRequest('/products');
}

export async function createProduct(product) {
  return await apiRequest(API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  return await apiRequest(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  await apiRequestDelete(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function getProductById(id) {
  return await apiRequest(`${API_URL}/${id}`);
}
