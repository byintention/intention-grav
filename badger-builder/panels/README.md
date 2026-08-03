# Local YAML panels (Badger Builder)

Panel **schemas** for this theme. Files here override plugin builtins by `id`
(last wins). Commit this folder with the theme so panel definitions travel via git.

Section **Twig** lives beside this folder: `../templates/sections/{id}.html.twig`.

## Override a builtin

Copy a file from `user/plugins/badger-builder/panels/` (e.g. `hero.yaml`), edit
fields, and save here as the same filename/`id`. Clear Grav cache after changes.

## Add a custom panel

1. Add `{id}.yaml` in this folder (`schema`, `id`, `label`, `twig`, `fields`).
2. Add Twig at `badger-builder/templates/sections/{id}.html.twig`.
3. List the id under `enabled_panels` in `user/config/plugins/badger-builder.yaml`
   (plugin Admin checkboxes only list builtins today).
4. `bin/grav cache`

Section **content** still lives in page frontmatter (`header.sections`), not here.
