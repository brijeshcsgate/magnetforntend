
# SVG Icon Library

## Overview

This library provides a collection of SVG icons as React components. Each icon is categorized for easy access, and the library includes detailed documentation for each icon, including how to use and import them.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing Icons](#importing-icons)
  - [Using Icons](#using-icons)
- [Adding New Icons](#adding-new-icons)
- [Documentation](#documentation)

## Installation

To get started, ensure that you have the necessary dependencies installed. If you're using Tailwind CSS, make sure it's set up in your project.

```bash
npm install tailwindcss
```

Include Tailwind CSS in your main CSS file:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Importing Icons

To use the icons in your application, you first need to import them from the library. Here’s how you can import individual icons or the entire set of icons:

```tsx
// Import individual icons
import { HomeIcon, SearchIcon } from './components/icons';

// Import all icons
import { icons } from './components/icons';
```

### Using Icons

You can use the icons as React components. They accept `size`, `color`, and any other SVG properties.

#### Example Usage

```tsx
import React from 'react';
import { HomeIcon, SearchIcon } from './components/icons';

const App: React.FC = () => (
  <div className="p-4">
    <h1>My Icon Library</h1>
    <div className="flex space-x-4">
      <HomeIcon size={32} color="blue" />
      <SearchIcon size={32} color="red" />
    </div>
  </div>
);

export default App;
```

## Adding New Icons

To add new icons to the library, follow these steps:

1. **Create an Icon Component**

   Create a new file for your SVG icon component under the appropriate category. For example:

   ```tsx
   // src/components/icons/categories/general/NewIcon.tsx
   import React from 'react';
   import { IconProps } from '../../IconTypes';

   const NewIcon: React.FC<IconProps> = (props) => (
     <svg
       viewBox="0 0 24 24"
       {...props}
     >
       <path d="..." />
     </svg>
   );

   export default NewIcon;
   ```

2. **Update the `IconTypes.ts`**

   Add the new icon name to the relevant type definition:

   ```tsx
   // src/components/icons/IconTypes.ts
   export type GeneralIconName = 'HomeIcon' | 'SearchIcon' | 'NewIcon';
   ```

3. **Update `index.ts`**

   Import and add your new icon to the icons map:

   ```tsx
   // src/components/icons/index.ts
   import NewIcon from './categories/general/NewIcon';

   const icons: IconsMap = {
     general: {
       HomeIcon,
       SearchIcon,
       NewIcon,
     },
     // other categories...
   };

   export { HomeIcon, SearchIcon, NewIcon };
   ```

4. **Update `IconDocumentation.tsx`**

   Make sure the documentation reflects the new icon:

   ```tsx
   // src/components/icons/IconDocumentation.tsx
   // No additional changes needed if the new icon is added to the `icons` map
   ```

## Documentation

The `IconDocumentation` component generates a page with details for each icon, including usage examples and import statements. This documentation is styled with Tailwind CSS and provides a clear overview of each icon's usage.

To view the documentation, use the `IconDocumentation` component in your application:

```tsx
import React from 'react';
import IconDocumentation from './components/icons/IconDocumentation';
import './index.css'; // Ensure this imports your Tailwind CSS

const App: React.FC = () => (
  <div className="container mx-auto p-4">
    <IconDocumentation />
  </div>
);

export default App;
```

## License

This library is open-source and available under the [MIT License](LICENSE).

---
