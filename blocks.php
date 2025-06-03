<?php
/**
 * Template Name: Block page
 */

use Timber\Timber;
use Timber\Post;

$context = Timber::context();
$post = Timber::get_post();
$context['post'] = $post;
$context['is_block_page'] = true;
$context['is_front_page'] = is_front_page();
$context['blocks'] = get_field('blocks');

// Last 3 posts
$latest_posts_args = array(
    'post_type' => 'post',
    'posts_per_page' => 3,
);
$context['latest_posts'] = Timber::get_posts($latest_posts_args);

Timber::render('templates/blocks.twig', $context);