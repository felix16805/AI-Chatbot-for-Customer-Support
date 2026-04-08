# Quick Reference - SDLC Essentials

## Daily Development Commands

```bash
# Setup (first time)
npm install
npx prisma generate
npx prisma migrate dev

# Development
npm run dev                    # Start dev server on :3000
npm test:watch               # Run tests continuously
npm run lint -- --fix        # Auto-fix linting issues

# Before committing
npm test -- --coverage       # Verify test coverage
npm run lint                 # Check code style
npx tsc --noEmit            # Check TypeScript errors
```

## Git Workflow

### Creating a Feature
```bash
# Start new work
git checkout develop
git pull origin develop
git checkout -b feature/my-feature-name

# Make changes, commit regularly
git add .
git commit -m "feat(module): describe what you changed"

# Push and create PR
git push origin feature/my-feature-name
# Then open PR on GitHub
```

### Commit Message Format
```
<type>(<scope>): <description>

Types: feat (feature), fix (bug), docs, style, refactor, perf, test, ci, chore
Scope: Which module? (auth, chat, api, etc.)
Description: What changed? (lowercase, no period)

Example: feat(auth): add password reset functionality
```

### PR Checklist (Before submitting)
- [ ] Tests added/updated and passing
- [ ] Code coverage meets 80% minimum
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] No console.log or debug code
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions

## Key Files by Role

### Developer
- [CONTRIBUTING.md](./.github/CONTRIBUTING.md) - How to contribute
- [DEVELOPMENT_ENVIRONMENT_SETUP.md](./DEVELOPMENT_ENVIRONMENT_SETUP.md) - Setup help
- [CODE_REVIEW_STANDARDS.md](./CODE_REVIEW_STANDARDS.md) - Review expectations

### Code Reviewer
- [CODE_REVIEW_STANDARDS.md](./CODE_REVIEW_STANDARDS.md) - What to check
- [SECURITY_POLICY.md](./SECURITY_POLICY.md) - Security verification

### Release Manager
- [RELEASE_MANAGEMENT.md](./RELEASE_MANAGEMENT.md) - Step-by-step release process

### DevOps/Infra
- [CI_CD.md](./CI_CD.md) - Pipeline documentation
- [MONITORING_OBSERVABILITY.md](./MONITORING_OBSERVABILITY.md) - Monitoring setup
- [RELEASE_MANAGEMENT.md](./RELEASE_MANAGEMENT.md) - Deployment procedures

## Code Review Checklist

```
Does it:
□ Follow code style (eslint)
□ Have adequate tests (80%+ coverage)
□ Include documentation
□ Handle errors appropriately
□ Avoid security issues
□ Maintain backward compatibility
□ Include performance considerations
□ Use proper naming conventions
```

## Testing Quick Guide

```bash
# Run all tests
npm test

# Run specific test file
npm test -- validation.test.ts

# Run in watch mode (re-run on changes)
npm test:watch

# Generate coverage report
npm test -- --coverage

# Update snapshots
npm test -- -u

# Required coverage levels
# Overall: 80%
# Statements: 80%
# Branches: 75%
# Functions: 80%
# Lines: 80%
```

## Branch Names

```
feature/     → New features           (feature/user-auth)
fix/         → Bug fixes              (fix/chat-timestamp)
docs/        → Documentation          (docs/api-endpoints)
refactor/    → Code refactoring       (refactor/auth-module)
perf/        → Performance            (perf/cache-optimization)
test/        → Test additions         (test/auth-coverage)
chore/       → Dependencies, tooling  (chore/update-deps)
hotfix/      → Urgent production fix  (hotfix/critical-bug)
```

## Pull Request Labels

- `bug` - Bug fix
- `enhancement` - New feature
- `documentation` - Docs update
- `security` - Security-related
- `dependencies` - Dependency updates
- `performance` - Performance improvement
- `testing` - Test-related
- `good first issue` - Great for new contributors
- `help wanted` - Extra attention needed
- `blocked` - Waiting on something else

## Status Checks Required for Merge

Before PR can merge to `main`:
- ✅ Tests passing (test.yml)
- ✅ Build succeeding (build.yml)
- ✅ Linting passing (lint.yml)
- ✅ 2+ approvals required
- ✅ All conversations resolved

## Emergency Hotfix

```bash
# Critical production bug - FAST PATH
git checkout -b hotfix/critical-bug origin/main
# ... fix bug ...
git commit -m "fix(critical): description"
git push origin hotfix/critical-bug

# Create PR, label as 'critical'
# Needs 2+ senior dev approvals ASAP
# Merge to BOTH main and develop
```

## Common Issues

### "Tests failing"
```bash
npm test -- --verbose    # See detailed errors
npm install              # Reinstall dependencies
npx jest --clearCache    # Clear cache
```

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### "Database connection error"
```bash
# Verify DATABASE_URL in .env.local
# Verify PostgreSQL is running
# Check credentials
npx prisma db push      # Sync schema
```

### "Lint errors"
```bash
npm run lint -- --fix   # Auto-fix most issues
# For remaining issues, follow CONTRIBUTING.md
```

## Version Support

| Phase | Support | Node Version |
|-------|---------|--------------|
| Active | Full | 20.x, 22.x |
| Previous | Security fixes only | 20.x |
| Older | Community only | < 20.x |

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Next.js Docs](https://nextjs.org/docs)
- [Jest Docs](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [OWASP Top 10](https://owasp.org/Top10/)

## Getting Help

| Issue Type | Where | Contact |
|------------|-------|---------|
| Code question | Slack #engineering | @team |
| Security issue | Email | security@company.com |
| Process question | GitHub Discussion | Discussion tab |
| Bug report | GitHub Issue | New Issue button |
| Feature request | GitHub Issue | New Issue button |

## Important Notes

⚠️ **Never commit**:
- API keys or secrets
- Passwords or tokens
- Private configuration
- Debug/log statements

✅ **Always**:
- Write tests for new features
- Update documentation
- Follow branching strategy
- Run lint before committing
- Aim for 80%+ test coverage

🔒 **Security**:
- Validate user inputs
- Sanitize outputs
- Use parameterized queries
- Never log sensitive data
- Report security issues privately

## Release Responsibility

| Stage | Owner | Time |
|-------|-------|------|
| Development | Developers | Sprint duration |
| Testing | QA/Developers | ~1-2 days |
| Review | Tech lead | ~4-24 hours |
| Release | Release manager | On schedule |
| Deployment | DevOps | ~1 hour |
| Monitoring | On-call | 24 hours post-deploy |

---

**Quick Links**:
- 📖 [Full Documentation Index](./README.md)
- 🤝 [Contributing Guide](./.github/CONTRIBUTING.md)
- 🔒 [Security Policy](./SECURITY_POLICY.md)
- 📋 [Code Review Standards](./CODE_REVIEW_STANDARDS.md)
- 🚀 [Release Management](./RELEASE_MANAGEMENT.md)

**Last updated**: 2024-04-08
