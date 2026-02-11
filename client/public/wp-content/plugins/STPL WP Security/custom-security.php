<?php
/*
Plugin Name: STPL WP Security
Plugin URI: 
Description: Security enhancements — hides WP version, disables RSS feeds, removes version strings, and redirects feed requests.
Version: 1.0
Author: Mahima Negi
Author URI: 
License: 
*/

// Hide WordPress version
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');

// Remove version from scripts and styles
function cs_remove_wp_version_strings($src) {
    if (strpos($src, 'ver=') !== false) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('script_loader_src', 'cs_remove_wp_version_strings', 9999);
add_filter('style_loader_src', 'cs_remove_wp_version_strings', 9999);

// Disable RSS feeds
function cs_disable_feeds() {
    wp_die(__('No feed available, please visit the homepage.'));
}
add_action('do_feed', 'cs_disable_feeds', 1);
add_action('do_feed_rdf', 'cs_disable_feeds', 1);
add_action('do_feed_rss', 'cs_disable_feeds', 1);
add_action('do_feed_rss2', 'cs_disable_feeds', 1);
add_action('do_feed_atom', 'cs_disable_feeds', 1);

// Redirect feeds to homepage
function cs_redirect_feed_to_home() {
    if (is_feed()) {
        wp_redirect(home_url(), 301);
        exit;
    }
}
add_action('template_redirect', 'cs_redirect_feed_to_home');

// Disable XML
add_filter('xmlrpc_enabled', '__return_false');
remove_action('wp_head', 'rsd_link');