<?php
/*
 * Header Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__('Loader','enerzee'),
    'id'    => 'header-loader',
    'icon'  => 'el el-refresh',
    
    'fields'=> array(

        array(
            'id'        => 'enerzee_display_loader',
            'type'      => 'button_set',
            'title'     => esc_html__( 'enerzee Loader','enerzee'),
            'subtitle' => wp_kses('Turn on to show the icon/images loading animation before view site', 'enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'            => 'loader_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Loader Background Color', 'enerzee' ),
            'required'  => array( 'enerzee_display_loader', '=', 'yes' ),
            'subtitle'      => esc_html__( 'Choose Loader Background Color', 'enerzee' ),
            'default'       => '#ffffff',
            'transparent'   => false
        ),
        
        array(
            'id'       => 'enerzee_loader_gif',         
            'type'     => 'media',
            'url'      => true,
            'title'    => esc_html__( 'Add GIF image for loader','enerzee'),
            'read-only'=> false,
            'required'  => array( 'enerzee_display_loader', '=', 'yes' ),
            'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/loader.gif' ),
            'subtitle' => esc_html__( 'Upload Loader GIF image for your Website.','enerzee'),
        ),

        array(
            'id'             => 'loader-dimensions',
            'type'           => 'dimensions',
            'units'          => array( 'em', 'px', '%' ),    
            'units_extended' => 'true',  
            'required'  => array( 'enerzee_display_loader', '=', 'yes' ),
            'title'          => esc_html__( 'Loader (Width/Height) Option', 'enerzee' ),
            'subtitle'       => esc_html__( 'Allow your users to choose width, height, and/or unit.', 'enerzee' ),
            'desc'           => esc_html__( 'You can enable or disable any piece of this field. Width, Height, or Units.', 'enerzee' ),
        ),
      
    )
));
?>