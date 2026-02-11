<?php
/**
 * Custom CSS and JS
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * CustomCSSandJS_WarningsPro
 */
class CustomCSSandJS_WarningsPro {

	private $allowed_actions = array(
		'ccjp_dismiss_ccj',
	);

	/**
	 * Constructor
	 */
	public function __construct() {

		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$this->check_custom_css_js();
		add_action( 'wp_ajax_ccjp_dismiss', array( $this, 'notice_dismiss' ) );
	}


	/**
	 * Check if the Simple Custom CSS and JS plugin is installed
	 */
	function check_custom_css_js() {

		if ( get_option( 'ccjp_dismiss_ccj' ) !== false ) {
			return;
		}

		if ( ! file_exists( WP_PLUGIN_DIR . '/custom-css-js/custom-css-js.php' ) ) {
			return;
		}

		add_action( 'admin_notices', array( $this, 'check_ccj_notice' ) );
	}


	/**
	 * Show a warning about Simple Custom CSS and JS plugin
	 */
	function check_ccj_notice() {
		if ( !isset( $_SERVER ) || !isset( $_SERVER['REQUEST_URI'] ) ) {
			return false;
		}
		if ( false === strpos( $_SERVER['REQUEST_URI'], 'plugins' ) && false === strpos( $_SERVER['REQUEST_URI'], 'custom-css-js' ) ) {
			return false;
		}

		$id      = 'ccjp_dismiss_ccj';
		$class   = 'notice notice-warning is-dismissible';
		$message = __( 'You are free to uninstall the free version of the <b>Simple Custom CSS and JS</b> plugin, if you want.', 'custom-css-js-pro' );
		$nonce   = wp_create_nonce( $id );

		printf( '<div class="%1$s" id="%2$s" data-nonce="%3$s"><p>%4$s</p></div>', $class, $id, $nonce, $message );

		$this->dismiss_js( $id );

	}


	/**
	 * Allow the dismiss button to remove the notice
	 */
	function dismiss_js( $slug ) {
		?>
		<script type='text/javascript'>
		jQuery(function($){
			$(document).on( 'click', '#<?php echo $slug; ?> .notice-dismiss', function() {
			var data = {
				action: 'ccjp_dismiss',
				option: '<?php echo $slug; ?>',
				nonce: $(this).parent().data('nonce'),
			};
			$.post(ajaxurl, data, function(response ) {
				$('#<?php echo $slug; ?>').fadeOut('slow');
			});
			});
		});
		</script>
		<?php
	}


	/**
	 * Ajax response for `notice_dismiss` action
	 */
	function notice_dismiss() {

		$option = $_POST['option'];

		if ( ! in_array( $option, $this->allowed_actions ) ) {
			return;
		}

		check_ajax_referer( $option, 'nonce' );

		update_option( $option, 1 );

		wp_die();
	}

}


return new CustomCSSandJS_WarningsPro();
