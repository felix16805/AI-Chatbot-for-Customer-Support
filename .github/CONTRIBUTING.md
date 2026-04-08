# Contributing Guidelines

## Welcome! 👋

Thank you for your interest in contributing to this project. This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions. We're committed to fostering a welcoming environment for all contributors.

## Development Setup

### Prerequisites
- Node.js >= 20.19.0
- npm or yarn
- PostgreSQL 15+
- Redis (for queue system)
- RabbitMQ (optional, for advanced features)

### Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/software-project.git
   cd software-project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local configuration
   ```

4. **Setup Database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Test additions/updates

### 2. Make Your Changes

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

### 3. Testing

Before submitting a PR, ensure all tests pass:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage

# Minimum coverage requirement: 80%
```

### 4. Code Quality

Run linting and type checking:

```bash
# Lint the code
npm run lint

# Fix linting issues automatically
npm run lint -- --fix

# Type check with TypeScript
npx tsc --noEmit
```

### 5. Commit Guidelines

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test additions/updates
- `ci` - CI/CD changes
- `chore` - Dependency updates, tooling changes

**Examples**:
```
feat(auth): add two-factor authentication
fix(chat): resolve message ordering issue
docs(api): update endpoint documentation
test(validation): add email validation tests
```

## Pull Request Process

### Before Submitting

1. **Ensure tests pass**
   ```bash
   npm test -- --coverage
   ```

2. **Ensure code is linted**
   ```bash
   npm run lint -- --fix
   ```

3. **Update documentation** if adding features

4. **Rebase on latest main**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

### Submitting a PR

1. Push your branch to your fork
2. Open a Pull Request with a clear title and description
3. Link related issues using `Closes #123`
4. Wait for CI/CD checks to pass
5. Request review from maintainers
6. Address any review comments

### PR Checklist

- [ ] Branch created from latest `develop` or `main`
- [ ] All tests passing (`npm test`)
- [ ] Code linted (`npm run lint`)
- [ ] No console errors or warnings
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] One feature/fix per PR (unless related)
- [ ] PR description explains the changes

## Code Style Guide

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Example:
```typescript
/**
 * Validates user email format
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### React Components

- Use functional components with hooks
- Export named exports for testing
- Add PropTypes or TypeScript interfaces
- Use meaningful component names

### Example:
```typescript
interface UserCardProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
```

## Testing Requirements

### Test Coverage

- **Minimum overall coverage**: 80%
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Test File Structure

```
lib/
├── myModule.ts
└── __tests__/
    └── myModule.test.ts
```

### Test Example

```typescript
describe('ValidationService', () => {
  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      const result = validateEmail('user@example.com');
      expect(result).toBe(true);
    });

    it('should reject invalid emails', () => {
      const result = validateEmail('invalid-email');
      expect(result).toBe(false);
    });
  });
});
```

## Documentation

- Keep README.md up to date
- Add API documentation for new endpoints
- Document breaking changes
- Include examples for complex features
- Update CHANGELOG.md

## Security

- Never commit secrets (API keys, tokens)
- Use environment variables for sensitive data
- Follow OWASP best practices
- Report security issues privately to maintainers
- Don't publicly disclose vulnerabilities

## Performance Considerations

- Test performance impact of changes
- Avoid unnecessary re-renders in React
- Optimize database queries
- Use caching where appropriate
- Monitor bundle size impact

## Questions?

- Open an issue for questions
- Check existing documentation
- Reach out to maintainers
- Review existing PRs for examples

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing! 🎉
