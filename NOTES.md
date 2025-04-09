# Stencil Component Library with Framework-Specific Wrappers

When packaging and publishing a Stencil component library with framework-specific wrappers (Angular, React, Vue), it's important to keep the following points in mind:

## Important Notes

### 1. Wrapper Libraries are Published Individually
- Stencil generates **framework-specific wrappers** (Angular, React, Vue) for your components. These wrappers are published as separate packages. For example:
  - `@your-org/chatbot-ui` (core component package)
  - `@your-org/chatbot-ui-angular` (Angular wrapper)
  - `@your-org/chatbot-ui-react` (React wrapper)
  - `@your-org/chatbot-ui-vue` (Vue wrapper)

Each wrapper is a distinct package and needs to be published separately. This allows users of different frameworks to install only the wrapper they need.

### 2. Setting the `componentCorePackage` in Wrapper Output Targets
- In your `stencil.config.ts`, make sure that each wrapper's output target is pointing to the correct core package. For example:
  
  ```ts
  angularOutputTarget({
    componentCorePackage: '@your-org/chatbot-ui',
    ...
  }),
  ```

### 3. Publish Wrapper Libraries to npm Separately
Each wrapper (Angular, React, Vue) needs to be published as a separate npm package. You should navigate to the specific wrapper directory and run npm publish for each one. For example:

Publish Angular wrapper:
```bash
cd angular-output/chatbot-ui-angular
npm publish --access public
```

Publish React wrapper:
```bash
cd react-output/chatbot-ui-react
npm publish --access public
```

Publish Vue wrapper:
```bash
cd vue-output/chatbot-ui-vue
npm publish --access public
```

### 4. Using Proper Scopes
If you're using scopes for your packages (e.g., `@your-org/chatbot-ui`), make sure each wrapper follows the same naming convention. For example:

- `@your-org/chatbot-ui` (core library)
- `@your-org/chatbot-ui-angular` (Angular wrapper)
- `@your-org/chatbot-ui-react` (React wrapper)
- `@your-org/chatbot-ui-vue` (Vue wrapper)

If you are not using a scope, ensure the naming consistency like `chatbot-ui` and its wrappers.

### 5. Versioning
The core component package (`@your-org/chatbot-ui`) and its wrappers need to be versioned appropriately. If you update the core library, the wrappers should be updated with the new version and published separately.

### 6. Documentation for Each Wrapper
It's important to document each wrapper so that users know how to integrate your components with their respective frameworks (Angular, React, Vue). Ensure you provide clear installation and usage instructions for each wrapper package.

### 7. Handling Dependencies
Make sure that each wrapper package lists the correct dependencies in its package.json file, such as react, @angular/core, or vue. For example, the React wrapper would need to list react and react-dom as dependencies.

### 8. Publishing Best Practices
- Test your component and wrapper library thoroughly before publishing. You can use `npm pack` to generate a .tgz file of your package and test it locally.
- Use semantic versioning (e.g., 1.0.0, 1.1.0, 2.0.0) for each package to indicate breaking changes, new features, or bug fixes.

## Example Folder Structure After Generating Wrappers
After you run `stencil build`, your folder structure might look something like this:
```
chatbot-ui/
│
├── dist/
│   ├── components/
│   ├── chatbot/
│   ├── collection/
│   └── ...
├── loader/
│   └── index.js
├── angular-output/
│   └── chatbot-ui-angular/
│       ├── src/
│       │   └── generated/
│       └── package.json
├── react-output/
│   └── chatbot-ui-react/
│       ├── src/
│       │   └── components.ts
│       └── package.json
├── vue-output/
│   └── chatbot-ui-vue/
│       ├── src/
│       │   └── components.ts
│       └── package.json
└── package.json
```

## Summary of the Publishing Process for Framework Wrappers

**Core Library:**
- Publish your core Stencil component package (`@your-org/chatbot-ui`).

**Framework-Specific Wrappers:**
- Angular: Publish the Angular wrapper (`@your-org/chatbot-ui-angular`).
- React: Publish the React wrapper (`@your-org/chatbot-ui-react`).
- Vue: Publish the Vue wrapper (`@your-org/chatbot-ui-vue`).