<?php 
if ( ! function_exists( 'enerzee_loop_product_thumbnail' ) ) { 
	function enerzee_loop_product_thumbnail() { 
		global $product;
		if ( ! $product ) {
			return '';
		}
		$gallery    = $product->get_gallery_image_ids();
		$hover_skin = get_theme_mod( 'enerzee_woocommerce_product_hover', 'none' );
		if ( $hover_skin == '0' || count( $gallery ) <= 0 ) {
			echo '<div class="iq-product-image">' . $product->get_image( 'shop_catalog' ) . '</div>';

			return '';
		}
		$image_featured = '<div class="iq-product-image">' . $product->get_image( 'shop_catalog' ) . wp_get_attachment_image( $gallery[0], 'shop_catalog hover_image' ) . '</div>';

		?>
		<div class="iq-product-img-wrap">
			<?php 	echo wp_kses_post($image_featured); 	// images	?>		
		</div>
		<?php
	}
}


if ( ! function_exists( 'enerzee_template_loop_product_thumbnail' ) ) {
	function enerzee_template_loop_product_thumbnail( $size = 'woocommerce_thumbnail', $deprecated1 = 0, $deprecated2 = 0 ) {
		echo enerzee_loop_product_thumbnail();

	}
}

if ( ! function_exists( 'woocommerce_template_loop_product_title' ) ) {

/**
 * Show the product title in the product loop.
 */
function woocommerce_template_loop_product_title() {
	echo '<h3 class="woocommerce-loop-product__title th13">
			<a href="' . esc_url_raw( get_the_permalink() ) . '">' . get_the_title() . '</a>
		  </h3>
		  <div class="price-detail">';
}
}


if ( ! function_exists( 'enerzee_woocommerce_product_loop_image_end' ) ) {
	function enerzee_woocommerce_product_loop_image_end() {
		echo '</div>';
		echo '</div>';
	}
}

if ( ! function_exists( 'enerzee_woocommerce_product_loop_start' ) ) {
	function enerzee_woocommerce_product_loop_start() {
		echo '<a href="' . esc_url_raw( get_the_permalink() ) . '"> <div class="iq-product-block">';
	}
}

if ( ! function_exists( 'enerzee_woocommerce_product_loop_end' ) ) {
	function enerzee_woocommerce_product_loop_end() {
		echo '</a></div>';
	}
}



if ( ! function_exists( 'enerzee_woocommerce_product_loop_action_start' ) ) {
	function enerzee_woocommerce_product_loop_action_start() {
		echo '<div class="iq-product-caption th1">';
	}
}

if ( ! function_exists( 'enerzee_woocommerce_product_loop_action_end' ) ) {
	function enerzee_woocommerce_product_loop_action_end() {
		echo '</div></div>';
	}
}


if ( ! function_exists( 'enerzee_woocommerce_product_loop_caption_end' ) ) {
	function enerzee_woocommerce_product_loop_caption_end() {
		echo '</div>';
	}
}

// single


if ( ! function_exists( 'woocommerce_my_single_title' ) ) {
	function woocommerce_my_single_title() {
		?>
		<h1 itemprop="name" class="iq-product_title entry-title"><span><?php the_title(); ?></span></h1>
		<?php
	}
}


add_action( 'after_setup_theme', 'yourtheme_setup' );
 
function yourtheme_setup() {
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}

add_action('woocommerce_before_main_content', 'energy_woocommerce_output_content_wrapper');
// overwrite existing output content wrapper function
function energy_woocommerce_output_content_wrapper2() {
	echo '<div class="site-content">
			<div id="primary" class="content-area">
				<main id="main" class="site-main">
					<div class="container">
						<div class="row" >
							<div class="col-sm-12" >';
}
add_action('woocommerce_after_main_content', 'energy_woocommerce_output_content_wrapper_end');
function energy_woocommerce_output_content_wrapper_end() {
		echo '				</div><!-- Col -->
						</div><!-- Close Row -->
					</div><!-- Close Container -->
				</main><!-- Close Main -->
			</div><!-- Close Primary -->
		</div><!-- Close site-content -->';
}

function disable_woo_commerce_sidebar() {
	remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10); 
}
add_action('init', 'disable_woo_commerce_sidebar');

if (!function_exists('woocommerce_product_loop_action_start')) {
    function woocommerce_product_loop_action_start()
    {
        echo '<div class="product-caption">';
    }
}

if (!function_exists('woocommerce_product_loop_wishlist_button')) {
    function woocommerce_product_loop_wishlist_button()
    {
        if (defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_add_wishlist_to_loop' )) {
            echo do_shortcode('[yith_wcwl_add_to_wishlist]');
        }
    }
    add_action('woocommerce_after_shop_loop_item', 'woocommerce_product_loop_wishlist_button', -1);
}