<?php

/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 * @link https://github.com/timber/starter-theme
 */

namespace App;

use Timber\Timber;

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/StarterSite.php';

if (function_exists('acf_add_options_page')) {
    acf_add_options_page();
}

add_filter('timber/context', function ($context) {
    $context['socials'] = get_fields('option');
    return $context;
});

Timber::init();

new StarterSite();
