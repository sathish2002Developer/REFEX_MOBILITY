<?php
/*
 * Header Options
*/


$opt_name;
Redux::set_section($opt_name, array(
    'title' => esc_html__('Page', 'enerzee') ,
    'id' => 'editer-page',
    'icon' => 'eicon-product-pages',
    'customizer_width' => '1000px',
));

// Blog Page Settings
Redux::set_section( $opt_name, array(
    'title' => esc_html__('Blog Page Settings','enerzee'),
    'id'    => 'blog-section',
    
    
    'subsection' => true,
    'desc'  => esc_html__('This section contains options for Blog Page.','enerzee'),
    'fields'=> array(
        array(
            'id' => 'info_general'.rand(10,1000),
            'type' => 'info',
            'style' => 'custom',
            'color' => sanitize_hex_color($color),

            'title' => __('Blog Page Options', 'enerzee') ,
        ) ,

        array(
            'id' => 'section-general'.rand(10,1000),
            'type' => 'section',
            'indent' => true
        ) ,

      
        array(
            'id'       => 'blog_btn',
            'type'     => 'text',
            'title'    => esc_html__( 'Blog Button Name', 'enerzee' ),
            'subtitle' => esc_html__( 'Change Blog Button Name in blog page and singal blog page', 'enerzee' ),
            'default'  => esc_html__('Read More','enerzee' ),
        ),

        array(
            'id'        => 'enerzee_blog',
            'type'      => 'image_select',
            'title'     => esc_html__( 'Blog page Setting','enerzee' ),
            'subtitle'  => wp_kses( __( '<br />Choose among these structures (Right Sidebar, Left Sidebar, 1column, 2column and 3column) for your blog section.<br />To filling these column sections you should go to appearance > widget.<br />And put every widget that you want in these sections.','enerzee' ), array( 'br' => array() ) ),            
            'options'   => array(
                                
                                '1' => array( 'title' => esc_html__( 'One Columns','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/one-column.png' ), 
                                '2' => array( 'title' => esc_html__( 'Two Columns','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/two-column.png' ), 
                                '3' => array( 'title' => esc_html__( 'Three Columns','enerzee' ), 'img' => get_template_directory_uri() . '/assets/images/backend/three-column.png' ),                                
                            ),
            'default'   => '1',
        ),

        array(
            'id'        => 'enerzee_display_pagination',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Previous/Next Pagination','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display the previous/next post pagination for blog page.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('On','enerzee'),
                            'no' => esc_html__('Off','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

        array(
            'id'        => 'enerzee_display_image',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Featured Image on Blog Archive Page','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display featured images on the blog or archive pages.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('On','enerzee'),
                            'no' => esc_html__('Off','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

       

        array(
            'id'        => 'enerzee_display_comment',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Comments','enerzee'),
            'subtitle' => esc_html__( 'Turn on to display comments.','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('On','enerzee'),
                            'no' => esc_html__('Off','enerzee')
                        ),
            'default'   => esc_html__('yes','enerzee')
        ),

       

    )
    ));
Redux::set_section( $opt_name, array(
        'title' => esc_html__('404','enerzee'),
        'id'    => 'fourzerofour-section',
        'subsection' => true,
        'desc'  => esc_html__('This section contains options for 404.','enerzee'),
        'fields'=> array(

            array(
                'id' => 'info_general'.rand(10,1000),
                'type' => 'info',
                'style' => 'custom',
                'color' => sanitize_hex_color($color),
    
                'title' => __('404 Page Options', 'enerzee') ,
            ),
    
            array(
                'id' => 'section-general'.rand(10,1000),
                'type' => 'section',
                'indent' => true
            ) ,
    
            array(
                'id'       => 'enerzee_404_banner_image',         
                'type'     => 'media',
                'url'      => true,
                'title'    => esc_html__( '404 Page Default Banner Image','enerzee'),
                'default'  => array( 'url' => get_template_directory_uri() .'/assets/images/backend/404.png' ),
                'read-only'=> false,
                'subtitle' => esc_html__( 'Upload banner image for your Website. Otherwise blank field will be displayed in place of this section.','enerzee'),
            ),
    
            array(
                'id'        => 'enerzee_fourzerofour_title',
                'type'      => 'text',
                'title'     => esc_html__( '404 Page Title','enerzee'),
                'default'   => esc_html__( 'ERROR','enerzee' )
            ),

            array(
                'id'        => 'enerzee_four_description',
                'type'      => 'textarea',
                'title'     => esc_html__( '404 ERROR Message','enerzee'),
                'default'   => esc_html__( 'Oops! This Page is Not Found.','enerzee' )
            ),

            array(
                'id'        => 'enerzee_four_description_two',
                'type'      => 'textarea',
                'title'     => esc_html__( '404 Page Description','enerzee'),
                'default'   => esc_html__( 'The requested page does not exist. ','enerzee' )
            ),

            array(
                'id'        => 'enerzee_fourzerofour_button',
                'type'      => 'text',
                'title'     => esc_html__( '404 Button Name','enerzee'),
                'default'   => esc_html__( 'Go Back','enerzee' )
            ),
        )) 
    );
?>