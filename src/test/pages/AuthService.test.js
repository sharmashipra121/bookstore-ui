import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { registerUser, loginUser, setAuthCredentials, getAuthHeader } from '../../services/AuthService';

describe('Auth Service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should call registration API with correct URL', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Registration successful!'
      })
    });

    await registerUser({
      name: 'Shipra',
      email: 'shipra@gmail.com',
      password: 'Shipra@123'
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/auth/register',
      expect.any(Object)
    );

  });

  it('should use POST method', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Registration successful!'
      })
    });

    await registerUser({
      name: 'Shipra',
      email: 'shipra@gmail.com',
      password: 'Shipra@123'
    });

    expect(fetch.mock.calls[0][1].method).toBe('POST');

  });

  it('should send correct JSON payload', async () => {
    const userData = {
      name: 'Shipra',
      email: 'shipra@gmail.com',
      password: 'Shipra@123'
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: 'Registration successful!'
      })
    });

    await registerUser(userData);

    expect(fetch.mock.calls[0][1].body).toBe(
      JSON.stringify(userData)
    );

  });

  it('should return successful API response', async () => {
    const mockResponse = {
      message: 'Registration successful!'
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const result = await registerUser({
      name: 'Shipra',
      email: 'shipra@gmail.com',
      password: 'Shipra@123'
    });

    expect(result).toEqual(mockResponse);

  });

  it('should throw error when API returns failure response', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        message: 'Email is already in use'
      })
    });

    await expect(
      registerUser({
        name: 'Shipra',
        email: 'shipra@gmail.com',
        password: 'Shipra@123'
      })
    ).rejects.toThrow('Email is already in use');
  });

  it('should call login API with email and password', async () => {
    const mockResponse = {
      message: 'Login Successful'
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    }));

    const result = await loginUser({
      email: 'test@gmail.com',
      password: 'password123'
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/auth/login',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@gmail.com',
          password: 'password123'
        })
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it('should throw error when login API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false
    }));

    await expect(
      loginUser({
        email: 'wrong@gmail.com',
        password: 'wrong123'
      })
    ).rejects.toThrow();
  });

  it('should set authentication credentials', () => {
    setAuthCredentials('test@gmail.com', 'password123');

    expect(getAuthHeader()).toEqual({
      Authorization: `Basic ${btoa('test@gmail.com:password123')}`
    });
  });

});
