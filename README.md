# RideOn - Vehicle Rental Platform

A modern vehicle rental platform built with React, TypeScript, and Tailwind CSS.

## Features

- Modern UI with Tailwind CSS
- Type-safe with TypeScript
- Responsive design
- Dark mode support
- Form validation with Zod
- State management with React Context
- API integration with Axios
- Toast notifications
- Authentication system
- Vehicle management
- Booking system
- User profiles
- Admin dashboard

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- React Hook Form
- Zod
- Axios
- Framer Motion
- Lucide Icons
- Radix UI

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── lib/           # Utility functions
  ├── contexts/      # React contexts
  ├── hooks/         # Custom hooks
  ├── types/         # TypeScript types
  ├── styles/        # Global styles
  ├── App.tsx        # Root component
  └── main.tsx       # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## 📂 Folder Details

### `assets/`
Contains static files such as images, SVGs, fonts, and any other media used across the app.

### `components/`
Houses generic, reusable UI components (buttons, modals, inputs, etc.) that are not tied to any specific feature.

### `config/`
Stores configuration files such as environment-specific settings, app-wide constants, or third-party library setups.

### `contexts/`
Provides global state management using React Context API. Each context typically includes a provider, hook, and reducer (if needed).

### `features/`
Organized by business domain. Each subfolder contains components, hooks, and logic specific to that feature.

- `auth/`: Login, signup, user session handling.
- `dashboard/`: Main app interface after authentication.

### `hooks/`
Custom hooks that encapsulate reusable logic, such as `useDebounce`, `useLocalStorage`, or domain-specific logic.

### `layouts/`
Page structure components that wrap around `pages/`, such as `MainLayout`, `AuthLayout`, or `DashboardLayout`.

### `pages/`
Each component in this directory represents a route in the app. Pages often compose `features`, `components`, and `layouts`.

### `services/`
Abstraction layer for API calls. Contains API client instances, endpoint definitions, and data transformation logic.

### `store/`
Handles global state management, usually powered by libraries like Redux, Zustand, or Jotai.

### `styles/`
Global SCSS/CSS files, design system tokens (colors, typography), and theme configuration.

### `types/`
Shared TypeScript types and interfaces used across the application. Promotes consistency and type safety.

### `utils/`
General-purpose utility functions such as formatting dates, generating UUIDs, validating inputs, etc.

---

## 📘 Best Practices

- Keep components small, focused, and reusable.
- Avoid deeply nested folder structures unless necessary.
- Use absolute imports (with alias) for cleaner and more readable code.
- Document complex modules with inline comments or README files inside subfolders.

---

This structure is flexible and can be adjusted as the application grows.
