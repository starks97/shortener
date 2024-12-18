# Shortener

A custom URL shortener built with Rust for the backend and Remix for the frontend. This application provides a secure and efficient system for creating shortened URLs, managing user sessions with a refresh token mechanism, and offering a user-friendly interface.

## Key Features

- **Backend (Rust):**
  - High-performance, secure endpoints for creating, retrieving, and managing shortened URLs.
  - Custom refresh token system to securely authenticate users.
  - CRUD endpoints for all necessary user and URL operations.

- **Frontend (Remix + TypeScript):**
  - Built with Remix for seamless server-side rendering and client-side interactivity.
  - Dynamic forms leveraging Zod for type-safe validation, ensuring minimal external dependencies.
  - A custom proxy setup bridging client and server communication effortlessly.
  - A custom dynamic fetcher utility, intelligently switching between server and client contexts.
  - Native HTML `<dialog>` modals for a clean, accessible user interface.
  - Integrated QR code generation for easily sharing shortened URLs with others.

## Why This Stack?

- **Rust for Security and Performance:**
  The backend is designed in Rust, ensuring robust security and reliable performance. Rust’s strong type system and memory safety guarantees help reduce runtime errors and vulnerabilities.

- **Remix for Developer Experience:**
  With Remix, you get server-side rendering out of the box, reducing complexity and improving load times. Coupled with TypeScript, it offers a fully typed environment that enhances developer productivity and code quality.

- **Minimized Dependencies, Maximized Efficiency:**
  By leveraging TypeScript and a carefully chosen set of tools, this project avoids bloated dependencies. Instead, it relies on native web APIs and built-in features, keeping the bundle lightweight and the performance high.

## Getting Started

1. **Backend Setup (Rust):**
   Follow the instructions in the `backend/` directory to install dependencies, build, and run the backend service.

2. **Frontend Setup (Remix + TypeScript):**
   In the `web/` directory, install the required dependencies, run the development server, and start exploring the interface.

3. **Configuration:**
   Update environment variables and configuration files as needed to ensure proper communication between backend and frontend, as well as secure user authentication.
