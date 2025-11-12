
# YayasanMangroveLestari

## Overview

This project, named YayasanMangroveLestari, aims to [Provide a brief but informative description of the project's purpose - e.g., "promote mangrove conservation efforts through an interactive web platform"]. The application is built using Next.js with TypeScript, leveraging a component-based architecture and utilizing tools like Tailwind CSS for styling.

## Key Features & Benefits

- **Dynamic Content Rendering:**  Fetches and displays data related to the foundation's activities, news, and partnerships.
- **Interactive User Interface:** Provides a user-friendly experience for exploring information about mangrove conservation.
- **Responsive Design:** Ensures optimal viewing experience across various devices.
- **Modular Architecture:** Organized component structure promotes maintainability and scalability.
- **TypeScript Integration:**  Enhances code quality and reduces errors through static typing.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (Recommended version: v18 or later) - [Download Node.js](https://nodejs.org/)
- **npm or Yarn or pnpm or Bun:** Package manager.
- **Git:** For version control.

## Installation & Setup Instructions

Follow these steps to get the project running locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohmanBlue/YayasanMangroveLestari.git
   cd YayasanMangroveLestari
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using Yarn:
   ```bash
   yarn install
   ```

   Using pnpm:
   ```bash
   pnpm install
   ```

   Using Bun:
   ```bash
   bun install
   ```

3. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using Yarn:
   ```bash
   yarn dev
   ```

   Using pnpm:
   ```bash
   pnpm dev
   ```

   Using Bun:
   ```bash
   bun dev
   ```

4. **Access the application:**

   Open your browser and navigate to `http://localhost:3000`.

## Usage Examples & API Documentation

This project primarily focuses on front-end development using React components within the Next.js framework.  There is no dedicated API in this repository.  Data is fetched from local JSON files (`news.json`, `patner.json`, `visi&misi.tsx`, etc.).

Example usage of the `cn` utility function from `lib/utils.ts`:

```typescript
import { cn } from "@/lib/utils"

function MyComponent() {
  return (
    <div className={cn("p-4 rounded-md", "bg-blue-500 text-white")}>
      This is a styled component.
    </div>
  )
}
```

This example demonstrates how to conditionally apply Tailwind CSS classes using the `cn` utility function, combining base classes with component-specific styles.

## Configuration Options

This project's configuration is primarily driven by the Next.js framework and Tailwind CSS. You can customize the following:

- **Tailwind CSS:**  Modify the `tailwind.config.js` file to customize the styling and theme.
- **Environment Variables:**  Add environment variables to the `.env.local` file (if needed for future integrations).
- **Data:**  Modify the JSON files within the `json/` directory to update the content displayed on the website.

## Contributing Guidelines

We welcome contributions to improve this project! Here's how you can contribute:

1. **Fork the repository.**
2. **Create a new branch for your feature or bug fix:**
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes and commit them:**
   ```bash
   git add .
   git commit -m "Add: My new feature"
   ```
4. **Push your changes to your forked repository:**
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Create a pull request to the main repository.**

Please adhere to the following guidelines:

- Write clear and concise commit messages.
- Follow the existing code style.
- Include tests for new features or bug fixes.
- Provide a clear description of your changes in the pull request.

## License Information

This project has no license specified. All rights are reserved by the owner.

## Acknowledgments

This project utilizes the following open-source libraries and frameworks:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
