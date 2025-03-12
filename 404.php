<?php

/**
 * The template for the 404 page
 */

namespace App;

use Timber\Timber;

header("HTTP/1.1 301 Moved Permanently");
header("Location: " . get_bloginfo('url'));
exit();

$context = Timber::context();
Timber::render('templates/404.twig', $context);
