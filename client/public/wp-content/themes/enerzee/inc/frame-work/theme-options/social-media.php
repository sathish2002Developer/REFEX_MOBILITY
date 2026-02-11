<?php
/*
 * Social Network Options
 */
$opt_name;
Redux::set_section( $opt_name, array(
    'title'            => esc_html__( 'Social Media', 'enerzee' ),
    'id'               => 'social_link',
    'icon'             => 'eicon-social-icons',  
    'fields'           => array(
        array(
            'id' => 'info_' . rand(10, 1000) ,
            'type' => 'info',
            'style' => 'custom',
            'color' => sanitize_hex_color($color),
            'title' => __('Social Media Options', 'enerzee') ,
        ) ,
        array(
            'id' => 'section-general'. rand(10, 1000) ,
            'type' => 'section',
            'indent' => true
        ) ,
        array(
            'id'        => 'enerzee_display_social_media',
            'type'      => 'button_set',
            'title'     => esc_html__( 'Display Social Media on Footer','enerzee'),
            'options'   => array(
                            'yes' => esc_html__('Yes','enerzee'),
                            'no' => esc_html__('No','enerzee')
                        ),
            'default'   => esc_html__('no','enerzee')
        ),
        array(
            'id'       => 'social-media-iq',
            'type'     => 'sortable',
            'title'    => esc_html__('Social Media Option', 'enerzee'),
            'subtitle' => esc_html__('Enter social media url.', 'enerzee'),
            'mode'     => 'text',
			'label'    => true,
            'options'  => array(
				'facebook'     => '',
				'twitter'        => '',
				'google-plus'  => '',
                'github'      	 => '',
				'instagram'      => '',
                'linkedin'       => '',
                'tumblr'         => '',
                'pinterest'      => '',
                'dribbble'       => '',
                'reddit'         => '',
                'flickr'         => '',
                'skype'          => '',
                'youtube-play'   => '',
                'vimeo'          => '',
                'soundcloud'     => '',
                'wechat'         => '',
                'renren'         => '',
                'weibo'          => '',
                'xing'           => '',
                'qq'             => '',
                'rss'            => '',
                'vk'             => '',
                'behance'        => '',
                'snapchat'       => '',
            ),
           
           
        ),
    ),
) );