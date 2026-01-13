<?php
/**
 * Displays footer site info
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

?>
<?php $enerzee_option = get_option('enerzee_options'); ?>
<?php
if(isset($enerzee_option['display_copyright']))
{
	$options = $enerzee_option['display_copyright'];
	if($options == "yes")
	{ 
	?>
	<div class="copyright-footer">
		<div class="container">
			<div class="pt-3 pb-3">
				<div class="row justify-content-between">
					
					<div class="col-lg-12 col-md-12  text-md-center text-center">
						<?php
						if(isset($enerzee_option['footer_copyright'])) { ?>
							<span class="copyright">
							<?php echo esc_html($enerzee_option['footer_copyright']); ?>
							</span>
							<?php
						}
						else {	?>
							<span class="copyright">
								<a target="_blank" href="<?php echo esc_url( __( 'https://themeforest.net/user/iqonicthemes/portfolio/', 'enerzee' ) ); ?>"> 
									<?php printf( esc_html__( 'Proudly powered by %s', 'enerzee' ), 'enerzee.' ); ?>
								</a>
							</span>
							<?php
						} ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php
	}
}
else{ 
?>
<div class="copyright-footer">
		<div class="container">
			<div class="pt-3 pb-3">
				<div class="row justify-content-between">
					<div class="col-lg-12 col-md-12  text-md-center text-center">
							<span class="copyright"><a target="_blank" href="<?php echo esc_url( __( 'https://themeforest.net/user/iqonicthemes/portfolio/', 'enerzee' ) ); ?>"> <?php printf( esc_html__( 'Proudly powered by %s', 'enerzee' ), 'enerzee.' ); ?></a></span>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php
}
