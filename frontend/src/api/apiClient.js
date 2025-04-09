const API_BASE_URL = 'http://localhost:5000/api';
const API_HEADERS = { 'Content-Type': 'application/json' };

const fetchAction = async (path, options) => {
  const newOptions = {
    ...options,
    headers: {
      ...API_HEADERS,
      ...options.headers,
    },
  };
  return await fetch(`${API_BASE_URL}${path}`, newOptions);
};

export async function apiRequest(path, options = {}) {
  try {
    const res = await fetchAction(path, options);
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.statusCode = res.status;
      throw error;
    }

    return data;
  } catch (err) {
    // Re-throw to be caught by custom hook
    throw err;
  }
}

export async function apiRequestDelete(path, options = {}) {
  try {
    const res = await fetchAction(path, options);

    if (!res.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.statusCode = res.status;
      throw error;
    }
  } catch (err) {
    throw err;
  }
}
