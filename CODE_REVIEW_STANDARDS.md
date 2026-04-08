# Code Review Standards

## Purpose

Code reviews ensure code quality, knowledge sharing, security, and consistency. Every change must be reviewed before merging.

## Review Principles

1. **Trust**: Assume good intent; reviewers and authors work toward shared goals
2. **Clarity**: Be specific and kind in feedback
3. **Learning**: Reviews are opportunities to learn and improve
4. **Efficiency**: Keep reviews focused and timely
5. **Consistency**: Apply standards uniformly

## Who Can Review?

### Required Reviewers (for `main` branch)
- Minimum 2 approval from: senior developers, team leads, or code owners
- At least 1 must be from a different team/area (if applicable)

### Required Reviewers (for `develop` branch)  
- Minimum 1 approval from: senior developers or team leads

### Recommended Reviewers
- Domain experts for specific features
- Security team (for security-related changes)
- DevOps/Infrastructure (for deployment/infrastructure changes)

## Review Checklist

Reviewers should verify:

### Code Quality
- [ ] Code is readable and well-structured
- [ ] Naming is clear and consistent
- [ ] Functions are focused and not too complex
- [ ] Duplicated code has been refactored
- [ ] No commented-out code blocks

### Standards & Consistency
- [ ] Follows ESLint configuration
- [ ] Follows project naming conventions
- [ ] Uses project patterns (not introducing new patterns)
- [ ] Consistent with project style
- [ ] TypeScript types are used correctly

### Functionality
- [ ] Code solves the described problem
- [ ] No logic errors apparent
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No infinite loops or obvious performance issues

### Testing
- [ ] Tests are included for new functionality
- [ ] Tests are comprehensive and meaningful
- [ ] Test coverage meets minimum (80%)
- [ ] No console.log or debug statements
- [ ] Tests can be run locally and pass

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Proper authentication/authorization
- [ ] Dependencies are secure (no known CVEs)

### Performance
- [ ] No obvious performance degradation
- [ ] Database queries are optimized
- [ ] API responses are within SLA (< 200ms)
- [ ] Large assets are optimized
- [ ] No memory leaks in logic

### Documentation
- [ ] Code comments explain "why", not "what"
- [ ] JSDoc comments for public APIs
- [ ] Complex algorithms have explanations
- [ ] README/docs updated if needed
- [ ] Breaking changes documented
- [ ] Migration guide included (if applicable)

### Database (if applicable)
- [ ] Migrations are included
- [ ] Schema changes are backward compatible
- [ ] Indexes added for new queries
- [ ] Data loss prevented
- [ ] Rollback plan documented

### API Changes (if applicable)
- [ ] API specification updated
- [ ] Backward compatibility maintained
- [ ] Deprecation notices added
- [ ] Examples updated
- [ ] Tests cover new endpoints

## Review Process

### 1. Author Submits PR

Create PR with:
- Clear, descriptive title
- Detailed description of changes
- Link to related issues
- Screenshots (if applicable)
- Testing notes

### 2. Automated Checks

CircleCI/GitHub Actions must pass:
- ✅ Tests passing
- ✅ Linting passed
- ✅ No security issues
- ✅ Coverage meets threshold
- ✅ Build succeeds

### 3. Reviewers Examine Code

Reviewers should:
- Read the PR description twice
- Check out the branch locally
- Run tests locally
- Review code changes systematically
- Test new functionality manually (if UI-related)

### 4. Provide Feedback

#### Use Correct Comment Types

- **Comment**: Suggestion or question (not blocking)
- **Request Changes**: Code must be updated before merge (blocking)
- **Approve**: Ready to merge (or with minor comments)

#### Feedback Tone
```
✅ Good: "Could you add a check for null values here?"
❌ Bad: "This is wrong, you didn't handle null values"

✅ Good: "I'd suggest using a Map instead of an object here for performance"
❌ Bad: "This is inefficient code"

✅ Good: "Can you add a test for this edge case?"
❌ Bad: "You forgot tests again"
```

### 5. Example Feedback

**Commenting on Code**:
```
I notice this query doesn't have an index. Could you add one for the created_at field to improve performance?

Suggestion: Add `CREATE INDEX idx_users_created_at ON users(created_at);`
```

