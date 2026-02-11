<?php
global $enerzee_options;
// TGM plugin activation
require_once get_template_directory() . '/inc/tgm/enerzee-required-plugins.php';
// Breadcrumbs
require_once get_template_directory() . '/inc/custom/breadcrumbs.php';
// Demo import
require_once get_template_directory() . '/inc/demo/import.php';
// Header Breadcrumbs
require_once get_template_directory() . '/inc/custom/helper/helper-functions.php';
require_once get_template_directory() . '/inc/custom/enerzee-breadcrumbs.php';
// Comment
require_once get_template_directory() . '/inc/custom/enerzee-comment.php';
// Pagination
require_once get_template_directory() . '/inc/custom/enerzee-pagination.php';
// Widget
require_once get_template_directory() . '/inc/custom/enerzee-widget.php';
// Dynamic Style
if (class_exists('ReduxFramework')) {
	require_once get_template_directory() . '/inc/custom/enerzee-dynamic-style.php';

	require_once get_template_directory() . '/inc/custom/color-style.php';
}

require_once get_template_directory() . '/inc/custom/custom-color.php';

function enerzee_custom_fonts_url()
{
	$fonts_url = '';

	/* Translators: If there are characters in your language that are not

	* supported by poppins, translate this to 'off'. Do not translate
	* into your own language.
	*/
	$lexend = _x('on', 'Lexend Deca font: on or off', 'enerzee');

	/* Translators: If there are characters in your language that are not
	* supported by Open Sans, translate this to 'off'. Do not translate
	* into your own language.
	*/
	$roboto = _x('on', 'Roboto font: on or off', 'enerzee');

	if ('off' !== $lexend || 'off' !== $roboto) {
		$font_families = array();

		if ('off' !== $lexend) {
			$font_families[] = 'Lexend Deca:400';
		}

		if ('off' !== $roboto) {
			$font_families[] = 'Roboto:400,500,700';
		}

		$query_args = array(
			'family' => urlencode(implode('|', $font_families)),
			'subset' => urlencode('latin,latin-ext'),
		);

		$fonts_url = add_query_arg($query_args, '//fonts.googleapis.com/css');
	}

	return esc_url_raw($fonts_url);
}

