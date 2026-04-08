# Release Management Guide

## Overview

This document outlines the process for creating, managing, and deploying releases of the software-project.

## Versioning Scheme

We follow [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):

- **MAJOR** (e.g., 1.0.0 → 2.0.0): Breaking changes
- **MINOR** (e.g., 1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (e.g., 1.0.0 → 1.0.1): Bug fixes and patches

### Pre-release Versions

- **Alpha**: `v1.0.0-alpha.1` - Early development version
- **Beta**: `v1.0.0-beta.1` - Feature-complete, testing phase
- **Release Candidate**: `v1.0.0-rc.1` - Final testing before release

## Release Types

### 1. Standard Release (MINOR/PATCH)

**When**: End of sprint, monthly, or when features are ready

**Timeline**:
- 1 day for preparation
- 1 day for testing in staging
- Deploy to production (business hours)

**Release Window**: Weekdays 10 AM - 2 PM UTC

### 2. Major Release

**When**: Significant features, breaking changes, strategic releases

**Process**:
1. Create feature branch from `develop`
2. Develop and test extensively
3. Create release candidate (RC) for testing
4. Announce release timeline to stakeholders
5. Create release notes with migration guide
6. Deploy with monitoring oversight

**Release Window**: Scheduled with stakeholder approval

### 3. Hotfix Release (Emergency)

**When**: Critical bugs, security issues in production

**Emergency Process**:
1. Create hotfix branch from `main`
2. Fix and test immediately
3. Require 2+ senior developer approvals
4. Deploy to production ASAP
5. Backport to `develop` and other branches

**Release Window**: Immediate (any time)

## Release Process

### Step 1: Prepare Release Branch

```bash
# Update from main branch
git checkout main
git pull origin main

# Create release branch
git checkout -b release/v1.0.0
```

### Step 2: Update Version Numbers

Update version in:
- `package.json` - `"version"` field
- Documentation if referencing version

```json
{
  "version": "1.0.0"
}
```

### Step 3: Generate Changelog

Run changelog generation:

```bash
# Using git-cliff (recommended)
git cliff > CHANGELOG_TEMP.md

# Or manually update CHANGELOG.md with:
# - New features added this release
# - Bugs fixed
# - Breaking changes
# - Migration notes (if applicable)
```

**Changelog Format**:
```markdown
## [1.0.0] - 2024-04-08

### Added
- New feature description
- Another feature

### Fixed
- Bug fix description
- Another bug fix

### Changed
- Breaking change description
- Migration: How to migrate

### Deprecated
- Deprecated feature warning

### Security
- Security fix description
```

### Step 4: Run Final Tests

```bash
# Run all tests
npm test -- --coverage

# Run lint checks
npm run lint -- --max-warnings=0

# Build application
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Run security audit
npm audit --audit-level=moderate
```

### Step 5: Create Release PR

```bash
# Commit changes
git add package.json CHANGELOG.md
git commit -m "chore(release): prepare v1.0.0"

# Push release branch
git push origin release/v1.0.0
```

Create Pull Request:
- Base: `main`
- Compare: `release/v1.0.0`
- Title: `Release v1.0.0`
- Description: Include changelog

### Step 6: Code Review & Approval

- [ ] 2+ maintainers approve
- [ ] All CI/CD checks pass
- [ ] Tests passing
- [ ] Security scan clear
- [ ] Changelog reviewed
- [ ] Release notes checked

### Step 7: Merge & Tag Release

```bash
# Merge PR (using squash or regular merge)
git checkout main
git pull origin main

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to trigger release workflow
git push origin v1.0.0

# Delete release branch
git push origin --delete release/v1.0.0
git branch -d release/v1.0.0
```

### Step 8: GitHub Release

The `release.yml` workflow automatically:
- Creates GitHub Release
- Generates release notes
- Uploads build artifacts
- Notifies stakeholders

Manual steps:
1. Review auto-generated release on [Releases](https://github.com/YOUR_ORG/software-project/releases)
2. Add additional notes if needed
3. Mark as pre-release if applicable
4. Publish release

### Step 9: Backport to Develop

```bash
# Backport changes to develop
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop
```

### Step 10: Deploy to Production

After release is published:

1. **Pre-deployment**:
   - Verify all systems operational
   - Check database backups recent
   - Confirm monitoring alerts configured
   - Notify teams of deployment timing

2. **During deployment**:
   - Monitor error rates
   - Watch API latency
   - Check application logs
   - Verify user transactions

3. **Post-deployment**:
   - Run smoke tests
   - Check critical features
   - Monitor metrics for 1 hour
   - Confirm user reports of success

## Release Checklist

Before release to production:

- [ ] Version number updated
- [ ] CHANGELOG.md updated with all changes
- [ ] All tests passing (unit, integration)
- [ ] Code coverage meets minimum (80%)
- [ ] Security scan clean
- [ ] TypeScript type checking passed
- [ ] Linting with zero warnings
- [ ] Build completes successfully
- [ ] PR approved by 2+ reviewers
- [ ] Database migrations tested (if applicable)
- [ ] API backwards compatibility verified
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Release notes written
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented
- [ ] Deployment time scheduled
- [ ] Stakeholders notified

## Hotfix Release Process

For critical production issues:

### Quick Path:
```bash
# Create hotfix from main
git checkout -b hotfix/critical-bug origin/main

# Fix issue
# Test thoroughly
git add .
git commit -m "fix(critical): description"

# Push and create PR immediately
git push origin hotfix/critical-bug

# Require 2+ senior approvals
# Merge to main with tag v1.0.1
# Backport to develop
```

### Approval Requirements:
- [ ] 2+ senior developers approved
- [ ] Tests pass
- [ ] Security review completed
- [ ] Limited scope (only fix, no refactoring)

## Release Communication

### Before Release
- Create announcement in #releases channel
- Include: version, timing, key features
- Share: migration guide (if breaking changes)
- Timeline: 24 hours before deploy

### During Release
- Post updates: "deployment in progress"
- Share: deployment status link
- Monitor: error rates and metrics

### After Release
- Confirm: successful deployment
- Share: final metrics and stats
- Post: thank you to contributors
- Document: lessons learned (if any)

## Rollback Plan

If critical issues discovered after deployment:

```bash
# Find previous good commit
git log --oneline main | head -20

# Revert to previous version
git revert <commit-hash>
git tag v1.0.1-rollback
git push origin v1.0.1-rollback

# Deploy rollback version
# Investigate root cause
# Create hotfix
```

## Tools & Automation

- **Changelog Generation**: git-cliff or Conventional Commits parser
- **GitHub Releases**: Automated via `release.yml` workflow
- **Version Management**: npm version command
- **Git Tags**: Annotated tags for all releases
- **Notifications**: GitHub release notifications + Slack (configured separately)

## Approval Matrix

| Release Type | Required Approvals | Timeline |
|--------------|-------------------|----------|
| Patch (1.0.0 → 1.0.1) | 1 reviewer | 2-4 hours |
| Minor (1.0.0 → 1.1.0) | 2 reviewers | 1 day |
| Major (1.0.0 → 2.0.0) | Product lead + 2 devs | 3-7 days |
| Hotfix (emergency) | 2+ seniors | 15 minutes |

## Metrics & Monitoring

Track for each release:
- Deployment duration
- Error rate change (before/after)
- Customer impact metrics
- Performance metrics
- Rollback rate (if any)
- Time to detect issues
- Time to resolution

## FAQ

**Q: Can we release on weekends?**
A: Only for critical hotfixes with full senior team availability.

**Q: How long do we support previous versions?**
A: Current + 1 previous version get security patches. Older versions are maintenance-only.

**Q: What if tests fail during release?**
A: Stop immediately, investigate, fix, and restart process.

**Q: Do we do blue-green deployments?**
A: Yes, recommended for production. Infrastructure team handles this.

---

## References

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
