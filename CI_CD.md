# CI/CD Pipeline Documentation

## Overview

This project uses GitHub Actions for continuous integration and continuous deployment (CI/CD). The pipeline automatically runs tests, builds, and lints code on every push and pull request.

## Workflows

### 1. Tests Workflow (`.github/workflows/test.yml`)

**Triggers**: 
- On push to `main` or `develop` branches
- On pull requests to `main` or `develop` branches

**What it does**:
- Runs on Node.js 18.x and 20.x (matrix strategy)
- Sets up PostgreSQL database for testing
- Installs dependencies
- Generates Prisma client
- Runs ESLint
- Executes Jest test suite with coverage
- Uploads coverage reports to Codecov
- Posts test results as PR comments

**Key Components**:
```yaml
- Database: PostgreSQL 15 service container
- Node Versions: 18.x, 20.x (tests both LTS versions)
- Test Command: npm test -- --coverage
- Outputs: Coverage reports, PR comments
```

**Expected Results**:
- All 60 tests passing ✅
- Coverage reports generated
- PR receives automated feedback with metrics

### 2. Build Workflow (`.github/workflows/build.yml`)

**Triggers**:
- On push to `main` or `develop` branches
- On pull requests to `main` or `develop` branches

**What it does**:
- Runs on Node.js 18.x and 20.x
- Installs dependencies
- Generates Prisma client
- Type checks with TypeScript
- Builds Next.js application
- Generates build report
- Uploads build artifacts
- Posts build status as PR comment

**Key Components**:
```yaml
- TypeScript Check: npx tsc --noEmit
- Build Command: npm run build
- Artifacts: Uploaded .next/ build directory
- Duration: ~2-3 minutes per Node version
```

**Expected Results**:
- Next.js build succeeds with no errors
- Build artifacts available for download
- Zero TypeScript compilation errors
- PR shows build status

### 3. Lint & Code Quality Workflow (`.github/workflows/lint.yml`)

**Triggers**:
- On push to `main` or `develop` branches
- On pull requests to `main` or `develop` branches

**What it does**:
- Runs on Node.js 20.x (latest LTS)
- Installs dependencies
- Runs ESLint (if configured)
- Type checks with TypeScript
- Runs npm audit for security vulnerabilities
- Posts code quality results as PR comment

**Key Components**:
```yaml
- ESLint: npm run lint (if available)
- TypeScript: npx tsc --noEmit
- Security Audit: npm audit --production
- Continue on Error: Audit+ESLint don't fail the workflow
```

**Expected Results**:
- No TypeScript errors
- Code quality feedback
- Security vulnerability report

## Environment Variables

### Test Workflow
```
DATABASE_URL=postgresql://test_user:test_password@localhost:5432/test_db
NEXTAUTH_SECRET=test-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Build Workflow
```
NEXTAUTH_SECRET=ci-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## PR Feedback

All workflows provide automated feedback on pull requests:

### Test Results
```
## Test Results ✅

| Metric | Coverage |
|--------|----------|
| Statements | 15.8% |
| Branches | 3.79% |
| Functions | 25.64% |
| Lines | 15.92% |

Tests completed successfully on Node 20.x.
```

### Build Status
```
## Build Status ✅

- Status: success
- Node Version: 20.x
- Build Time: 2024-01-15T10:30:45Z
```

### Code Quality
```
## Code Quality Check ✅

- TypeScript: ✓ No errors
- ESLint: Running
- Security: Audited

Ready for review!
```

## Artifacts

### Available Artifacts
- **build-artifacts-node18.x** - Next.js build output for Node 18
- **build-artifacts-node20.x** - Next.js build output for Node 20
- **coverage/** - Jest coverage reports

### Downloading Artifacts
1. Go to Actions tab → Completed workflow run
2. Scroll to "Artifacts" section
3. Download desired artifact (e.g., build-artifacts-node20.x)

## Local Testing

To replicate CI/CD workflow locally:

```bash
# Install dependencies
npm ci

# Generate Prisma client
npx prisma generate

# Run tests with coverage (like CI)
npm test -- --coverage

# Type check
npx tsc --noEmit

# Build Next.js
npm run build

# Run linter
npm run lint
```

## Troubleshooting

### Tests Failing
1. Check test output in GitHub Actions logs
2. Run `npm test -- --verbose` locally
3. Ensure all dependencies installed: `npm ci`
4. Check database connection variables

### Build Failing
1. Check TypeScript errors: `npx tsc --noEmit`
2. Check Next.js build output: `npm run build`
3. Verify all environment variables set

### Linting Issues
1. Run locally: `npm run lint`
2. Auto-fix: `npm run lint -- --fix`
3. Check ESLint configuration in `eslint.config.mjs`

## Best Practices

### For Developers
1. ✅ Always run tests locally before pushing
2. ✅ Check TypeScript: `npx tsc --noEmit`
3. ✅ Run linter: `npm run lint`
4. ✅ Wait for CI/CD to pass before merging
5. ✅ Read PR comments for feedback

### For Code Review
1. ✅ Check that all workflows passed
2. ✅ Review coverage metrics
3. ✅ Verify tests added for new features
4. ✅ Check security audit results

### For Maintenance
1. ✅ Update Node versions as LTS changes
2. ✅ Add new workflows as needed
3. ✅ Monitor coverage trends
4. ✅ Keep dependencies updated

## Security

### Secret Management
- `NEXTAUTH_SECRET` - Set in GitHub Secrets, not committed
- `DATABASE_URL` - Only in test environment
- Use GitHub Secrets for sensitive data

### Vulnerabilities
- `npm audit` runs on every PR
- Production audit: `npm audit --production`
- Review and address warnings

## Coverage Goals

### Current Status
- **validation.ts**: 100% ✅
- **errors.ts**: 42.85% ✅
- **Overall**: 15.8% (threshold: 50%)

### Path to 50% Coverage
1. Add API integration tests
2. Add authentication tests
3. Add logger tests
4. Add database operation tests
5. Aim for coverage >80% long-term

## Performance

### Average Times
- **Tests**: 5-8 seconds
- **Build**: 2-3 minutes
- **Lint**: 30-60 seconds
- **Total PR**: ~5-10 minutes

### Optimization
- Parallel jobs: Tests, Build, Lint run simultaneously
- Node caching: Dependencies cached between runs
- Matrix strategy: Only necessary node versions

## Integration with Development

### GitHub Branch Protection
Consider enabling in repository settings:
- Require status checks to pass before merging
- Require branches to be up-to-date
- Dismiss stale PR approvals

### Continuous Deployment
Current setup is CI only. For CD:
1. Add deployment job to build workflow
2. Deploy to staging on develop branch merge
3. Deploy to production on main branch merge

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js CI/CD Guide](https://nextjs.org/docs/advanced-features/ci-cd)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/latest/)

---

**Last Updated**: 2024
**Status**: Active ✅
**Base Commit**: Initial setup with Phase 2 implementation
