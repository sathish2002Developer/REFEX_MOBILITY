<?php

/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage enerzee
 * @since 1.0
 * @version 1.4.1
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if (post_password_required()) {
	return;
}
?>
<div id="comments" class="comments-area">
	<?php
	// You can start editing here -- including this comment!
	if (have_comments()) : ?>
		<h4 class="comments-title">
			<?php
			$comments_number = get_comments_number();
			echo esc_html($comments_number);
			?>
			<?php
			if ($comments_number > 1) {
				echo esc_html__('Comments', 'enerzee');
			} else {
				echo esc_html__('Comment', 'enerzee');
			} ?>
		</h4>

		<ol class="commentlist">
			<?php wp_list_comments(array(
				'callback' => 'enerzee_comments',
				'style'      => 'ol',
				'short_ping' => true,
				'avatar_size' => 80,
			));
			?>
		</ol><!-- .commentlist -->

	<?php the_comments_pagination(array(
			'prev_text' => enerzee_get_svg(array('icon' => 'arrow-left')) . '<span class="screen-reader-text">' . esc_html__('Previous', 'enerzee') . '</span>',
			'next_text' => '<span class="screen-reader-text">' . esc_html__('Next', 'enerzee') . '</span>' . enerzee_get_svg(array('icon' => 'arrow-right')),
		));

	endif; // Check for have_comments().

	// If comments are closed and there are comments, let's leave a little note, shall we?
	if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>

		<p class="no-comments"><?php esc_attr_e('Comments are closed.', 'enerzee'); ?></p>
	<?php
	endif;

	comment_form();
	?>
</div><!-- #comments -->