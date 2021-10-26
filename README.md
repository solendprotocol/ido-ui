# Solend IDO - Frontend

The repo running the [Solend IDO site](https://ido.solend.fi/). This is a fork of the [Parrot IDO site](https://github.com/gopartyparrot/parrot-ido) which itself was modification of the [Mango Token Sale](https://github.com/blockworks-foundation/mango-token-sale) with some improvements.

Changes were mostly stylistic to follow the Solend design system.

# Before running

Update that mainnet addresses on `IDO_ENDPOINTS` in [constants.ts](./src/config/constants.ts) to match the [Solend IDO mainnet addresses](https://docs.solend.fi/protocol/addresses/ido-addresses).

# Serving The UI

The IDO UI is hosted at https://ido.solend.fi/, but if you'd like to server your own UI, a pre-compiled static HTML site is available in `out`. You can use any static web server to serve that content.

For example, to use python's http server:

```
(cd out && python3 -m http.server 8899)
```

Then open http://localhost:8899.

# Development

To start the vue server:

```bash
yarn dev
```

To build for production:

```bash
yarn build
```

## Configuration

The configuration for the available RPCs and IDO pools are in [constants.ts](./src/config/constants.ts)

## Storybook

We use `storybook` to test the different states of the pool

```bash
yarn storybook:dev
```
