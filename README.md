# byob.zone

The home page of **byob.zone**: Build Your Own Bitcoin DAO. It introduces the idea, shows ALPHA DAO (the first DAO built, at https://alpha.byob.zone) and carries short news posts, in English and Italian.

The DAOs themselves run [btc-dao](https://github.com/Bitcoin-DAO/btc-dao), each at its own address. This page holds no keys and has no sign-in; it only links to them.

## News posts

Posts are in `content/news.json`, newest first, each in both languages. A post with `"next": true` is shown as coming up. Edit the file on GitHub and the site rebuilds by itself.

## Building

```
npm install
npm run dev      # local preview
npm run build    # the site in dist/
```

Pushing to `main` builds and publishes the site (`.github/workflows/pages.yml`). Fonts (IBM Plex Sans and Mono) are bundled; the page loads nothing from other sites.
