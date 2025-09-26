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

SECOND COMMIT
RTK Query + Supabase integration with server-side pagination

Added RTK Query setup with fakeBaseQuery for direct Supabase calls.
Implemented error handling with { data } | { error } return patterns. Error Component will
be added later on. For now the Loading state is fully implemented with a Spinner.

Setup Supabase client integration
- Direct database calls with PostgreSQL error typing
- Server-side pagination with .range() method
- Exact count retrieval for total results, which makes pagination easier.
- cRud

Created vehicle API layer with TypeScript safety
- VehicleMakesResponse and VehicleModelsResponse types
- getVehiclesParams for pagination parameters

Added reusable Pagination component

URL search params integration for state persistence.
Previous/Next navigation with disabled states.
Results display showing "X to Y of Z total" format.

Implemented RTK Query cache management with tagTypes

All functions follow RTK Query compatibility patterns.
TypeScript strict typing maintained throughout.
Zero compilation errors.

Next up the individual Vehicle Items will be displayed and the form for editing the current
ones will be created using React Hook Form.
============================================================================================

THIRD COMMIT

Extended RTK Query with single-item queries
- Added useGetVehicleMakeQuery, useGetVehicleModelByIdQuery, useGetVehicleModelsByMakeQuery

Integrated React Hook Form with template-driven forms
- modelFormTemplate and makeFormTemplate with validation rules
- Dynamic rendering through renderModelInputField and renderMakeInputField
- Strongly typed RegisterOptions for validation compatibility

Created reusable form components
- FormInput and FormSelect using forwardRef for RHF support
- Register prop spreading keeps state connected
- Initial step towards a scalable reusable form system

Implemented MakeEntity and ModelEntity components
- URL param-based switching between make and model forms
- Conditional edit mode with disabled state propagation
- Grid display of related models when viewing Makes

Enhanced validation and error management
- Centralized toast notifications
- Zero TypeScript and ESLint errors

Next up: add RTK Query mutations (create/update/delete) with cache invalidation,
and wire up form submissions with trimming and data formatting. Pagination will be supported
with individual item access

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
