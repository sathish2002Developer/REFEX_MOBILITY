<?php

/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

get_header();

$enerzee_option = get_option('enerzee_options');

if (isset($enerzee_option['enerzee_404_banner_image']['url'])) {
	$bgurl = $enerzee_option['enerzee_404_banner_image']['url'];
}
?>
<div <?php if (!empty($bgurl)) { ?> style="background: url(<?php echo esc_url($bgurl); ?> );" <?php } ?>>
	<div class="container">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">
				<div class="error-404 not-found">
					<div class="page-content">
						<div class="row">
							<div class="col-sm-12 text-center">
								<h4>
									<?php
									if (isset($enerzee_option['enerzee_four_description']) && !empty($enerzee_option['enerzee_four_description'])) {
										$four_title = $enerzee_option['enerzee_fourzerofour_title'];
										echo esc_html($four_title);
									} else {
										echo esc_html__('404 Error', 'enerzee');
									}

									?>
								</h4>
								<?php
								if (!empty($enerzee_option['enerzee_404_banner_image']['url'])) { ?>
									<div class="fourzero-image mb-5">
										<img src="<?php echo esc_url($enerzee_option['enerzee_404_banner_image']['url']); ?>" alt="<?php esc_attr_e('404', 'enerzee'); ?>" />
									</div>

								<?php } else { ?>

									<div class="big-text"><?php esc_html_e('404', 'enerzee'); ?></div>

								<?php } ?>

								<h2>
									<?php
									if (isset($enerzee_option['enerzee_four_description']) && !empty($enerzee_option['enerzee_four_description'])) {
										$four_title = $enerzee_option['enerzee_four_description'];
										echo esc_html($four_title);
									} else {
										echo esc_html__('404 Error', 'enerzee');
									}

									?>
								</h2>

								<p class="mb-5">

									<?php
									if (isset($enerzee_option['enerzee_four_description_two']) && !empty($enerzee_option['enerzee_four_description_two'])) {
										$four_des = $enerzee_option['enerzee_four_description_two'];
										echo esc_html($four_des);
									} else {
										echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
									}
									?>
								</p>

								<div class="d-block">
									<a class="button" href="<?php echo esc_url(home_url()); ?>">
										<?php
										if (isset($enerzee_option['enerzee_fourzerofour_button']) && !empty($enerzee_option['enerzee_fourzerofour_button'])) {
											$four_des = $enerzee_option['enerzee_fourzerofour_button'];
											echo esc_html($four_des);
										} else {
										?>
											<?php esc_html_e('Go Back', 'enerzee'); ?>
										<?php
										}
										?>
									</a>
								</div>
							</div>
						</div>
					</div><!-- .page-content -->
				</div><!-- .error-404 -->
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- .container -->
</div>

<?php get_footer();
