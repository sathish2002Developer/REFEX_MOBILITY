<?php

/**
 * Displays header widgets if assigned
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */
$enerzee_option = get_option('enerzee_options');
$sticky = '';

if (isset($enerzee_option['enerzee_header_sticky']) && $enerzee_option['enerzee_header_sticky'] == "1") {
  $sticky = ' has-sticky';
}
?>
<header class="style-one <?php echo esc_attr($sticky); ?>" id="main-header">

  <div class="container main-header">
    <div class="row">
      <div class="col-sm-12">
        <nav class="navbar navbar-expand-lg navbar-light">
          <?php
          if (isset($enerzee_option['header_radio'])) {
            if ($enerzee_option['header_radio'] == 1) {
          ?>
              <a href="<?php echo esc_url(home_url('/')); ?>">
                <?php
                if (!empty($enerzee_option['header_text'])) {
                ?>
                  <h1 class="logo-text"><?php echo esc_attr($enerzee_option['header_text']); ?></h1>
                <?php
                }
                ?>
              </a>
            <?php
            } else {
            ?>
              
                <?php
                if (isset($enerzee_option['enerzee_logo']['url'])) {
                  $logo = $enerzee_option['enerzee_logo']['url'];

                ?>
                <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>">
                  <img class="img-fluid logo" src="<?php echo esc_url($logo); ?>" alt="<?php esc_attr_e('enerzee', 'enerzee'); ?>">
                </a>
              <?php
                }
              }
            } else {
              ?>
              <a class="navbar-brand" href="<?php echo esc_url(home_url('/')); ?>">
              <img class="img-fluid logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="<?php esc_attr_e('enerzee', 'enerzee'); ?>">
            <?php } ?>
              </a>
              <?php
              ?>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"><i class="ion-navicon"></i></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <?php if (has_nav_menu('top')) : ?>
                  <?php wp_nav_menu(array(
                    'theme_location' => 'top',
                    'menu_class'     => 'navbar-nav ml-auto',
                    'menu_id'        => 'top-menu',
                    'container_id'   => 'iq-menu-container',
                  )); ?>
                <?php endif; ?>
              </div>
              <div class="sub-main">
                <ul class="shop_list">
                  <?php
                  if (isset($enerzee_option['header_display_search'])) {
                    $options = $enerzee_option['header_display_search'];
                    if ($options == "yes") {
                  ?>
                      <li>
                        <div class="search_count">
                          <a href="#" id="btn-search"><i class="fa fa-search" aria-hidden="true"></i></a>
                          <div class="search">
                            <button id="btn-search-close" class="btn btn--search-close" aria-label="Close search form">
                              <i class="ion-close-round" aria-hidden="true"></i>
                            </button>
                            <?php get_search_form(); ?>
                          </div>
                        </div>
                      </li>
                    <?php
                    }
                  } else {
                    ?>
                    <li>
                      <div class="search_count">
                        <a href="#" id="btn-search"><i class="fa fa-search" aria-hidden="true"></i></a>
                        <div class="search">
                          <button id="btn-search-close" class="btn btn--search-close" aria-label="Close search form">
                            <i class="ion-close-round" aria-hidden="true"></i>
                          </button>
                          <?php get_search_form(); ?>
                        </div>
                      </div>
                    </li>
                  <?php
                  }
                  ?>
                  <?php
                  if (class_exists('WooCommerce')) {
                  ?>
                    <?php
                    if (function_exists('YITH_WCWL') && isset($enerzee_option['header_display_shop']) && $enerzee_option['header_display_shop'] == 'yes') {
                      $wish_url = '';
                      if (isset($enerzee_option['wishlist_link']) && !empty($enerzee_option['wishlist_link'])) {
                        $wish_url = get_page_link($enerzee_option['wishlist_link']);
                      }
                    ?>
                      <li class="wishlist-btn">
                        <div class="wishlist_count">
                          <?php $wishlist_count = YITH_WCWL()->count_products(); ?>
                          <a href="<?php echo esc_url($wish_url); ?>">
                            <i class="fa fa-heart"></i>
                            <span class="wcount"><?php echo esc_html($wishlist_count); ?></span>
                          </a>
                        </div>
                      </li>

                    <?php } ?>

                    <!-- mini cart -->
                    <?php

                    if (isset($enerzee_option['header_display_shop'])) {
                      $options = $enerzee_option['header_display_shop'];
                      if ($options == "yes") { ?>
                        <li class="cart-btn">
                          <div class="cart_count">
                            <a class="parents mini-cart-count" href="<?php echo wc_get_cart_url(); ?>">
                              <i class="fa fa-shopping-cart"></i>
                              <span id="mini-cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
                            </a>
                          </div>
                        </li>

                  <?php
                      }
                    }
                  } ?>

                  <?php
                  if (isset($enerzee_option['header_display_button'])) {
                    $options = $enerzee_option['header_display_button'];
                    if ($options == "yes") {
                  ?>
                      <?php if ((!empty($enerzee_option['enerzee_download_link'])) && (!empty($enerzee_option['enerzee_download_title']))) {
                        $dlink = $enerzee_option['enerzee_download_link'];
                        $dtitle = $enerzee_option['enerzee_download_title'];
                      ?>
                        <li class="button-btn">
                          <nav aria-label="breadcrumb">
                            <div class="blue-btn button">
                              <a href="<?php echo esc_url($dlink, 'enerzee'); ?>">
                                <?php echo esc_html($dtitle, 'enerzee'); ?>
                              </a>
                            </div>
                          </nav>
                        </li>
                      <?php } ?>
                  <?php
                    }
                  }
                  ?>
                </ul>
              </div>
        </nav>
      </div>
    </div>
  </div>
</header>
<div class="iq-height"></div>
