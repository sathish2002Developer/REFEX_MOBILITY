<?php
/*
 * Header Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title'      => esc_html__( 'MailChimp Subscribe', 'enerzee' ),
    'id'         => 'enerzee-subscribe',
    'icon'       => 'el el-envelope',
    'fields'     => array(

        array(
            'id'        => 'enerzee_subscribe',
            'type'      => 'text',
            'title'     => esc_html__( 'Subscribe Shortcode','enerzee'),
            'subtitle'  => wp_kses( __( '<br />Put you Mailchimp for WP Shortcode here','enerzee' ), array( 'br' => array() ) ),
        ),

        array(
            'id'        => 'enerzee_subscribe_contant',
            'type'      => 'editor',
            'title'     => esc_html__( 'Enter Footer Subscribe Conatnt','enerzee'),
            'default'   => esc_html__( 'It is a long established fact that a page when looking at its layout.','enerzee'),
        ),
     
    )) 
);
?>