<?php	
// Add custom side bar start from here
function enerzee_right_widgets_init() {

	$enerzee_option = get_option('enerzee_options'); 
	$options="";
	if(isset($enerzee_option['footer_one'])){
		$options= $enerzee_option['footer_one'];
	}
	
	$footer_one = '';
	if($options == "1"){ $footer_one = esc_html__('text-left','enerzee'); } 
	if($options == "2"){ $footer_one = esc_html__('text-right','enerzee'); }
	if($options == "3"){ $footer_one = esc_html__('text-center','enerzee'); }
	register_sidebar( array(
		'name'          => esc_html__('Footer Area 1','enerzee'),
		'class'         => 'nav-list',
		'id'            => 'footer_1_sidebar',
		'before_widget' => '<div class="widget '. esc_attr($footer_one).'">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );

	$options="";
	if(isset($enerzee_option['footer_two'])){
		$options= $enerzee_option['footer_two'];
	}
	
	$footer_two ='';
	if($options == "1"){ $footer_two = esc_html__('text-left','enerzee'); } 
	if($options == "2"){ $footer_two = esc_html__('text-right','enerzee'); }
	if($options == "3"){ $footer_two = esc_html__('text-center','enerzee'); }
	register_sidebar( array(
		'name'          => esc_html__('Footer Area 2','enerzee'),
		'class'         => 'nav-list',
		'id'            => 'footer_2_sidebar',
		'before_widget' => '<div class="widget footer-logo '. esc_attr($footer_two).'">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title">',
		'after_title'   => '</h4>',
	) );

	$options="";
	if(isset($enerzee_option['footer_three'])){
		$options= $enerzee_option['footer_three'];
	}
	
	$footer_three ='';
	if($options == "1"){ $footer_three = esc_html__('text-left','enerzee'); } 
	if($options == "2"){ $footer_three = esc_html__('text-right','enerzee'); }
	if($options == "3"){ $footer_three = esc_html__('text-center','enerzee'); }
	register_sidebar( array(
		'name'          => esc_html__('Footer Area 3','enerzee'),
		'class'         => 'nav-list',
		'id'            => 'footer_3_sidebar',
		'before_widget' => '<div class="widget '. esc_attr($footer_three).'">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title iq-rmt-30">',
		'after_title'   => '</h4>',
	) );
	
	$options="";
	if(isset($enerzee_option['footer_fore'])){
		$options= $enerzee_option['footer_fore'];
	}
	$footer_fore ='';
	if($options == "1"){ $footer_fore = esc_html__('text-left','enerzee'); } 
	if($options == "2"){ $footer_fore = esc_html__('text-right','enerzee'); }
	if($options == "3"){ $footer_fore = esc_html__('text-center','enerzee'); }
	register_sidebar( array(
		'name'          => esc_html__('Footer Area 4','enerzee'),
		'class'         => 'nav-list',
		'id'            => 'footer_4_sidebar',
		'before_widget' => '<div class="widget '. esc_attr($footer_fore).'">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title iq-rmt-30">',
		'after_title'   => '</h4>',
	) );

	
	register_sidebar( array(
		'name'          => esc_html__('Footer Top Area','enerzee'),
		'class'         => 'nav-list',
		'id'            => 'footer_top_area',
		'before_widget' => '<div class="widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-title iq-rmt-30">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'enerzee_right_widgets_init' );
?>