# Vite + React + TypeScript Template with ESLint & Prettier

This template provides a consistent starting point for frontend projects built with Vite, React, and TypeScript. It integrates ESLint and Prettier to enforce code quality and style consistency across multiple development environments.

## Features

- **Vite**: A fast and modern build tool for development.
- **React + TypeScript**: Scaffolding for React projects with TypeScript support.
- **ESLint**: Configured with support for React, TypeScript, and Prettier integration.
- **Prettier**: Ensures consistent code formatting.
- **EditorConfig**: Standardizes indentation, line endings, and other settings across editors.
- **Ready-to-Use Folder Structure**: Simplifies project setup.

## ESLint Configuration

This template includes a robust ESLint setup using the Flat Config format. The configuration supports:

- The latest ECMAScript features (`ecmaVersion: 'latest'`).
- TypeScript linting using `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
- React-specific linting with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- Prettier integration via `eslint-plugin-prettier`, ensuring formatting issues are reported as ESLint errors.
- Pre-configured rules for React and TypeScript development.

## Prettier Configuration

The template includes a `.prettierrc` file with the following settings:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always",
  "printWidth": 80,
  "tabWidth": 2
}
```

Prettier is seamlessly integrated with ESLint, so all formatting issues are reported during linting.

Here's the updated **How to Use** section along with the **Scripts**:

---

## How to Use

1. **Clone the Template**:

   ```bash
   git clone <template-repo-url> my-new-project
   cd my-new-project
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Build the Project**:

   ```bash
   npm run build
   ```

5. **Preview the Production Build**:

   ```bash
   npm run preview
   ```

6. **Lint the Project**:

   ```bash
   npm run lint
   ```

7. **Fix Linting Issues**:

   ```bash
   npm run lint:fix
   ```

8. **Format the Codebase**:

   ```bash
   npm run format
   ```

9. **Check Code Formatting**:

   ```bash
   npm run format:check
   ```

10. **Run Unit Tests**:

    ```bash
    npm run test
    ```

11. **Generate Coverage Reports**:

    ```bash
    npm run test:coverage
    ```

12. **Open Vitest UI**:

    ```bash
    npm run test:ui
    ```

---

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Create a production-ready build.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Lint the codebase using ESLint.
- **`npm run lint:fix`**: Automatically fix linting issues where possible.
- **`npm run format`**: Format the codebase with Prettier.
- **`npm run format:check`**: Check if the codebase is properly formatted.
- **`npm run test`**: Run all unit tests with Vitest.
- **`npm run test:coverage`**: Generate a coverage report for the tests.
- **`npm run test:ui`**: Open the Vitest UI for managing and running tests interactively.
