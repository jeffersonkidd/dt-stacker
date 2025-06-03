# 🪙 Design Token Collection Stack

This library contains 5 design token collections, each as a JSON file in `/tokens/`:

- **core.json**: Base tokens (colors, spacing, etc.)
- **light.json**: Tokens for the light theme
- **dark.json**: Tokens for the dark theme
- **brand.json**: Brand-specific tokens
- **typography.json**: Typography tokens

### Updating Tokens

1. Edit the appropriate JSON file in `/tokens/`.
2. Run `npm run generate` to update derived formats.
3. Commit changes and open a PR for review.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.