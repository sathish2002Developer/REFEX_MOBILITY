<?php
// -> START Contact
    Redux::set_section( $opt_name, array(
        'title' => esc_html__( 'Contact', 'enerzee' ),
        'id'    => 'Contact', 
        'icon'  => 'eicon-map-pin',
        'desc'  => esc_html__( '', 'enerzee' ),
		'fields'           => array(
            array(
                'id'       => 'address',
                'type'     => 'textarea',
                'title'    => esc_html__( 'Address', 'enerzee' ),
                'subtitle' => esc_html__( 'Subtitle', 'enerzee' ),
                'desc'     => esc_html__( 'Field Description', 'enerzee' ),
                'default'  => esc_html__('1234 North Avenue Luke Lane, South Bend, IN 360001','enerzee' ),
            ),
			array(
                'id'       => 'phone',
                'type'     => 'text',
                'title'    => esc_html__( 'Phone', 'enerzee' ),
                'subtitle' => esc_html__( 'Subtitle', 'enerzee' ),
                'desc'     => esc_html__( 'Field Description', 'enerzee' ),
                'preg' => array(
                    'pattern' => '/[^0-9_ -+()]/s', 
                    'replacement' => ''
                ),
                'default'  => esc_html__('+0123456789','enerzee' ),
            ),

            array(
                'id'       => 'second_phone',
                'type'     => 'text',
                'title'    => esc_html__( 'Phone', 'enerzee' ),
                'desc'     => esc_html__( 'Field Description', 'enerzee' ),
                'preg' => array(
                    'pattern' => '/[^0-9_ -+()]/s', 
                    'replacement' => ''
                ),
                'default'  => esc_html__('+0123456789','enerzee' ),
            ),
			
			array(
                'id'       => 'email',
                'type'     => 'text',
                'title'    => esc_html__( 'Email', 'enerzee' ),
                'desc'     => esc_html__( 'Field Description', 'enerzee' ),
                'validate' => 'email',
                'msg'      => esc_html__('custom error message','enerzee' ),
                'default'  => esc_html__('support@iqnonicthemes.com','enerzee' ),
            ),

            array(
                'id'       => 'second_email',
                'type'     => 'text',
                'title'    => esc_html__( 'Email', 'enerzee' ),
                'desc'     => esc_html__( 'Field Description', 'enerzee' ),
                'validate' => 'email',
                'msg'      => esc_html__('custom error message','enerzee' ),
                'default'  => esc_html__('support@iqnonicthemes.com','enerzee' ),
            ),
						
        )
        
    ) );
?>