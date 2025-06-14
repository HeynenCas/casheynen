<?php

/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 */

namespace App;

use Timber\Timber;

$context = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

Timber::render(array( 'pages/page-' . $timber_post->post_name . '.twig', 'templates/page.twig' ), $context);
