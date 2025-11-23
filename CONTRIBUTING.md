# Contributing to Expo Supabase Starter

Thank you for your interest in contributing to the Expo Supabase Starter! We welcome contributions from the community to help improve this project.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/expo-supabase-starter.git
    cd expo-supabase-starter
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up environment variables**:
    Copy `.env.example` to `.env` and fill in your Supabase and other API keys.
    ```bash
    cp .env.example .env
    ```

## Development Workflow

1.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  **Run the project**:
    ```bash
    npm start
    # or
    npm run ios
    # or
    npm run android
    ```
3.  **Make your changes**.

## Code Quality

Before submitting a Pull Request, please ensure your code meets our quality standards. We use ESLint and Prettier.

Run the following command to lint, format, and type-check your code:

```bash
npm run all
```

This runs:

- `npm run lint`
- `npm run format`
- `npm run type-check`

## Submitting a Pull Request

1.  **Push your branch** to your fork:
    ```bash
    git push origin feature/my-new-feature
    ```
2.  **Open a Pull Request** against the `main` branch of the original repository.
3.  **Fill out the Pull Request Template** completely.
4.  **Link to any relevant issues**.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
