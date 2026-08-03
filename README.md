# thepractice-accrete

Standalone Grav 2 theme for The Practice / Accrete (WordPress port shell).

No Quark inheritance. Page-builder content will use Badger Builder later.

## Drop-in assets (from WordPress)

| Source | Destination |
| --- | --- |
| Compiled CSS | `css/main.css` and/or `css/style.css` (overrides in `css/custom.css`) |
| Fonts | `fonts/` |
| Images / logos | `images/` |
| JS | `js/main.js` (hooks in `js/custom.js`) |

After copying CSS, fix `@font-face` / `url(...)` paths to `../fonts/...` if needed.

## Twig

- Shell: `templates/partials/base.html.twig`
- Chrome stubs: `templates/partials/header.html.twig`, `footer.html.twig`
- Pages: `templates/default.html.twig` → `{{ page.content|raw }}`
- Errors: `templates/error.html.twig`

## Config

- Theme YAML: `thepractice-accrete.yaml`
- Active theme: `user/config/system.yaml` → `pages.theme: thepractice-accrete`
