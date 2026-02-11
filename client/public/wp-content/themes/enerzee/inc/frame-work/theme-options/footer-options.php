<?php
/*
 * Footer Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__( 'Footer', 'enerzee' ),
    'id'    => 'footer-editor',
    'icon'  => 'el el-arrow-down',
    'customizer_width' => '500px',
) );

Redux::set_section( $opt_name, array(
    'title' => esc_html__('Footer Image','enerzee'),
    'id'    => 'footer-logo',
    'subsection' => true,
    'desc'  => esc_html__('This section contains options for footer.','enerzee'),
    'fields'=> array(

        array(
            'id'        => 'enerzee_footer_top_display',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Top Footer','enerzee'),
            'subtitle' => esc_html__( 'Display Top Footer On All Pages', 'enerzee' ),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('no','enerzee')
        ),

        array(
            'id'       => 'footer_option',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Footer Option', 'enerzee' ),
            'options'  => array(
                '1' => 'Default',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
            'id'       => 'footer_type',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Footer Set Option', 'enerzee' ),
            'required'  => array( 'footer_option', '=', '2' ),
            'subtitle' => esc_html__( 'Select this option for Background Type color and image.', 'enerzee' ),
            'options'  => array(
                '1' => 'Color',
                '2' => 'Image',
            ),
            'default'  => '1'
        ),
        
        array(
            'id'       => 'footer_image',         
            'type'     => 'media',
            'url'      => false,
            'title'    => esc_html__( 'Footer Background Image','enerzee'),
            'required'  => array( 'footer_type', '=', '2' ),
            'read-only'=> false,
            'subtitle' => esc_html__( 'Upload Footer image for your Website. Otherwise site title will be displayed in place of Logo.','enerzee'),
            'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/footer-img.jpg' ),
        ), 

        array(
            'id'       => 'footer_opacity',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Background Opacity Color', 'enerzee' ),
            'required' => array( 
                array('footer_type','!=','1') 
            ),
            'subtitle' => esc_html__( 'Select this option for Background Opacity Color.', 'enerzee' ),
            'options'  => array(
                '1' => 'None',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
            'id'            => 'footer_opacity_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'Background Gradient Color', 'enerzee' ),
            'required'  => array( 'footer_opacity', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose body Gradient background color', 'enerzee' ),
            'default'   => array(
                'color'     => '#eff1fe',
                'alpha'     => 0.9
            ),
            'transparent'   => false
        ),

        array(
            'id'            => 'footer_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'Footer Color', 'enerzee' ),
            'subtitle'      => esc_html__( 'Choose Footer Background Color', 'enerzee' ),
            'required'  => array( 'footer_type', '=', '1' ),
            'default'   =>  '#1f2332',
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'footer_heading_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Footer Heading Color', 'enerzee' ),
            'required'  => array( 'footer_type', '=', '1' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'footer_text_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Footer Text Color', 'enerzee' ),
            'required'  => array( 'footer_type', '=', '1' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'footer_link_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Footer Link Color', 'enerzee' ),
            'required'  => array( 'footer_type', '=', '1' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

    )
));  

Redux::set_section( $opt_name, array(
    'title' => esc_html__('Footer Option','enerzee'),
    'id'    => 'footer-section',
    'subsection' => true,
    'desc'  => esc_html__('This section contains options for footer.','enerzee'),
    'fields'=> array(

        array(
            'id'        => 'display_footer',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Footer','enerzee'),
            'subtitle' => esc_html__( 'Display Footer On All Pages', 'enerzee' ),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),
        
        array(
            'id'        => 'enerzee_footer_width',
            'type'      => 'image_select',
            'title'     => esc_html__( 'Footer Layout Type','enerzee' ),
            'subtitle'  => wp_kses( __( '<br />Choose among these structures (1column, 2column and 3column) for your footer section.<br />To filling these column sections you should go to appearance > widget.<br />And put every widget that you want in these sections.','enerzee' ), array( 'br' => array() ) ),            
            'options'   => array(
                                '1' => array( 'title' => esc_html__( 'One Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_first.png' ),
                                '2' => array( 'title' => esc_html__( 'Two Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_second.png' ),
                                '3' => array( 'title' => esc_html__( 'Three Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_third.png' ),
                                '4' => array( 'title' => esc_html__( 'Four Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_four.png' ),  
                                '5' => array( 'title' => esc_html__( '4+3+3+2 Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_four.png' ),   
                                '6' => array( 'title' => esc_html__( '4+2+2+4 Column','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/footer_6.png' ),                       
                            ),
            'default'   => '4',
        ),

        array(
            'id'       => 'footer_one',
            'type'     => 'select',
            'title'    => esc_html__('Select 1 Footer Alignment', 'enerzee'), 
            'options'  => array(
                '1' => 'Left',
                '2' => 'Right',
                '3' => 'Center',
            ),
            'default'  => '1',
        ),

        array(
            'id'       => 'footer_two',
            'type'     => 'select',
            'title'    => esc_html__('Select 2 Footer Alignment', 'enerzee'), 
            'options'  => array(
                '1' => 'Left',
                '2' => 'Right',
                '3' => 'Center',
            ),
            'default'  => '1',
        ),

        array(
            'id'       => 'footer_three',
            'type'     => 'select',
            'title'    => esc_html__('Select 3 Footer Alignment', 'enerzee'), 
            'options'  => array(
                '1' => 'Left',
                '2' => 'Right',
                '3' => 'Center',
            ),
            'default'  => '1',
        ),

        array(
            'id'       => 'footer_fore',
            'type'     => 'select',
            'title'    => esc_html__('Select 4 Footer Alignment', 'enerzee'), 
            'options'  => array(
                '1' => 'Left',
                '2' => 'Right',
                '3' => 'Center',
            ),
            'default'  => '1',
        ),

    )
));

Redux::set_section( $opt_name, array(
    'title'      => esc_html__( 'Footer Copyright', 'enerzee' ),
    'id'         => 'footer-copyright',
    'subsection' => true,
    'fields'     => array(

        array(
            'id'        => 'display_copyright',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Footer Copyright','enerzee'),
            'subtitle' => esc_html__( 'Display Footer Copyright On All page', 'enerzee' ),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'        => 'footer_copyright',
            'type'      => 'textarea',
            'required'  => array( 'display_copyright', '=', 'yes' ),
            'title'     => esc_html__( 'Copyright Text','enerzee'),
            'default'   => esc_html__( 'Copyright 2022 Enerzee All Rights Reserved.','enerzee'),
        ),

        array(
            'id'       => 'footer_copy_color',
            'type'     => 'button_set',
            'required'  => array( 'display_copyright', '=', 'yes' ),
            'title'    => esc_html__( 'Change Footer Copyright Color', 'enerzee' ),
            'options'  => array(
                '1' => 'Default',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
            'id'            => 'footer_copyright_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Footer Link Color', 'enerzee' ),
            'required'  => array( 'footer_copy_color', '=', '2' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

    )) 
);
