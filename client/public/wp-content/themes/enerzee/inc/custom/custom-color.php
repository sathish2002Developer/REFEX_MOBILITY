<?php

if(class_exists('ReduxFramework'))
{
    add_action('wp_enqueue_scripts', 'enerzee_dynamic_color', 20);    
}

function enerzee_dynamic_color()
{
   
    $enerzee_option = get_option('enerzee_options');
    if ($enerzee_option['enerzee_color'] == "2")
    {
        $color_var = ':root { ';
        if(!empty($enerzee_option['primary_color']))
        {
            $color = $enerzee_option['primary_color'];
            $color_var .= ' --primary-color: '.$color.' !important;';
        }
        if(!empty($enerzee_option['secondary_color']))
        {
            $color = $enerzee_option['secondary_color'];
            $color_var .= ' --secondary-color: '.$color.' !important;';
        }
        if(!empty($enerzee_option['tertiary_color']))
        {
            $color = $enerzee_option['tertiary_color'];
            $color_var .= ' --text-color: '.$color.' !important;';
        }

        if(!empty($enerzee_option['white_color']))
        {
            $color = $enerzee_option['white_color'];
            $color_var .= ' --white-color: '.$color.' !important;';
        }
        if(!empty($enerzee_option['portfolio_before_color']['rgba']))
        {
            $color = $enerzee_option['portfolio_before_color']['rgba'];
            $color_var .= ' --portfolio-before-color: '.$color.' !important;';
        }
        if(!empty($enerzee_option['portfolio_after_color']['rgba']))
        {
            $color = $enerzee_option['portfolio_after_color']['rgba'];
            $color_var .= ' --portfolio-after-color: '.$color.' !important;';
        }

        if(!empty($enerzee_option['list_wrapper_color']['rgba']))
        {
            $color = $enerzee_option['list_wrapper_color']['rgba'];
            $color_var .= ' --list-wrapper-color: '.$color.' !important;';
        }
       
       
        $color_var .='}';  
     
        wp_add_inline_style('enerzee-style', $color_var);
    }
    
    
}
