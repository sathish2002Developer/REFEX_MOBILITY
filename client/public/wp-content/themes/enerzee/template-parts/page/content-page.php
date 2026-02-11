<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="sf-content">
		<?php
		the_content();

		wp_link_pages(array(
			'before' => '<div class="page-links">' . esc_html__('Pages:', 'enerzee'),
			'after'  => '</div>',
		));
		?>
	</div><!-- .sf-content -->
</article><!-- #post-## -->