<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">

<head>
  <!-- Required meta tags -->
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <?php
  $enerzee_option = get_option('enerzee_options');

  if (!function_exists('has_site_icon') || !wp_site_icon()) {
    if (!empty($enerzee_option['enerzee_background_favicon']['url'])) { ?>
      <link rel="shortcut icon" href="<?php echo esc_url($enerzee_option['enerzee_background_favicon']['url']); ?>" />
    <?php
    } else {
    ?>
      <!-- <link rel="shortcut icon" href="<?php //echo esc_url(get_template_directory_uri() . '/wp-content/uploads/2025/07/fav-icon.png'); ?>" /> -->
  <?php
    }
  }
  ?>

  <?php wp_head(); ?>
</head>

<body data-spy="scroll" data-offset="80" <?php body_class(); ?>>

  <?php wp_body_open(); ?>

  <?php
  $options = isset($enerzee_option['enerzee_display_loader']) ? $enerzee_option['enerzee_display_loader'] : '';
  if ($options == "yes") {
  ?>
    <!-- loading -->
    <div id="loading">
      <div id="loading-center">
        <?php
        if (!empty($enerzee_option['enerzee_loader_gif']['url'])) {
          $bgurl = $enerzee_option['enerzee_loader_gif']['url'];
        ?>
          <img src="<?php echo esc_url($bgurl); ?>" alt="<?php esc_attr_e('loader', 'enerzee'); ?>">
        <?php
        } else {
          $bgurl = get_template_directory_uri() . '/assets/images/loader.gif';
        ?>
          <img src="<?php echo esc_url($bgurl); ?>" alt="<?php esc_attr_e('loader', 'enerzee'); ?>">
        <?php
        }
        ?>
      </div>
    </div>
    <!-- loading End -->
  <?php
  }
  ?>
  <div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#content"><?php esc_html__('Skip to content', 'enerzee'); ?></a>
    <?php
    get_template_part('template-parts/header/header', 'one');

    if (isset($enerzee_option['display_banner'])) {
      $opt = $enerzee_option['display_banner'];
      if ($opt == "yes") {
        enerzee_display_header();
      }
    } else {
      enerzee_display_header();
    }
    ?>
    <div class="site-content-contain">
      <div id="content" class="site-content">