let mix = require('laravel-mix');

mix.options({
    processCssUrls: false
});

mix.scripts([
        './js/*.js'
    ],
    './dist/main.js'
);

mix.sass(
    './scss/style.scss',
    './dist/style.css'
);
