<?php
/*
 * Header Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__( 'Header', 'enerzee' ),
    'id'    => 'header-editor',
    'icon'  => 'el el-arrow-up',
    'customizer_width' => '500px',
) );  
   
Redux::set_section( $opt_name, array(
    'title' => esc_html__('Layout','enerzee'),
    'id'    => 'header-variation',
    'subsection' => true,
    
    'fields'=> array(
             
        array(
            'id'       => 'header_transparent',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Header Transparent', 'enerzee' ),
            'options'  => array(
                '1' => 'Yes',
                '2' => 'No'
            ),
            'default'  => '1'
        ),

        array(
            'id'       => 'header_color',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Header Colors', 'enerzee' ),
            'options'  => array(
                '1' => 'Default',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
            'id'            => 'header_bg_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Background Color', 'enerzee' ),
            'required'  => array( 'header_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Background Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'header_text_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Text Color', 'enerzee' ),
            'required'  => array( 'header_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Text Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'header_link_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Link Color', 'enerzee' ),
            'required'  => array( 'header_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Link Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'header_link_hover_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Link Hover Color', 'enerzee' ),
            'required'  => array( 'header_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Link Hover Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),
        array(
            'id'        => 'header_display_shop',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Shop & Wishlist Button','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display Shop & Wishlist Button in header.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('no','enerzee')
        ),

        array(
        'id'       => 'wishlist_link',
        'type'     => 'select',
        'multi'    => false,
        'data'     => 'pages',
        'required'  => array( 'header_display_shop', '=', 'yes' ),
        'title'    => __( 'Choose Wishlist Page' , 'enerzee'),
        'subtitle' => __( 'Select Page that you want to display wishlist items' , 'enerzee'),
        ),

    )
));

Redux::set_section( $opt_name, array(
    'title' => esc_html__( 'Header Top', 'enerzee' ),
    'id'    => 'Header_Contact',
    'subsection' => true,
    'desc'  => esc_html__( '', 'enerzee' ),
    'fields'  => array(

        

        array(
            'id'        => 'header_display_button',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Login/CTA Button','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display the Login and CTA button in top header.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('On','enerzee'),
                            'no' => esc_html__('Off','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'        => 'enerzee_download_title',
            'type'      => 'text',
            'title'     => esc_html__( 'Title(Download)','enerzee'),
            'required'  => array( 'header_display_button', '=', 'yes' ),
            'default'   => 'Get Started',
            'desc'   => esc_html__('Change Title (e.g.Download).','enerzee'),
        ),
        array(
            'id'        => 'enerzee_download_link',
            'type'      => 'text',
            'title'     => esc_html__( 'Link(Download)','enerzee'),
            'required'  => array( 'header_display_button', '=', 'yes' ),
            'desc'   => esc_html__('Add download link.','enerzee'),
        ),

        array(
            'id'       => 'he_button_color',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Header Button Colors', 'enerzee' ),
            'options'  => array(
                '1' => 'Default',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
            'id'            => 'hedaer_button_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Button Color', 'enerzee' ),
            'required'  => array( 'he_button_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Button Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'hedaer_button_hover_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Button Hover Color', 'enerzee' ),
            'required'  => array( 'he_button_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Hover Button Hover Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'hedaer_button_text_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Button Text Color', 'enerzee' ),
            'required'  => array( 'he_button_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Button Text Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'hedaer_button_hover_text_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Header Button Hover Text Color', 'enerzee' ),
            'required'  => array( 'he_button_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Header Button Text Hover Color', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'        => 'header_display_search',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Search Button','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display Search Button in header.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

       
                    
    )
    
) );


Redux::set_section( $opt_name, array(
    'title' => esc_html__('Sticky Header','enerzee'),
    'id'    => 'header-sticky',
    'subsection' => true,
    
    'fields'=> array(

        array(
            'id'        => 'enerzee_header_sticky',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Sticky Header','enerzee'),
            'subtitle' => esc_html__( 'ON/OFF Sticky Header.','enerzee'),
            'options'   => array(
                            '1' => esc_html__('Yes','enerzee'),
                            '2' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('2','enerzee')
        ),

	array(
            'id'            => 'header_sticky_bg_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Sticky Header Background Color 1', 'enerzee' ),
            'required'  => array( 'enerzee_header_sticky', '=', '1' ),
            'subtitle'      => esc_html__( 'Choose Header Background Color 1', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

	array(
            'id'            => 'header_sticky_bg_color_two',
            'type'          => 'color',
            'title'         => esc_html__( 'Sticky Header Background Color 2', 'enerzee' ),
            'required'  => array( 'enerzee_header_sticky', '=', '1' ),
            'subtitle'      => esc_html__( 'Choose Header Background Color 2', 'enerzee' ),
            'mode'          => 'background',
            'transparent'   => false
        ),

    )
));
?>