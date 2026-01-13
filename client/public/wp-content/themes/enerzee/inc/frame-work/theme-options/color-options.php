<?php
/*
 * Color Options
 */

Redux::set_section( $opt_name, array(
    'title' => esc_html__( 'Color Attribute','enerzee' ),
    'id'    => 'color-section',
    'icon'  => 'el el-brush',
    'desc'  => esc_html__('This section change the site default color.','enerzee'),
    'fields'=> array(

        array(
            'id'       => 'enerzee_color',
            'type'     => 'button_set',
            'title'    => esc_html__( 'Color Scheme', 'enerzee' ),
            'options'  => array(
                '1' => 'Default',
                '2' => 'Custom'
            ),
            'default'  => '1'
        ),

        array(
       'id' => 'section-color-info',
       'type' => 'info',
       'title' => __('Color Options', 'enerzee'),
       'desc' => __('The Below Colors are Used By Theme Please replace with Your Color Value To Chanage The Colors', 'enerzee'),
       'style' => 'warning',
       'indent' => true,
       'required'  => array( 'enerzee_color', '=', '2' ),
    ),

        array(
            'id'            => 'primary_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Primary Singal Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose primary color for main theme color and main background color.', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

      

        array(
            'id'            => 'secondary_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Secondary Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose secondary color for dark title and background.', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'tertiary_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Set Tertiary Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose tertiary color for description color and border colors', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'white_color',
            'type'          => 'color',
            'title'         => esc_html__( 'Whiter Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose White color for description color and border colors', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'portfolio_before_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'Portfolio Before Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Portfolio Before', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'portfolio_after_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'Portfolio after Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),
            'subtitle'      => esc_html__( 'Choose Portfolio Before', 'enerzee' ),
            
            'mode'          => 'background',
            'transparent'   => false
        ),

        array(
            'id'            => 'list_wrapper_color',
            'type'          => 'color_rgba',
            'title'         => esc_html__( 'List Wrapper Color', 'enerzee' ),
            'required'  => array( 'enerzee_color', '=', '2' ),           
            
            'mode'          => 'background',
            'transparent'   => false
        ),

              
    )
));
