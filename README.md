# Online Bookstore UI

A React and Vite storefront for browsing books, managing a shopping cart, registering and logging in, and previewing checkout. The application communicates with a backend API running on `http://localhost:8080`.

## Features

- Browse books retrieved from the backend
- Add books to a shopping cart
- Increase or decrease item quantities
- View cart totals and item subtotals
- Register a new user account
- Log in and log out
- Require authentication before checkout
- Preview the checkout summary
- Responsive interface with loading and error states

## Tech Stack

- React 19
- React Router DOM 7
- Vite 8
- Vitest and Testing Library
- CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A backend API available at `http://localhost:8080`

The frontend currently expects these API endpoints:

- `GET /books`
- `POST /auth/register`
- `POST /auth/login`

Both authentication requests should accept JSON request bodies. Login credentials are stored in memory and sent using HTTP Basic Authorization when required.

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL shown by Vite, typically `http://localhost:5173`.

Make sure the backend is running on port `8080` before loading books or using authentication.

## Available Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm test` — run the Vitest test suite
- `npm run lint` — run ESLint

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Book catalogue and home page |
| `/login` | User login |
| `/register` | New account registration |
| `/cart` | Shopping cart |
| `/checkout` | Checkout preview; requires login |

## Project Structure

```text
src/
├── components/       # Header, footer, and book card components
├── pages/            # Home, authentication, cart, and checkout pages
├── services/         # Authentication API integration
├── test/             # Vitest setup and component tests
├── App.jsx           # Application routes and shared cart state
├── App.css           # Global application styles
└── main.jsx          # React entry point
```

## Testing

Run all tests with:

```bash
npm test
```

Vitest is configured with a jsdom environment and Testing Library setup.

## Production Build

```bash
npm run build
npm run preview
```

The build output is written to the `dist` directory.
