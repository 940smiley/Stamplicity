## Migration PR: {{source-repo-name}} → {{target-repo-name}}

### Summary
- Source repo: {{source-repo-name}} (link)
- Target repo/path: {{target-repo-name}}/packages/{{source-repo-name}}
- Migration branch (source): migration/{{source-repo-name}}
- Migration branch (target): migration/import-{{source-repo-name}}

### Files moved
- List of moved files and directories (paths in source → new paths)

### Tests run
- Unit tests: command, results
- Integration tests: command, results
- Manual smoke tests: steps & results

### CI
- Which workflows were executed: list

### Rollback Plan
- Steps to revert merge if needed (example)
  - git checkout main
  - git revert -m 1 <merge-commit-sha> OR restore from pre-migration-{{source-repo-name}} branch

### Migration Commands (copy/paste)
- Example commands used to preserve history (include exact commands used)
  - git remote add source https://github.com/...
  - git fetch source
  - git subtree add --prefix=packages/{{source-repo-name}} source/main

### Checklist
- [ ] MIGRATION.md present in target repo under packages/{{source-repo-name}}/
- [ ] Tests passing in CI
- [ ] Owner/Reviewer signoff
- [ ] Update target README / CHANGELOG
- [ ] Archive source repo with link to new location

### Reviewer notes
- Anything the reviewer should be aware of (third-party keys, env vars, DB migrations)