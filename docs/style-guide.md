# Style guide

## Introduction

Make sure that you have `prettier` and `eslint` installed for you editor. This will help you to follow the style guide.

- [Prettier - Code formatter for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Naming conventions

### Variables

- Use camelCase for variable names.
- Use descriptive names for variables.

```javascript
// Bad
const x = 10;

// Good
const age = 10;
```

### Functions

- Use camelCase for function names.
- Use descriptive names for functions.

```javascript
// Bad
function fn() {
  // code
}

// Good
function calculateAge() {
  // code
}
```

### Types

- Use PascalCase for type names.

```javascript
// Bad
type person = {
  name: string,
};

// Good
type Person = {
  name: string,
};
```

### Constants

- Use uppercase for global constants separated by underscores.

```javascript
// Bad
const pi = 3.14;

// Good
const PI = 3.14;
```

### Components

- Use PascalCase for component names.

```javascript
// Bad
const myComponent = () => {
  // code
};

// Good
const MyComponent = () => {
  // code
};
```

- Use `export default (async) function` for page components.

```javascript
// Bad
const MyComponent = () => {
  // code
};

export default MyComponent;

// Good
export default function MyComponent() {
  // code
}
```

- If a component is not a page component, use `export const` for the component.

```javascript
// Bad
export default function MyComponent() {
  // code
}

// Good
export const MyComponent = () => {
  // code
};
```

- Never use `export default` for components that are not page components.
