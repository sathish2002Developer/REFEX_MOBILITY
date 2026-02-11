<?php

function enerzee_banner_class()
{
    $enerzee_option = get_option('enerzee_options');
    $options = isset($enerzee_option['bg_opacity']) ? $enerzee_option['bg_opacity'] : '';
    if ($options == "1") {
        $bg_class = esc_attr('iq-bg-over black');
    } elseif ($options == "2") {
        $bg_class = esc_attr('iq-bg-over iq-over-dark-80');
    } elseif ($options == "3") {
        $bg_class = esc_attr('breadcrumb-bg breadcrumb-ui');
    } else {
        $bg_class = esc_attr('iq-bg-over');
    }

    echo wp_kses_post($bg_class);
}
