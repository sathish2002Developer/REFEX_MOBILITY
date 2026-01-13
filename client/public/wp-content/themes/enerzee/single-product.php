<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

get_header();

$enerzee_options = get_option('enerzee_options');
$options = $enerzee_options['enerzee_blog_type'];
if ($options == 1) {
?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="container">
				<div class="row">

					<div class="col-lg-12 col-sm-12">

						<?php
						while (have_posts()) : the_post();
							get_template_part('template-parts/post/content', get_post_format());
						endwhile; // End of the loop. 
						?>
					</div>

				</div>
			</div><!-- #primary -->
		</main><!-- #main -->
	</div><!-- .container -->
<?php
}
?>

<?php
if ($options == 2) {
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="container">
				<div class="row">

					<div class="col-lg-8 col-sm-12  mt-5 mt-lg-0">

						<?php
						while (have_posts()) : the_post();
							get_template_part('template-parts/post/content', get_post_format());
						endwhile; // End of the loop. 
						?>
					</div>

				</div>
			</div><!-- #primary -->
		</main><!-- #main -->
	</div><!-- .container -->


<?php
}
?>

<?php
if ($options == 3) {
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="container">

				<div class="row">

					<?php
					while (have_posts()) : the_post();
						get_template_part('template-parts/post/content', get_post_format());
					endwhile; // End of the loop. 
					?>

				</div>

			</div>
		</main>
	</div>

<?php
}

if ($options == '') {
?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<div class="container">

				<div class="row">

					<div class="col-lg-8  col-sm-12">
						<?php
						while (have_posts()) : the_post();
							get_template_part('template-parts/post/content', get_post_format());
						endwhile; // End of the loop. 
						?>
					</div>

				</div>

			</div><!-- #primary -->
		</main><!-- #main -->
	</div><!-- .container -->
<?php
}
?>

<?php get_footer(); ?>