<?php
/**
 * Template for displaying search forms in enerzee
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

?>
<?php $unique_id = esc_html( uniqid( 'search-form-' ) ); ?>

<form method="get" class="search-form search__form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div class="form-row">
	<input type="search" id="<?php echo esc_attr($unique_id); ?>" class="search-field search__input" name="s" />
	<label for="<?php echo esc_attr($unique_id); ?>"><?php echo esc_html_x( 'Search:', 'label', 'enerzee' ); ?></label>
 <button type="submit" class="search-submit" ><i class="fa fa-search" aria-hidden="true"></i><span class="screen-reader-text"><?php echo esc_html_x( 'Search', 'submit button', 'enerzee' ); ?></span></button> 
</div>
</form>
