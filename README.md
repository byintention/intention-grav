# intention-base

Standalone Grav 2 theme for Intention (WordPress port shell).

No Quark inheritance. Page-builder content will use Badger Builder later.

## Drop-in assets (from WordPress)

| Source | Destination |
| --- | --- |
| Compiled CSS | `css/style.css` |
| Fonts | `fonts/` |
| Images / logos | `images/` |
| JS | `js/main.js` |

After copying CSS, fix `@font-face` / `url(...)` paths to `../fonts/...` if needed.

## Twig

- Shell: `templates/partials/base.html.twig`
- Chrome stubs: `templates/partials/header.html.twig`, `footer.html.twig`
- Pages: `templates/default.html.twig` → `{{ page.content|raw }}`
- Errors: `templates/error.html.twig`
- Badger sections: `badger-builder/templates/sections/*.html.twig` (schemas in `badger-builder/panels/`)

## New page templates

With **Modern Editor** enabled, every new page template needs a matching blueprint or Admin hangs when creating/editing that page type (ME generates an override that `@extends` the template name; without a real blueprint that loops forever).

1. Add Twig: `templates/{name}.html.twig`
2. Add blueprint: `blueprints/pages/{name}.yaml` (same `{name}`)

Minimal blueprint stub:

```yaml
title: My Template
'@extends':
  type: default
  context: blueprints://pages
```

Example: `templates/styletest.html.twig` + `blueprints/pages/styletest.yaml`.

## Config

- Theme defaults: `intention-base.yaml` (in this theme folder)
- Site overrides: `user/config/themes/intention-base.yaml`
- Active theme: `user/config/system.yaml` → `pages.theme: intention-base`
