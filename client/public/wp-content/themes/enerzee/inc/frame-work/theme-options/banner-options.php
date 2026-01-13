<?php
/*
 * Header Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__('Banner Setting','enerzee'),
    'id'    => 'breadcrumbs-fevicon',
    'icon'  => 'eicon-banner',
    'desc'  => esc_html__('This section contains options for Breadcrumbs.','enerzee'),
    'fields'=> array(

        array(
            'id' => 'info_' . rand(10, 1000) ,
            'type' => 'info',
            'style' => 'custom',
            'color' => sanitize_hex_color($color),
            'title' => __('Banner Layout Options', 'enerzee') ,
        ) ,
        array(
            'id' => 'section-general'. rand(10, 1000) ,
            'type' => 'section',
            'indent' => true
        ) ,
        

        array(
            'id'      => 'bg_image',
            'type'    => 'image_select',
            'title'   => esc_html__( 'Select Image', 'enerzee' ),
            'subtitle' => esc_html__( 'A preview of the selected image will appear underneath the select box.', 'enerzee' ),
            'options' => array(
                '1'      => array(
                    'alt' => 'Style1',
                    'img' => get_template_directory_uri() . '/assets/images/backend/bg-1.jpg',
                ),
                '2'      => array(
                    'alt' => 'Style2',
                    'img' => get_template_directory_uri() . '/assets/images/backend/bg-2.jpg',
                ),
                '3'      => array(
                    'alt' => 'Style3',
                    'img' => get_template_directory_uri() . '/assets/images/backend/bg-3.jpg',
                ),
                '4'      => array(
                    'alt' => 'Style4',
                    'img' => get_template_directory_uri() . '/assets/images/backend/bg-4.jpg',
                ),
                '5'      => array(
                    'alt' => 'Style5',
                    'img' => get_template_directory_uri() . '/assets/images/backend/bg-5.jpg',
                ),
            ),
            'default' => '1'
        ),
        array(
            'id'        => 'display_banner',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Banner','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'             => 'banner_padding',
            'type'           => 'dimensions',
            'units'          => array( 'em', 'px', '%' ),    // You can specify a unit value. Possible: px, em, %
            'units_extended' => 'true',  // Allow users to select any type of unit
            'title'          => esc_html__( 'Banner (top/bottom) padding', 'enerzee' ),
            'required'  => array( 'display_banner', '=', 'yes' ),
            
           
        ),

        array(
            'id'             => 'banner_padding_responsive',
            'type'           => 'dimensions',
            'units'          => array( 'em', 'px', '%' ),    // You can specify a unit value. Possible: px, em, %
            'units_extended' => 'true',  // Allow users to select any type of unit
            'title'          => esc_html__( 'Banner (top/bottom) padding', 'enerzee' ),
            'required'  => array( 'display_banner', '=', 'yes' ),
            'desc' => esc_html__( 'Choose padding for screen < 991', 'enerzee' )
            
           
        ),


        array(
            'id'        => 'display_breadcrumbs',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Breadcrumbs on Banner','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'required'  => array( 'display_banner', '=', 'yes' ),
         
                'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'        => 'display_title',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Title on Banner','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'required'  => array( 'display_banner', '=', 'yes' ),
         
                'default'   => esc_html__('yes','enerzee')
        ),

        

        array(
            'id'            => 'breadcrumbs_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Breadcrumb Color', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

         array(
            'id'            => 'breadcrumbs_hover_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Breadcrumb Active Color', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),
        array(
            'id'            => 'bg_title_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Title Color', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'       => 'bg_type',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Banner Background Option', 'enerzee' ),
            'subtitle' => esc_html__( 'Select this option for Background Type color or image and video.', 'enerzee' ),
            'options'  => array(
                '1' => 'Color',
                '2' => 'Image',
                '3' => 'Video'
            ),
            'default'  => '2'
        ),

        array(
            'id'       => 'banner_image',         
            'type'     => 'media',
            'url'      => false,
            'title'    => esc_html__( 'Set  Image','enerzee'),
            'read-only'=> false,
            'required'  => array( 'bg_type', '=', '2' ),
            'subtitle' => esc_html__( 'Upload Image for your banner background.','enerzee'),
            'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/bg.jpg' ),
        ), 

        array(
            'id'            => 'bg_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Background Color', 'enerzee' ),
            'subtitle'      => esc_html__( 'Choose Background Color', 'enerzee' ),
            'required'  => array( 'bg_type', '=', '1' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'       => 'bg_video_link',
            'type'     => 'text',
            'title'    => esc_html__( 'Your Video Path', 'enerzee' ),
            'required'  => array( 'bg_type', '=', '3' ),
            'subtitle' => esc_html__( 'Upload video in media and paste video link over here.', 'enerzee' ),
            
        ),

        array(
            'id'       => 'bg_opacity',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Background Opacity Color', 'enerzee' ),
            'required' => array( 
                array('bg_type','!=','1') 
            ),
            'subtitle' => esc_html__( 'Select this option for Background Opacity Color.', 'enerzee' ),
            'options'  => array(
                '1' => 'None',
                '2' => 'Dark',
                '3' => 'Custom'
            ),
            'default'  => '1'
        ),


        array(
            'id'            => 'opacity_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'Background Gradient Color', 'enerzee' ),
            'required'  => array( 'bg_opacity', '=', '3' ),
            'subtitle'      => esc_html__( 'Choose body Gradient background color', 'enerzee' ),
            'default'       => 'rgba(2, 13, 30, 0.9)',
            'transparent'   => false
        ),

    )
));
