# Figma ↔ Code token sync (via Tokens Studio)

This repo's `tokens/` folder is structured for **[Tokens Studio for Figma](https://tokens.studio)**, the standard plugin for syncing W3C Design Tokens between Figma variables and code.

```
tokens/
├── $metadata.json            ← Tokens Studio set order
├── $themes.json              ← Tokens Studio theme definitions (Light + Dark)
├── aegisx-tokens.json        ← base + light surfaces (W3C format)
└── aegisx-tokens-dark.json   ← dark surface/text/border overrides
```

Code → Figma keeps designers and devs on the same colour, spacing, and typography values. **Code is the source of truth** — designers pull, never push directly to Figma without a PR back to this repo.

---

## One-time setup

### 1. Install Tokens Studio in Figma

Figma → Plugins → Browse → search **"Tokens Studio for Figma"** → Install.

### 2. Connect to this GitHub repo

In Tokens Studio plugin → Settings → Sync providers → **Add new** → GitHub.

| Field | Value |
|-------|-------|
| Personal Access Token | Create a fine-grained PAT with `repo` read access to `aegisx-platform/aegisx-design-system` |
| Repository | `aegisx-platform/aegisx-design-system` |
| Branch | `main` |
| File path | `tokens` (folder, not a single file) |
| Base path | leave blank |
| Commit message template | `chore(tokens): sync from Figma` |

Hit **Save**. Tokens Studio will pull `$metadata.json`, `$themes.json`, and the two token sets.

### 3. Apply themes to a Figma file

In the plugin → Themes tab → you'll see **AegisX Light** and **AegisX Dark**.

For each Figma file that uses tokens:
1. Click the gear next to a theme → **Manage Figma variables** → create a Variable Collection (e.g. "AegisX") with two modes (Light, Dark).
2. Map each theme's variables into the corresponding mode.
3. From now on, components in Figma use Variables → switching the collection mode toggles light/dark for the whole file.

---

## Daily workflow

### Designers (Figma → Code)

You can edit tokens in Tokens Studio, but **commit them**. Don't keep local-only changes.

1. Edit a token in the plugin (e.g. tweak `color.brand.indigo`).
2. Click **Push to GitHub** → opens a PR with the JSON diff.
3. PR is reviewed by a code owner (`CODEOWNERS` covers `tokens/`).
4. On merge, CI rebuilds the package and the Pages preview site auto-updates.

### Devs (Code → Figma)

1. Edit `tokens/aegisx-tokens.json` (or `aegisx-tokens-dark.json`).
2. Run `pnpm run check:contrast` to verify WCAG AA still holds.
3. Commit → push.
4. In Figma, designers click **Pull from GitHub** in Tokens Studio → Figma variables update across every file using the collection.

### Releasing token changes downstream

`tokens/` is included in the npm package payload (`files` field in `package.json`). Consumer apps that import via Style Dictionary or Tailwind preset will pick up changes on `pnpm update @aegisx-platform/design-system`.

---

## Generating platform-specific tokens

Use [Style Dictionary](https://styledictionary.com/) to transform `tokens/aegisx-tokens.json` into:

| Platform | Output | Style Dictionary preset |
|----------|--------|-------------------------|
| Web (CSS custom props) | `tokens/dist/aegisx.css` | `css/variables` |
| Web (SCSS) | `tokens/dist/_aegisx.scss` | `scss/variables` |
| Web (Tailwind preset) | `tokens/dist/tailwind-preset.js` | custom `js/object` |
| iOS (Swift) | `tokens/dist/AegisXTokens.swift` | `ios-swift/class.swift` |
| Android (XML) | `tokens/dist/colors.xml` | `android/colors` |
| Flutter (Dart) | `tokens/dist/aegisx_tokens.dart` | `flutter/class.dart` |

A starter `style-dictionary.config.cjs` will live under `scripts/` if/when iOS/Android/Flutter consumers come online — open an issue if you need it sooner.

---

## Sync etiquette

- **Atomic PRs.** A token change is its own PR — don't bundle it with unrelated features.
- **Mention impact.** "Bumped `surface.card` to #ffffff" is fine. "Bumped because the new wave of cardiology screens needs a higher-contrast surface" is better — future-you will thank you.
- **Test both modes.** Any change to surface/text/border MUST be paired in `aegisx-tokens-dark.json` (or the dark theme breaks).
- **Don't rename tokens lightly.** A rename is a major-version break for consumers — do it intentionally, document it in `CHANGELOG.md`.

---

## Useful links

- Tokens Studio docs: https://docs.tokens.studio
- W3C Design Tokens spec: https://design-tokens.github.io/community-group/format/
- Style Dictionary: https://styledictionary.com/
- Figma Variables: https://help.figma.com/hc/en-us/articles/15145852043927
