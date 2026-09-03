# Intention Base — agent guide

Standalone Grav **2.0** theme (WordPress port; no Quark inheritance). Workspace root is this directory only.

## Scope

- Edit **only** files under this theme tree.
- Do **not** change `user/config/`, `user/pages/`, other themes/plugins, or parent `grav-admin/.cursor/`.
- Theme activation and site config: **describe steps for the user**; do not apply them here.

See [`.cursor/rules/scope-intention-base.mdc`](.cursor/rules/scope-intention-base.mdc) and [`docs/cursor-workspaces.md`](docs/cursor-workspaces.md).

## Skills

Standard Twig / CSS / JS / theme `blueprints.yaml` / Badger override work needs **no** Admin Next skill.

If you add `onApi*` hooks, custom Admin Next fields, or `admin-next/` assets in this theme, stop and add/copy the Admin Next skill first (see Badger Builder’s `.cursor/skills/` as a reference). Until then, do not invent Admin Next integration patterns.

## Conventions

### New page template

With **Modern Editor** enabled, every new page template needs a matching blueprint or Admin hangs (ME generates an override that `@extends` the template name).

1. Create `templates/{name}.html.twig`.
2. `{% extends 'partials/base.html.twig' %}`.
3. Override `{% block content %}` (or other blocks from base).
4. Add `blueprints/pages/{name}.yaml` with the same `{name}`.

Minimal blueprint stub:

```yaml
title: My Template
'@extends':
  type: default
  context: blueprints://pages
```

### New theme option (global admin)

1. Add the field to [`blueprints.yaml`](blueprints.yaml) (Global Settings tab / sections).
2. Add a default in [`intention-base.yaml`](intention-base.yaml).
3. Read it in Twig with `theme_var('key')` or `theme_var('nested.key')` — prefer that over `config.theme`.
4. Render conditionally when empty values should stay hidden.

### Assets

- Register CSS/JS in [`intention-base.php`](intention-base.php) via Grav Asset Manager (`theme://` paths).
- Entry CSS is [`css/style.css`](css/style.css); it `@import`s [`css/partials/`](css/partials/). Prefer editing an existing partial over a new top-level file.
- JS: [`js/main.js`](js/main.js). Fonts in `fonts/`, images in `images/`.

### Partials

- Shared chrome → `templates/partials/` (`base`, `header`, `footer`, `metadata`).
- Listing/card snippets live next to the page templates that use them (blog, projects).

### Badger Builder (theme overrides only)

- Panel schemas: `badger-builder/panels/{id}.yaml` (whole-panel replace by `id`).
- Section markup: `badger-builder/templates/sections/{id}.html.twig`.
- Front-end panel CSS belongs in this theme’s CSS, not the plugin, unless the user asks to change the plugin.
- Do **not** edit `user/plugins/badger-builder/` from this workspace.

### PHP

- Theme class: [`intention-base.php`](intention-base.php) (`Grav\Theme\IntentionBase`).
- Prefer Twig + blueprints for presentation/settings; use PHP hooks only when Twig cannot do the job.

## Changelog

After completing a task, prepend two lines to [`.cursor/notes/changelog.md`](.cursor/notes/changelog.md) (date + ≤30-word summary). Do not write to parent `grav-admin/.cursor/notes/changelog.md`.

## Out of scope here

Site theme switch, plugin enablement, page content, Flex directory registration, and Badger plugin code belong in the **grav-admin** integration workspace or Admin UI — not this repo.
