const BASE_URL = 'http://localhost:5000';
const API_URL = `${BASE_URL}/api/products`;
const API_HEADERS = { 'Content-Type': 'application/json' };

export async function getProducts() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createProduct(product) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify(product),
  });
  return await res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: API_HEADERS,
    body: JSON.stringify(product),
  });
  return await res.json();
}

export async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}
