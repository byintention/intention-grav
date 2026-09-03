# Cursor workspaces — intention-base + badger-builder

One Grav install (`grav-admin/`), three intentional Cursor contexts. The live site theme is **intention-base**.

## Which folder to open

| Work | Open in Cursor | Scope rules |
|------|----------------|-------------|
| Intention Base theme | `user/themes/intention-base/` | `.cursor/rules/scope-intention-base.mdc` |
| Badger Builder plugin | `user/plugins/badger-builder/` | `.cursor/rules/scope-badger-builder.mdc` |
| Site config, pages, integration | `grav-admin/` (install root) | `.cursor/rules/integration-scope.mdc` |

The UIkit **intention** theme (`user/themes/intention/`) is a separate product with its own harness. Do not treat it as this site’s theme workspace.

## Rules layout

Each product repo is self-contained:

```
intention-base/
  AGENTS.md
  .cursor/
    rules/grav-core.mdc
    rules/scope-intention-base.mdc
    rules/skills.mdc
    rules/changelog.mdc
    notes/changelog.md

badger-builder/
  AGENTS.md
  .cursor/
    rules/grav-core.mdc
    rules/scope-badger-builder.mdc
    rules/conventions.mdc
    rules/skills.mdc
    rules/changelog.mdc
    skills/grav-api-admin-next-integration.md
    skills/grav-api-integration.md
    notes/changelog.md
```

Parent `grav-admin/.cursor/rules/` is **integration-only** (`alwaysApply: false` on grav, skills, changelog). Only `integration-scope.mdc` auto-applies when the workspace root is `grav-admin/`.

## Optional: separate git repos + symlinks

If you split products into their own git repos, symlink them into the Grav install:

```bash
# Example — adjust paths to your clone locations
INTENTION_BASE_REPO=/path/to/intention-base
BADGER_REPO=/path/to/badger-builder
GRAV=/path/to/grav-admin

# Theme
cd "$GRAV/user/themes"
mv intention-base intention-base.bak   # backup if not already a checkout
ln -s "$INTENTION_BASE_REPO" intention-base

# Plugin
cd "$GRAV/user/plugins"
mv badger-builder badger-builder.bak
ln -s "$BADGER_REPO" badger-builder
```

Open each repo path directly in Cursor. Grav loads both from the same install.

**Current status:** theme and plugin live as directories inside the grav-admin tree. Badger Builder has a Gitea remote (`byintention/badgerbuilder`). intention-base has a local git repo.

## What agents must not do

From the **intention-base** workspace:

- Do not edit `user/config/`, `user/pages/`, other themes, or plugins
- Describe activation steps; let the user apply site config

From the **badger-builder** workspace:

- Do not edit theme files or `user/config/`
- Describe plugin enablement steps when needed
