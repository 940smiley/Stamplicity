# Migration notes for REPO-NAME

Source: <https://github.com/940smiley/REPO-NAME>
Target path: packages/REPO-NAME

Date: YYYY-MM-DD
Owner: @owner

## What moved

- List files and directories moved and destination paths

## What remained in source

- e.g. old docs, archives, large binary blobs (explain why retained)

## Commands used (full reproducible commands)

# Example: git subtree method

git remote add REPO_NAME <https://github.com/940smiley/REPO-NAME.git>
git fetch REPO_NAME --tags
git subtree add --prefix=packages/REPO-NAME REPO_NAME/main

# Example: git filter-repo (advanced)

git clone --bare <https://github.com/940smiley/REPO-NAME.git> REPO-NAME.git
cd REPO-NAME.git

# move all files into subdirectory packages/REPO-NAME

git filter-repo --to-subdirectory-filter packages/REPO-NAME
cd ../target-repo
git remote add REPO-NAME ../REPO-NAME.git
git fetch REPO-NAME
git merge --allow-unrelated-histories REPO-NAME/main

## Tests executed

- commands and results

## CI updates

- Any CI workflow modifications (files added/changed) and why

## DB, infra, environment changes

- e.g. env variables required, new secrets, services to create

## Rollback plan

- Step-by-step

## Final status

- [ ] Files moved
- [ ] Tests passing
- [ ] Owner signoff
- [ ] Source repo archived (link)
