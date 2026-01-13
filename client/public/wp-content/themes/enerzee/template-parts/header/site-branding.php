<?php
/**
 * Displays header site branding
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

?>
<div class="site-branding">
	<div class="container">

		<?php the_custom_logo(); ?>

		<div class="site-branding-text">
			<?php if ( is_front_page() ) : ?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php else : ?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php endif; ?>

			<?php
			$description = get_bloginfo( 'description', 'display' );

			if ( $description || is_customize_preview() ) :
			?>
				<p class="site-description"><?php echo esc_html($description); ?></p>
			<?php endif; ?>
		</div><!-- .site-branding-text -->

		<?php if ( ( enerzee_is_frontpage() || ( is_home() && is_front_page() ) ) && ! has_nav_menu( 'top' ) ) : ?>
		<a href="#content" class="menu-scroll-down"><?php echo enerzee_get_svg( array( 'icon' => 'arrow-right' ) ); ?><span class="screen-reader-text"><?php esc_html_e( 'Scroll down to content', 'enerzee' ); ?></span></a>
	<?php endif; ?>

	</div><!-- .container -->
</div><!-- .site-branding -->