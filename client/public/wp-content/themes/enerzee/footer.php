<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */
if (class_exists('ReduxFramework')) {
	$enerzee_option = get_option('enerzee_options'); 
}
?>
</div><!-- #content -->
<!-- Footer start-->
<?php
if(isset($enerzee_option) && $enerzee_option['footer_type'] == "1")
{
	$f_color = esc_attr('iq-over-dark-90','enerzee');
}
elseif(isset($enerzee_option) && $enerzee_option['footer_type'] == "2")
{
	if(isset($enerzee_option['footer_image']['url'])){
		$bgurl = $enerzee_option['footer_image']['url'];
	}
}
else
{
	$footer_class = esc_attr('iq-bg-over','enerzee');
}
?>
<?php
if(isset($enerzee_option) && $enerzee_option['footer_opacity'] == "2")
{
	$op_color = esc_attr('iq-over-dark-90','enerzee');
}
?>
<?php
	$footer_style = esc_attr('footer-one','enerzee');
?>
<footer id="contact" class="<?php echo esc_attr($footer_style); ?> iq-bg-dark <?php if(!empty($f_color)) { echo esc_attr($f_color); } ?> <?php if(!empty($op_color)) { echo esc_attr($op_color); } ?> <?php if(!empty($footer_class)) { echo esc_attr($footer_class); } ?>" <?php if(!empty($bgurl)){ ?> style="background: url(<?php echo esc_url($bgurl); ?> );" <?php } ?>>

	<?php
	$topfooter = isset($enerzee_option) ? $enerzee_option['enerzee_footer_top_display'] : '';
		
	if($topfooter == "yes")
	{
	?>
	<div class="footer-topbar">
				<div class="container">
					<div class="row">
							<?php 
							if( is_active_sidebar( 'footer_top_area' ) ) { ?>
								<div class="col-lg-12 col-md-12 col-sm-12 ">
									<?php dynamic_sidebar( 'footer_top_area' ); ?>
								</div>
							<?php  } ?>
					</div>
				</div>
	</div>
	<?php } ?>

	<?php

		get_template_part( 'template-parts/footer/footer', 'widgets' );

		get_template_part( 'template-parts/footer/site', 'info' );

	?>


</footer>
  <!-- Footer stop-->

    </div><!-- .site-content-contain -->
</div><!-- #page -->
<?php
$enerzee_option = get_option('enerzee_options');
if(isset($enerzee_option['enerzee_back_to_top']))
{
	$options = $enerzee_option['enerzee_back_to_top'];
	if($options == "yes")
	{
	?>
	<!-- === back-to-top === -->
	<div id="back-to-top">
		<a class="top" id="top" href="#top"> <i class="ion-ios-arrow-up"></i> </a>
	</div>
	<!-- === back-to-top End === -->
	<?php
	}
}
else
{
?>
	<!-- === back-to-top === -->
	<div id="back-to-top">
		<a class="top" id="top" href="#top"> <i class="ion-ios-arrow-up"></i> </a>
	</div>
	<!-- === back-to-top End === -->
<?php
}
?>
<?php wp_footer(); ?>



</body>
</html>
