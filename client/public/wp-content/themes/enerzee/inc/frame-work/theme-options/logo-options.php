<?php
/*
 * Logo Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__('Header Logo','enerzee'),
    'id'    => 'header-logo',
    'icon'  => 'el el-flag',
    
    'fields'=> array(

        array(
            'id'       => 'header_radio',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Logo Options', 'enerzee' ),
            
            'options'  => array(
                '1' => ' Logo as Text',
                '2' => ' Logo as Image',
            ),
            'default'  => '2'
        ),

        array(
            'id'       => 'enerzee_logo',         
            'type'     => 'media',
            'url'      => false,
            'title'    => esc_html__( 'Logo','enerzee'),
            'required'  => array( 'header_radio', '=', '2' ),
            'read-only'=> false,
            'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/logo.png' ),
            'subtitle' => esc_html__( 'Upload Logo image for your Website. Otherwise site title will be displayed in place of Logo.','enerzee'),
        ), 

        array(
            'id'             => 'logo-dimensions',
            'type'           => 'dimensions',
            'units'          => array( 'em', 'px', '%' ),    // You can specify a unit value. Possible: px, em, %
            'units_extended' => 'true',  // Allow users to select any type of unit
            'title'          => esc_html__( 'Logo (Width/Height) Option', 'enerzee' ),
            'required'  => array( 'header_radio', '=', '2' ),
            'subtitle'       => esc_html__( 'Allow your users to choose width, height, and/or unit.', 'enerzee' ),
            'desc'           => esc_html__( 'You can enable or disable any piece of this field. Width, Height, or Units.', 'enerzee' ),
           
        ),

        array(
            'id'       => 'header_text',
            'type'     => 'text',
            'title'    => esc_html__( 'Logo Text', 'enerzee' ),
            'desc'     => esc_html__( 'Enter the text to be used instead of the logo image', 'enerzee' ),
            'required'  => array( 'header_radio', '=', '1' ),
            'msg'      => esc_html__('custom error message','enerzee' ),
            'default'  => esc_html__('enerzee','enerzee' ),
        ),

        array(
            'id'        => 'header_font',
            'type'      => 'typography',
            'title'     => esc_html__( 'Logo Font','enerzee' ),
            'subtitle'  => esc_html__( 'Select the font.','enerzee' ),
            'desc'      => esc_html__( 'PT+Sans is default font.','enerzee' ),
            'required'  => array( 'header_radio', '=', '1' ),
            'google'    => true,
            'font-style'    => true,
            'font-weight'   => true,
            'font-size'     => true,
            'line-height'   => false,
            'color'         => false,
            'text-align'    => false,            
            'default'       => array(
                'font-family' => esc_html__( 'PT+Sans','enerzee' ),
                'google'      => true
            )
        ),

        array(
            'id'            => 'header_logo_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Text Color', 'enerzee' ),
            'subtitle'      => esc_html__( 'Choose Text Color', 'enerzee' ),
            'required'      => array( 'header_radio', '=', '1' ),
            'default'       =>'#a37cfc',
            'mode'          => 'background',
            'transparent'   => false
        ),
        
    )
));
