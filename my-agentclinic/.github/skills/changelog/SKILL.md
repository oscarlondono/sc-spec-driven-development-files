---
name: changelog
description: 'Update CHANGELOG.md before a merge. Use when: updating changelog, recording changes, before merging, pre-merge checklist, summarising commits, changelog entry.'
user-invocable: true
disable-model-invocation: true
---

# Changelog Skill

Maintains `CHANGELOG.md` in the project root. Each entry is grouped by date with bullet points describing what changed. Invoke this manually before merging a branch.

## When to Use

- Before merging any branch into `main`
- When asked to "update the changelog" or "add a changelog entry"

## Procedure

### 1. Check for CHANGELOG.md

Use `file_search` to confirm `CHANGELOG.md` exists at the project root.

- **If it does not exist**: create it (see [template](./assets/changelog-template.md)), then populate it from git history (step 2).
- **If it exists**: proceed to step 2.

### 2. Identify unreleased changes

Run the following to find commits that touched this project since the last recorded date in `CHANGELOG.md`:

```
git log --format="%ad|%s" --date=short -- .
```

Compare the dates returned against the most recent date heading already in `CHANGELOG.md`. Collect every commit whose date is **newer** than the last recorded date (or all commits if the file was just created).

If there are uncommitted working-tree changes (i.e., staged or unstaged edits not yet committed), summarise those as well under today's date.

### 3. Write the entries

- Group commits by date, newest date at the top (below the existing entries).
- Each bullet should be a concise, human-readable description of the change — not a raw commit subject. Rewrite terse commit messages into plain English where needed.
- Use the format:

```markdown
## YYYY-MM-DD

- Short description of change one
- Short description of change two
```

- If multiple commits share the same date, list them all under one heading.
- Do **not** duplicate entries already present in `CHANGELOG.md`.

### 4. Write to CHANGELOG.md

Insert the new date section(s) directly after the `---` separator and any existing entries, keeping newest-first order.

Use `replace_string_in_file` or `multi_replace_string_in_file` to make the edit — do **not** recreate the entire file.

### 5. Confirm

Read back the updated section to confirm the entries are correctly formatted and no existing content was disturbed.
