<?php
/*
 * Header Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title' => esc_html__( 'General', 'enerzee' ),
    'id'    => 'editer-general',
    'icon'  => 'el el-dashboard',
    'customizer_width' => '500px',
) );

Redux::set_section( $opt_name, array(
    'title' => esc_html__('Body Layout','enerzee'),
    'id'    => 'layout-section',
    'icon'  => 'el el-website',
    'subsection' => true,
    'fields'=> array(


        array(
            'id'       => 'layout_set',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Body Set Option', 'enerzee' ),
            'subtitle' => esc_html__( 'Select this option for body color or image of the theme.', 'enerzee' ),
            'options'  => array(
                '1' => 'Color',
                '2' => 'Default',
                '3' => 'Image'
            ),
            'default'  => '2'
        ),

        array(
            'id'       => 'enerzee_layout_image',         
            'type'     => 'media',
            'url'      => false,
            'title'    => esc_html__( 'Set Body Image','enerzee'),
            'read-only'=> false,
            'required'  => array( 'layout_set', '=', '3' ),
            'subtitle' => esc_html__( 'Upload Image for your body.','enerzee'),
        ), 

        array(
            'id'            => 'enerzee_layout_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Body Color', 'enerzee' ),
            'subtitle'      => esc_html__( 'Choose Body Color', 'enerzee' ),
            'required'  => array( 'layout_set', '=', '1' ),
            'default'       =>'#ffffff',
            'mode'          => 'background',
            'transparent'   => false
        ),

    )
));


Redux::set_section( $opt_name, array(
    'title' => esc_html__('Back to Top','enerzee'),
    'id'    => 'header-general',
    'icon'  => 'el el-circle-arrow-up',
    'subsection' => true,
    'fields'=> array(

        array(
            'id'        => 'enerzee_back_to_top',
            'type'      => 'button_set',
            'title'     => esc_html__( '"Back to top" Button','enerzee'),
            'subtitle' => esc_html__( 'Turn on to show "Back to top" button.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

    )
));


Redux::set_section( $opt_name, array(
    'title' => esc_html__('Favicon','enerzee'),
    'id'    => 'header-fevicon',
    'subsection' => true,
    'icon'  => 'el el-ok',
    
    'fields'=> array(
        array(
            'id'       => 'enerzee_fevicon',
            'type'     => 'media',
            'url'      => false,
            'title'    => esc_html__( 'Favicon','enerzee'),
            'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/favicon.ico' ),
            'subtitle' => esc_html__( 'Upload Favicon for your site','enerzee'),
        ),
    )
)); 
?>