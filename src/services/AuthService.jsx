const API_BASE_URL = 'http://localhost:8080';
let authCredentials = null;

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const setAuthCredentials = (email, password) => {
  authCredentials = btoa(`${email}:${password}`);
};

export const getAuthHeader = () => {
  if (!authCredentials) {
    return {};
  }

  return {
    Authorization: `Basic ${authCredentials}`
  };
};

export const clearAuthCredentials = () => {
  authCredentials = null;
};

export const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      ...getAuthHeader()
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return response.json();
};

export const addBookToCart = async (bookId, quantity = 1) => {
  const params = new URLSearchParams({ bookId, quantity });

  const response = await fetch(
    `${API_BASE_URL}/cart/items?${params}`,
    {
      method: 'POST',
      headers: {
        ...getAuthHeader()
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add book to cart');
  }

  return response.json();
};

export const updateCartQuantity = async (bookId, quantity) => {
  const response = await fetch(
    `${API_BASE_URL}/cart/items/${bookId}?quantity=${quantity}`,
    {
      method: 'PUT',
      headers: {
        ...getAuthHeader()
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update cart quantity');
  }

  return response.json();
};

export const removeBookFromCart = async (bookId) => {
  const response = await fetch(
    `${API_BASE_URL}/cart/items/${bookId}`,
    {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to remove book from cart');
  }
};