**Approving with Minor Issues**:
```
Looks great! Small suggestions:
1. Add a comment explaining the complex regex
2. Consider extracting the validation logic to a separate function

Feel free to address these in a follow-up if you prefer.
```

### 6. Author Responds

Author should:
- Address every comment
- Push fixes for code review items
- Add new comments for major changes
- Don't dismiss concerns without discussion
- Reach out if feedback is unclear

### 7. Approval & Merge

Once approved:
- [ ] All comments resolved
- [ ] All approvals received
- [ ] CI/CD checks passing
- [ ] No conflicts with `main` or `develop`
- [ ] PR rebased on latest
- [ ] Squash or merge as per project policy

## Approval Policies

### When approving, ensure:
- You've actually reviewed the code
- You understand the changes completely
- You're confident in the quality
- You can explain the changes to others

### Don't approve if:
- Unclear what the code does
- Tests don't adequately cover changes
- Security concerns exist
- Breaking changes not documented
- PR description is insufficient

## Review Timeline

- **Target response**: Within 24 hours
- **Critical/Security**: Within 2 hours
- **Large PRs**: May take 2-3 days
- **Weekend/Holiday**: 48 hours is acceptable

If a review is taking too long:
1. Author can add a comment: "Friendly ping 👋"
2. Mention if blocking other work
3. Works both ways - reviewers: communicate if delayed

## Special Cases

### Large or Complex PRs

If PR is very large (>400 lines):
- Split into smaller PRs if possible
- Add extra detailed description
- Provide architectural overview
- Accept longer review time

### Security Reviews

For security-related changes:
- Include security team review
- Explain security reasoning
- Link to security policy
- Test threat scenarios

### Database Migrations

For database changes:
- Include rollback procedure
- Test migration locally
- Verify backup strategy
- Check data loss scenarios
- Performance test on production data size

### Breaking Changes

Must include:
- Clear explanation of why breaking
- Migration guide for users
- Deprecation timeline (if applicable)
- Examples of before/after

## Common Issues & Feedback

### Issue: "This could be refactored"

When useful:
- Code has duplicated logic
- Better pattern available
- Code is hard to understand
- Performance can be improved

When not needed:
- Already shipping to users
- Refactoring not related to PR
- Preference vs. correctness
- Save for separate PR/issue

### Issue: Missing Tests

Always require tests for:
- New features
- Bug fixes
- Security changes
- API changes
- Critical paths

Skip for:
- Documentation
- Comments
- Non-functional changes
- Cosmetic updates

### Issue: Code Style Differences

- Fix if breaking linting rules
- Skip if minor preference
- Update eslint config if needed by many
- Suggest as improvement, not requirement

## Review Tools

- **GitHub**: Native PR review
- **Code Review Extensions**: GitLens, Better Comments
- **Pre-commit Hooks**: Husky (prevent bad commits)
- **Automated Checks**: ESLint, TypeScript, Tests
- **Code Quality**: Codecov, CodeClimate (configured separately)

## Improving Reviews

### For Authors
- Respond to feedback professionally
- Ask for clarification if confused
- Don't take feedback personally
- Be responsive to reviews

### For Reviewers
- Be specific, not vague
- Suggest solutions, not just problems
- Review in timely manner
- Share knowledge and context
- Acknowledge good work

### For Team
- Document decisions in ADRs
- Update standards as needed
- Celebrate learning moments
- Post-mortems for major issues

## Metrics to Track

- Average review time
- Approval rate (first pass vs. revisions)
- Rework cycles per PR
- Security issues caught in review
- Bugs caught in review

## FAQs

**Q: Do I have to address every comment?**
A: Address every "Request Changes" comment. "Comment" and "Approve" can be discussed.

**Q: Can I approve my team member's PR?**
A: If you meet reviewer criteria (senior dev, code owner), yes. Avoid if very familiar code.

**Q: Can I self-approve?**
A: No. Every PR needs independent review.

**Q: What if we disagree on approach?**
A: Discuss respectfully, consider both views, escalate to team lead if needed.

**Q: Can we merge with unresolved comments?**
A: Only if author documents why and team agrees. "Request Changes" must be addressed.

---

**References**:
- [Google's Code Review Philosophy](https://google.github.io/eng-practices/review/)
- [The Art of Code Review](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
