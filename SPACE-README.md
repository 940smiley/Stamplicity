# Philately & Collectibles Consolidation Space

Purpose
- Consolidate 17+ repositories into two apps and one shared tools repo to reduce sprawl.
- Keep: Stamplicity (stamps app), RecoveredTreasuresCompanion (companion site).
- Consolidate remaining repos into:
  - Collectibles Hub — non-stamp collectibles and eBay listing flows.
  - Shared Tools — libraries, CI, deployment manifests, ML models, and utilities.

Quick start
- Migration branches: migration/<source-repo-name> created in source repos.
- Target branches: migration/import-<source-repo-name> in the target repos.
- All migrations must include a MIGRATION.md.

Goals
- Preserve history (git subtree/git-filter-repo).
- Require CI before merges.
- Archive old repos with links to new locations.

Contacts
- Maintainers: @940smiley
- Migration owner: @maintainer (fill in)

Next steps
- Complete inventory (branches, last commit, open issues, production URLs)
- Prioritize 1–2 repos for pilot migration