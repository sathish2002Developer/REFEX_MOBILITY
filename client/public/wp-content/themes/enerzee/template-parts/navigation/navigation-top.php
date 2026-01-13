<?php
/**
 * Displays top navigation
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

?>
<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'enerzee' ); ?>">
	<button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
		<?php
		echo enerzee_get_svg( array( 'icon' => 'bars' ) );
		echo enerzee_get_svg( array( 'icon' => 'close' ) );
		esc_attr_e( 'Menu', 'enerzee' );
		?>
	</button>

	<?php wp_nav_menu( array(
		'theme_location' => 'top',
		'menu_id'        => 'top-menu',
	) ); ?>

	<?php if ( ( enerzee_is_frontpage() || ( is_home() && is_front_page() ) ) && has_custom_header() ) : ?>
		<a href="#content" class="menu-scroll-down"><?php echo enerzee_get_svg( array( 'icon' => 'arrow-right' ) ); ?><span class="screen-reader-text"><?php esc_html_e( 'Scroll down to content', 'enerzee' ); ?></span></a>
	<?php endif; ?>
</nav><!-- #site-navigation -->