<?php
add_filter( 'rwmb_meta_boxes', 'enerzee_meta_boxes' );
function enerzee_meta_boxes( $meta_boxes ) {	

	// Team Member Details In Class
	$meta_boxes[] = array(
		'title'			=> esc_html__( 'Team Member Details','enerzee' ),
		'post_types'	=> 'enerzeeteam',
		'fields'		=> array(
					
			array(
				'id'		=> 'enerzee_team_designation',
				'name'		=> esc_html__( 'Trainer Designation :','enerzee' ),				
				'type'		=> 'text'				
			),
			array(
				'type'	=>'divider',
			),
			array(
				'id'		=> 'enerzee_team_facebook',
				'name'		=> esc_html__( 'Facebook Url :','enerzee' ),				
				'type'		=> 'text'
			),
			array(
				'id'		=> 'enerzee_team_twitter',
				'name'		=> esc_html__( 'Twitter Url :','enerzee' ),				
				'type'		=> 'text'
			),
			array(
				'id'		=> 'enerzee_team_google',
				'name'		=> esc_html__( 'Google Url :','enerzee' ),				
				'type'		=> 'text'
			),
			array(
				'id'		=> 'enerzee_team_github',
				'name'		=> esc_html__( 'Github Url :','enerzee' ),				
				'type'		=> 'text'
			),
			array(
				'id'		=> 'enerzee_team_insta',
				'name'		=> esc_html__( 'Instagram Url :','enerzee' ),				
				'type'		=> 'text'
			),
			
		),
	);
	// Testimonial Member Details In Class
	$meta_boxes[] = array(
		'title'			=> esc_html__( 'Testimonial Member Details','enerzee' ),
		'post_types'	=> 'testimonial',
		'fields'		=> array(
					
			array(
				'id'		=> 'enerzee_testimonial_designation',
				'name'		=> esc_html__( 'Designation :','enerzee' ),				
				'type'		=> 'text'				
			),
		),
	);
	// Portfolio Member Details In Class
	$meta_boxes[] = array(
		'title'			=> esc_html__( 'Portfolio Project Details','enerzee' ),
		'post_types'	=> 'portfolio',
		'fields'		=> array(
					
			array(
				'id'		=> 'portfolio_masonry_image',
				'name'		=> esc_attr__( 'Portfolio Masonry Image :','enerzee' ),				
				'type'		=> 'image_advanced',
				'max_file_uploads' => 1,			
			),
		),
	);
	return $meta_boxes;
}
?>