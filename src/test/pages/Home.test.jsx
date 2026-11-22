
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

describe('Home Component', () => {

  test('should display books fetched from backend API', async () => {

    // Arrange
    const mockBooks = [
      {
        id: 1,
        title: 'Effective Java',
        author: 'Joshua Bloch',
        price: 650,
        stock: 10
      },
      {
        id: 2,
        title: 'Clean Code',
        author: 'Robert Martin',
        price: 700,
        stock: 5
      }
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockBooks
    });

    // Act
    render(<Home />);

    // Assert
    expect(await screen.findByText('Effective Java')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/books'
    );
  });

});
