# Cas Heynen Portfolio

The "_s" for Timber — this is **Casheynen**, a minimal, customizable theme foundation built for performance, flexibility, and developer happiness. It’s a no-fluff starting point designed around Timber and Twig, giving you the freedom to build your site your way.

## Using the theme

1. Activate the **Cas Heynen Portfolio** theme in the WordPress Dashboard under **Appearance → Themes**.

## The `StarterSite` class

Inside **functions.php**, you'll see `new StarterSite();`. This class lives in the **src/** folder. It’s where you add functionality specific to your theme — like custom post types, taxonomies, and filters.

Use this as your home base for extending Timber's capabilities. It's clean, organized, and powered by Composer's [autoloading](https://getcomposer.org/doc/04-schema.md#psr-4) — meaning any new class you add here will be automatically included when needed.

## Theme Structure

Here’s what you’ll find in the **casheynen** theme:

- `assets/` – Your front-end playground: Sass, JS, images, fonts, and SVGs live here.
- `views/` – All your Twig templates. They map 1:1 to the WordPress template hierarchy and are rendered using `Timber::render()`.
- `src/` – Core theme logic. Extend the site, write custom classes, and keep things modular.
- `tests/` – Optional unit testing setup. Remove it if you’re not using PHPUnit.

## Recommended Resources

- 📘 [Twig for Timber Cheatsheet](https://notlaura.com/the-twig-for-timber-cheatsheet/)
- ❤️ [“Timber and Twig Reignited My Love for WordPress”](https://css-tricks.com/timber-and-twig-reignited-my-love-for-wordpress/) on CSS-Tricks
- 🌱 [Sample Timber theme for inspiration](https://github.com/laras126/yuling-theme)