function enerzee_load_js_css()
{
	$enerzee_option = get_option('enerzee_options');

	/* Custom JS */
	wp_enqueue_script('bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array(), '4.1.3', true);

	wp_enqueue_script('countdown', get_template_directory_uri() . '/assets/js/countdown.js', array(), '1.0', true);

	wp_enqueue_script('appear', get_template_directory_uri() . '/assets/js/appear.js', array(), '1.0', true);

	wp_enqueue_script('jquery-count', get_template_directory_uri() . '/assets/js/jquery.countTo.js', array('jquery'), '1.0', true);

	wp_enqueue_script('jquery-magnific', get_template_directory_uri() . '/assets/js/magnific-popup/jquery.magnific-popup.min.js', array('jquery'), '1.1.0', true);

	wp_enqueue_script('isotope', get_template_directory_uri() . '/assets/js/isotope.pkgd.min.js', array(), '3.0.6', true);

	wp_enqueue_script('owl-carousel', get_template_directory_uri() . '/assets/js/owl.carousel.min.js', array(), '2.3.4', true);

	wp_enqueue_script('popper', get_template_directory_uri() . '/assets/js/popper.min.js', array(), '1.0', true);

	wp_enqueue_script('wow', get_template_directory_uri() . '/assets/js/wow.min.js', array(), '1.3.0', true);

	wp_enqueue_script('slick', get_template_directory_uri() . '/assets/js/slick.min.js', array(), '1.0', true);


	//------------------------------------------------------------------------------
	wp_enqueue_script('wishlist-custom', get_template_directory_uri() . '/woocommerce/assets/enerzee-wishlist.js', array(), '1.0', true);

	//-------------------------------------------------------------------------------
	wp_enqueue_script('enerzee-custom', get_template_directory_uri() . '/assets/js/enerzee-custom.js', array(), '1.0', true);


	/* Custom CSS */
	wp_enqueue_style('enerzee-font', enerzee_custom_fonts_url(), array(), null);

	wp_enqueue_style('bootstrap', get_template_directory_uri() . '/assets/css/bootstrap.min.css', array(), '4.1.3', 'all');

	wp_enqueue_style('ionicons', get_template_directory_uri() . '/assets/css/ionicons.min.css', array(), '2.0.0', 'all');

	wp_enqueue_style('typicon', get_template_directory_uri() . '/assets/css/typicon.min.css', array(), '2.0.0', 'all');

	wp_enqueue_style('flaticon', get_template_directory_uri() . '/assets/css/flaticon.css', array(), '1.0.0', 'all');

	wp_enqueue_style('font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.css', array(), '4.7.0', 'all');

	wp_enqueue_style('magnific-popup', get_template_directory_uri() . '/assets/css/magnific-popup.css', array(), '3.5.2', 'all');

	wp_enqueue_style('owl-carousel', get_template_directory_uri() . '/assets/css/owl.carousel.min.css', array(), '2.3.4', 'all');

	wp_enqueue_style('wow', get_template_directory_uri() . '/assets/css/wow.css', array(), '3.7.0', 'all');

	wp_enqueue_style('slick', get_template_directory_uri() . '/assets/css/slick.css', array(), '1.0', 'all');

	wp_enqueue_style('enerzee-style', get_template_directory_uri() . '/assets/css/enerzee-style.css', array(), '1.0', 'all');

	wp_enqueue_style('enerzee-responsive', get_template_directory_uri() . '/assets/css/enerzee-responsive.css', array(), '1.0', 'all');
}
add_action('wp_enqueue_scripts', 'enerzee_load_js_css');

if (!is_admin()) {
	function enerzee_searchfilter($query)
	{
		if ($query->is_search) {
			$query->set('post_type', array('post', 'portfolio'));
		}
		return $query;
	}
	add_filter('pre_get_posts', 'enerzee_searchfilter');
}



if (!function_exists('enerzee_dynamic_style')) {

	function enerzee_dynamic_style($enerzee_css_array)
	{
		foreach ($enerzee_css_array as $css_part) {
			if (!empty($css_part['value'])) {
				echo esc_attr($css_part['elements']) . "{\n";
				echo esc_attr($css_part['property']) . ":" . esc_attr($css_part['value']) . ";\n";
				echo "}\n\n";
			}
		}
	}
}

// refresh mini cart ------------//
add_filter('woocommerce_add_to_cart_fragments', 'wc_refresh_mini_cart_count');
function wc_refresh_mini_cart_count($fragments)
{
	ob_start(); ?>
	<div id="mini-cart-count">
		<?php echo WC()->cart->get_cart_contents_count(); ?>
	</div>
<?php $fragments['#mini-cart-count'] = ob_get_clean();
	return $fragments;
}

add_filter('woocommerce_add_to_cart_fragments', 'enerzee_refresh_mini_cart_count');
function enerzee_refresh_mini_cart_count($fragments)
{
	ob_start(); ?>
	<div id="mini-cart-count">
		<?php echo WC()->cart->get_cart_contents_count(); ?>
	</div>
	<?php $fragments['#mini-cart-count'] = ob_get_clean();
	return $fragments;
}

// refresh wishlist ------------//
if (defined('YITH_WCWL') && !function_exists('enerzee_yith_wcwl_ajax_update_count')) {
	function enerzee_yith_wcwl_ajax_update_count()
	{
		wp_send_json(array('count' => yith_wcwl_count_all_products()));
	}
	add_action('wp_ajax_yith_wcwl_update_wishlist_count', 'enerzee_yith_wcwl_ajax_update_count');
	add_action('wp_ajax_nopriv_yith_wcwl_update_wishlist_count', 'enerzee_yith_wcwl_ajax_update_count');
}


add_action('admin_notices', 'enerzee_update_plugin_notice', -1);

function enerzee_update_plugin_notice()
{
	// PLugin And Theme Required Version
	$required_iqonic_extension_version = '1.4.2';

	// Plugin And Theme Current Version
	$iqonic_extension_version =  defined('enerzee_TH_ROOT') ? get_plugin_data(enerzee_TH_ROOT . '/index.php')['Version'] : 0;

	if (defined('ELEMENTOR_VERSION') && ELEMENTOR_VERSION > '3.6.0' && $iqonic_extension_version < $required_iqonic_extension_version) {
	?>
		<div class="notice notice-warning enerzee-notice  is-dismissible" id="enerzee_notification_5_0_0">
			<div class="enerzee-notice-main-box d-flex">

				<div class="enerzee-notice-message">
					<h3><?php esc_html_e('Elementor New Update is Out Now!', 'enerzee'); ?>
						<a class="" href="<?php echo esc_url('https://assets.iqonic.design/documentation/wordpress/update-doc/index.html', 'enerzee') ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html__('Check Here - How To Update Plugin', 'enerzee') ?></a>
					</h3>

					<div class="enerzee-notice-message-inner">
						<strong class="text-bold "><?php esc_html_e('Update Theme Required Plugins  ', 'enerzee'); ?></strong>
					</div>

				</div>
			</div>
			<div class="enerzee-notice-cta">
				<button class="enerzee-notice-dismiss enerzee-dismiss-welcome notice-dismiss" data-msg="enerzee_notification_5_0_0"><span class="screen-reader-text"><?php esc_html_e('Dismiss', 'enerzee'); ?></span></button>
			</div>
		</div>
<?php
	}
}

add_action('admin_enqueue_scripts', 'wpdocs_selectively_enqueue_admin_script');

function wpdocs_selectively_enqueue_admin_script()
{
	wp_enqueue_script('admin-custom', get_template_directory_uri() . '/assets/js/admin-custom.min.js', array());
	wp_enqueue_style('admin-custom', get_template_directory_uri() . '/assets/css/admin-custom.min.css');
}
