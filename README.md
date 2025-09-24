# Vehicle Maker

React + TypeScript application for vehicle management.

## Tech Stack

- React 19.1.1 + TypeScript 5.8.3
- Styled Components 6.1.19
- React Router 7.9.1
- ESLint + Prettier (Airbnb standards)
- Vite 7.1.7

## Dependencies Note

Some packages are intentionally downgraded to ensure 100% compatibility with Airbnb naming conventions and ESLint configuration.

## Features Implemented

- Responsive vehicle grid layout (3-column, 350px squares)
- Reusable UI component library (Button, Header, Container)
- TypeScript-safe compound components pattern
- Routing structure for vehicle management
- Global theming with CSS custom properties
- Toast notifications integration

## Getting Started:

````bash
npm install
npm run dev


Available Scripts:
npm run dev - Start development server
npm run build - Build for production
npm run lint - Run ESLint

Code Standards:
Airbnb ESLint configuration
TypeScript strict mode
Prettier code formatting
Compound component patterns
CSS-in-JS with styled-components


## Development Progress

### v0.1.0 - Initial Setup
**Commit:** `feat: Initial project setup with TypeScript and styled component library`
- React + TypeScript + Vite setup
- ESLint/Prettier configuration (Airbnb standards)
- Routing structure implementation
- UI component library foundation

============================================================================================
FIRST COMMIT
Initial setup: React + TypeScript + Vite

Added ESLint/prettier with AirBNB config, styled-components, react-router.
Fixed all naming conventions to match AirBNB standards.

Setup global styles and component library
- CSS custom properties for consistent theming
- Reusable Button, Header, Container components
- Compound component pattern with proper TypeScript types

Added VehicleGrid layout component

Responsive 3-column grid with 350px square cards.
Centered layout with hover effects.

Configured routing structure for vehicle makes/models

All components follow AirBNB naming conventions.
Built passes with zero linting errors (except 2 spreading props) because I used the fallback older versions of everything.
============================================================================================

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
