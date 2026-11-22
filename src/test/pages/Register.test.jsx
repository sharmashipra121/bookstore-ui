import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../pages/Register';
import { registerUser } from '../../services/AuthService';

vi.mock('../../services/AuthService', () => ({
  registerUser: vi.fn()
}));

describe('Register Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render registration form', () => {
    render(<Register />);

    expect(screen.getByText('Create Account')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Register' })).toBeTruthy();

  });

  it('should show error when all fields are empty', () => {
    render(<Register />);

    fireEvent.submit(screen.getByRole('button', { name: 'Register' }).closest('form'));

    expect(screen.getByText('All fields are required')).toBeTruthy();
    expect(registerUser).not.toHaveBeenCalled();

  });

  it('should show error when passwords do not match', () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'Shipra' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'shipra@gmail.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Shipra@123' }
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'Wrong@123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Passwords do not match')).toBeTruthy();
    expect(registerUser).not.toHaveBeenCalled();

  });

  it('should register user successfully', async () => {
    registerUser.mockResolvedValue({
      message: 'Registration successful!'
    });

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'Shipra Sharma' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'shipra@gmail.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Shipra@123' }
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'Shipra@123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        name: 'Shipra Sharma',
        email: 'shipra@gmail.com',
        password: 'Shipra@123'
      });

    });

    expect(
      await screen.findByText('Registration successful!')
    ).toBeTruthy();

  });

  it('should show backend error when registration fails', async () => {
    registerUser.mockRejectedValue(
      new Error('Email is already in use')
    );

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'Shipra' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'shipra@gmail.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'Shipra@123' }
    });

    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'Shipra@123' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(
      await screen.findByText('Email is already in use')
    ).toBeTruthy();

  });

});
