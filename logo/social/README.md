# AegisX Social Assets

Square avatars, banners, headers, and Open Graph cards for every major
platform. Generated from the source logo + brand background by
`scripts/build-social.mjs` — re-run with `pnpm run assets:social` to
refresh after a brand update.

> Source SVGs are in `src/`. Use the **PNG** files when uploading —
> most social platforms reject SVG.

---

## File index

### GitHub
| File | Size | Where to upload |
|------|------|-----------------|
| `github-org-avatar-400.png` | 400×400 | https://github.com/organizations/aegisx-platform/settings/profile · *Profile picture* |
| `github-social-preview-1280x640.png` | 1280×640 | Each repo → Settings → *Social preview* |
| `github-readme-banner-1200x300.png` | 1200×300 | Embed at the top of `README.md`: `<img src="logo/social/github-readme-banner-1200x300.png">` |

### X / Twitter
| File | Size | Where to upload |
|------|------|-----------------|
| `twitter-profile-400.png` | 400×400 | Profile picture |
| `twitter-header-1500x500.png` | 1500×500 | Profile header |
| `twitter-card-1200x628.png` | 1200×628 | Open Graph (`twitter:image`) when sharing the site |

### LinkedIn
| File | Size | Where to upload |
|------|------|-----------------|
| `linkedin-profile-400.png` | 400×400 | Company logo |
| `linkedin-cover-1584x396.png` | 1584×396 | Company cover |
| `linkedin-share-1200x627.png` | 1200×627 | Post share image / Open Graph |

### Facebook
| File | Size | Where to upload |
|------|------|-----------------|
| `facebook-profile-320.png` | 320×320 | Page profile picture |
| `facebook-cover-820x312.png` | 820×312 | Page cover photo |
| `facebook-share-1200x630.png` | 1200×630 | OG share image |

### YouTube
| File | Size | Where to upload |
|------|------|-----------------|
| `youtube-channel-icon-800.png` | 800×800 | Channel avatar |
| `youtube-banner-2560x1440.png` | 2560×1440 | Channel banner (safe area: centred 1546×423) |

### Slack / Discord
| File | Size | Where to upload |
|------|------|-----------------|
| `slack-workspace-512.png` | 512×512 | Workspace icon |
| `discord-server-512.png` | 512×512 | Server icon |

### Universal
| File | Size | Where to use |
|------|------|--------------|
| `opengraph-1200x630.png` | 1200×630 | `<meta property="og:image">` for any page |

---

## Open Graph snippet

Drop this in your site's `<head>` (replace URLs with your CDN/site path):

```html
<meta property="og:title" content="AegisX Hospital Platform">
<meta property="og:description" content="Enterprise Healthcare Information System Platform">
<meta property="og:image" content="https://aegisx.io/assets/social/opengraph-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://aegisx.io/assets/social/twitter-card-1200x628.png">
```

---

## Regenerating

```bash
pnpm run assets:social
```

Edits the templates in `scripts/build-social.mjs` if you need a new
size or a different tagline. SVG sources are kept in `src/` so a
designer can also tweak them directly and re-export.
