<?php
if ( !function_exists( 'enerzee_create_dynamic_style' ) ) {
    
    function enerzee_create_dynamic_style() {

        $enerzee_dynamic_css = array();
        $enerzee_dynamic_css_min_width_1200px = array();

        $enerzee_option = get_option('enerzee_options');

        $loader_width = '';
        $loader_height = ''; 

        if(!empty($enerzee_option["logo-dimensions"]["width"])) { $logo_width = $enerzee_option["logo-dimensions"]["width"]; }
        if(!empty($enerzee_option["logo-dimensions"]["height"])) { $logo_height = $enerzee_option["logo-dimensions"]["height"]; }
        if(!empty($enerzee_option["loader-dimensions"]["width"])) {  $loader_width = $enerzee_option["loader-dimensions"]["width"]; }
        if(!empty($enerzee_option["loader-dimensions"]["height"])) { $loader_height = $enerzee_option["loader-dimensions"]["height"]; }        

        if(isset($enerzee_option["body_font"]["font-family"])) { $body_family = $enerzee_option["body_font"]["font-family"]; }
        if(isset($enerzee_option["body_font"]["font-size"])){ $body_size = $enerzee_option["body_font"]["font-size"]; }
        if(isset($enerzee_option["body_font"]["font-weight"])){ $body_weight = $enerzee_option["body_font"]["font-weight"]; }

        if(isset($enerzee_option["primary_menu"]["font-family"])) { $primary_family = $enerzee_option["primary_menu"]["font-family"]; }
        if(isset($enerzee_option["primary_menu"]["font-size"])) { $primary_size = $enerzee_option["primary_menu"]["font-size"]; }
        if(isset($enerzee_option["primary_menu"]["font-weight"])) { $primary_weight = $enerzee_option["primary_menu"]["font-weight"]; }

        if(isset($enerzee_option["sub_menu"]["font-family"])) { $sub_family = $enerzee_option["sub_menu"]["font-family"]; }
        if(isset($enerzee_option["sub_menu"]["font-size"])) { $sub_size = $enerzee_option["sub_menu"]["font-size"]; }
        if(isset($enerzee_option["sub_menu"]["font-weight"])) { $sub_weight = $enerzee_option["sub_menu"]["font-weight"]; }

        if(isset($enerzee_option["h1_font"]["font-family"])) { $h1_family = $enerzee_option["h1_font"]["font-family"]; }
        
        if(isset($enerzee_option["h1_font"]["font-size"])) { $h1_size = $enerzee_option["h1_font"]["font-size"]; }
        if(isset($enerzee_option["h1_font"]["font-weight"])) { $h1_weight = $enerzee_option["h1_font"]["font-weight"]; }

        if(isset($enerzee_option["h2_font"]["font-family"])) { $h2_family = $enerzee_option["h2_font"]["font-family"]; }
        if(isset($enerzee_option["h2_font"]["font-size"])) { $h2_size = $enerzee_option["h2_font"]["font-size"]; }
        if(isset($enerzee_option["h2_font"]["font-weight"])) { $h2_weight = $enerzee_option["h2_font"]["font-weight"]; }

        if(isset($enerzee_option["h3_font"]["font-family"])) { $h3_family = $enerzee_option["h3_font"]["font-family"]; }
        if(isset($enerzee_option["h3_font"]["font-size"])) { $h3_size = $enerzee_option["h3_font"]["font-size"]; }
        if(isset($enerzee_option["h3_font"]["font-weight"])) { $h3_weight = $enerzee_option["h3_font"]["font-weight"]; }

        if(isset($enerzee_option["h4_font"]["font-family"])) { $h4_family = $enerzee_option["h4_font"]["font-family"]; }
        if(isset($enerzee_option["h4_font"]["font-size"])) { $h4_size = $enerzee_option["h4_font"]["font-size"]; }
        if(isset($enerzee_option["h4_font"]["font-weight"])) { $h4_weight = $enerzee_option["h4_font"]["font-weight"]; }

        if(isset($enerzee_option["h5_font"]["font-family"])) { $h5_family = $enerzee_option["h5_font"]["font-family"]; }
        if(isset($enerzee_option["h5_font"]["font-size"])) { $h5_size = $enerzee_option["h5_font"]["font-size"]; }
        if(isset($enerzee_option["h5_font"]["font-weight"])) { $h5_weight = $enerzee_option["h5_font"]["font-weight"]; }

        if(isset($enerzee_option["h6_font"]["font-family"])) { $h6_family = $enerzee_option["h6_font"]["font-family"]; }
        if(isset($enerzee_option["h6_font"]["font-size"])) { $h6_size = $enerzee_option["h6_font"]["font-size"]; }
        if(isset($enerzee_option["h6_font"]["font-weight"])) { $h6_weight = $enerzee_option["h6_font"]["font-weight"]; }

        if(isset($enerzee_option["page_title_font"]["font-family"])) { $page_title_family = $enerzee_option["page_title_font"]["font-family"]; }
        if(isset($enerzee_option["page_title_font"]["font-size"])) { $page_title_size = $enerzee_option["page_title_font"]["font-size"]; }
        if(isset($enerzee_option["page_title_font"]["font-weight"])) { $page_title_weight = $enerzee_option["page_title_font"]["font-weight"]; }

        if(isset($enerzee_option["page_desc_font"]["font-family"])) { $page_desc_family = $enerzee_option["page_desc_font"]["font-family"]; }
        if(isset($enerzee_option["page_desc_font"]["font-size"])) { $page_desc_size = $enerzee_option["page_desc_font"]["font-size"]; }
        if(isset($enerzee_option["page_desc_font"]["font-weight"])) { $page_desc_weight = $enerzee_option["page_desc_font"]["font-weight"]; }
	
        if(!empty($logo_width)){
        $enerzee_dynamic_css[] = array(
                    'elements'  =>  'header a.navbar-brand img',
                    'property'  =>  'width',
                    'value'     =>  $logo_width. '!important'
                );
        }



        if(!empty($logo_height)){
        $enerzee_dynamic_css[] = array(
                    'elements'  =>  'header a.navbar-brand img',
                    'property'  =>  'height',
                    'value'     =>  $logo_height. '!important'
                );
        }



        if(!empty($loader_width)){
            $enerzee_dynamic_css[] = array( 
                'elements'  =>  '#loading img',
                'property'  =>  'width',
                'value'     =>  $loader_width. '!important'
            );
        }


        if(!empty($loader_height)){
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '#loading img',
                'property'  =>  'height',
                'value'     =>  $loader_height. '!important'
            );
        } 

        if(isset($enerzee_option["header_font"]["font-family"])) 
        { 
            $header_font = $enerzee_option["header_font"]["font-family"]; 

            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.navbar .logo-text',
                'property'  =>  'font-family',
                'value'     =>  str_replace("'","",$header_font). '!important'
            );
        }
        if(isset($enerzee_option["header_font"]["font-size"])) 
        { 
            $size = $enerzee_option["header_font"]["font-size"]; 
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.navbar .logo-text',
                'property'  =>  'font-size',
                'value'     =>  $size. '!important'
            );
        }

        if(isset($enerzee_option["header_font"]["font-weight"])) 
        { 
            $weight = $enerzee_option["header_font"]["font-weight"]; 
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.navbar .logo-text',
                'property'  =>  'font-weight',
                'value'     =>  $weight. '!important'
            );
        }
        if(isset($enerzee_option["header_logo_color"])) 
        { 
            $color = $enerzee_option["header_logo_color"]; 
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.navbar .logo-text',
                'property'  =>  'color',
                'value'     =>  $color. '!important'
            );
        }
        // Change font 1
        if( $enerzee_option['enerzee_change_font'] == 1 ){
            // body
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'body',
                'property'  =>  'font-family',
                'value'     =>  $body_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'body',
                'property'  =>  'font-size',
                'value'     =>  $body_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'body',
                'property'  =>  'font-weight',
                'value'     =>  $body_weight. '!important'
            );

            // primary menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '#top-menu',
                'property'  =>  'font-family',
                'value'     =>  $primary_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '#top-menu',
                'property'  =>  'font-size',
                'value'     =>  $primary_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '#top-menu',
                'property'  =>  'font-weight',
                'value'     =>  $primary_weight. '!important'
            );

            // sub menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.sub-menu',
                'property'  =>  'font-family',
                'value'     =>  $sub_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.sub-menu',
                'property'  =>  'font-size',
                'value'     =>  $sub_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.sub-menu',
                'property'  =>  'font-weight',
                'value'     =>  $sub_weight. '!important'
            );

            // h1 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h1',
                'property'  =>  'font-family',
                'value'     =>  $h1_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h1',
                'property'  =>  'font-size',
                'value'     =>  $h1_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h1',
                'property'  =>  'font-weight',
                'value'     =>  $h1_weight. '!important'
            );

            // h2 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h2',
                'property'  =>  'font-family',
                'value'     =>  $h2_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h2',
                'property'  =>  'font-size',
                'value'     =>  $h2_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h2',
                'property'  =>  'font-weight',
                'value'     =>  $h2_weight. '!important'
            );

            // h3 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h3',
                'property'  =>  'font-family',
                'value'     =>  $h3_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h3',
                'property'  =>  'font-size',
                'value'     =>  $h3_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h3',
                'property'  =>  'font-weight',
                'value'     =>  $h3_weight. '!important'
            );

            // h4 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h4',
                'property'  =>  'font-family',
                'value'     =>  $h4_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h4',
                'property'  =>  'font-size',
                'value'     =>  $h4_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h4',
                'property'  =>  'font-weight',
                'value'     =>  $h4_weight. '!important'
            );

            // h5 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h5',
                'property'  =>  'font-family',
                'value'     =>  $h5_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h5',
                'property'  =>  'font-size',
                'value'     =>  $h5_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h5',
                'property'  =>  'font-weight',
                'value'     =>  $h5_weight. '!important'
            );

            // h6 menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h6',
                'property'  =>  'font-family',
                'value'     =>  $h6_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h6',
                'property'  =>  'font-size',
                'value'     =>  $h6_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  'h6',
                'property'  =>  'font-weight',
                'value'     =>  $h6_weight. '!important'
            );

            // page_title menu
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.page_title',
                'property'  =>  'font-family',
                'value'     =>  $page_title_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.page_title',
                'property'  =>  'font-size',
                'value'     =>  $page_title_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.page_title',
                'property'  =>  'font-weight',
                'value'     =>  $page_title_weight. '!important'
            );

             // page_desc menu
             $enerzee_dynamic_css[] = array(
                'elements'  =>  '.page_desc',
                'property'  =>  'font-family',
                'value'     =>  $page_desc_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.page_desc',
                'property'  =>  'font-size',
                'value'     =>  $page_desc_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.button',
                'property'  =>  'font-weight',
                'value'     =>  $page_desc_weight. '!important'
            );

            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.button',
                'property'  =>  'font-family',
                'value'     =>  $page_desc_family. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.button',
                'property'  =>  'font-size',
                'value'     =>  $page_desc_size. '!important'
            );
            $enerzee_dynamic_css[] = array(
                'elements'  =>  '.button',
                'property'  =>  'font-weight',
                'value'     =>  $page_desc_weight. '!important'
            );
            
            
        }
       // }

        // Start generating if related arrays are populated
        if ( count( $enerzee_dynamic_css ) > 0 ) {
            echo "<style type='text/css' id='enerzee-dynamic-css'>\n\n";
            
            // Basic dynamic CSS
            if ( count( $enerzee_dynamic_css ) > 0 ) {
                enerzee_dynamic_style( $enerzee_dynamic_css );
            }            
            echo '</style>';
        }
    }
}
add_action( 'wp_head', 'enerzee_create_dynamic_style' );

if ( !function_exists( 'enerzee_create_dynamic_style' ) ) {
    
    function enerzee_create_dynamic_style() {

        $enerzee_dynamic_css = array();
        $enerzee_dynamic_css_min_width_1200px = array();

        $enerzee_option = get_option('enerzee_options');

        $loader_width = '';
        $loader_height = '';
       if(isset($enerzee_option["logo-dimensions"]["width"]))
        {
        if(!empty($enerzee_option["logo-dimensions"]["width"])) { $logo_width = $enerzee_option["logo-dimensions"]["width"]; }
        if(!empty($enerzee_option["logo-dimensions"]["height"])) { $logo_height = $enerzee_option["logo-dimensions"]["height"]; }

        if(!empty($enerzee_option["loader-dimensions"]["width"])) { $loader_width = $enerzee_option["loader-dimensions"]["width"]; }
        if(!empty($enerzee_option["loader-dimensions"]["height"])) { $loader_height = $enerzee_option["loader-dimensions"]["height"]; }

        if(!empty($enerzee_option["footerlogo-dimensions"]["width"])) { $footerlogo_width = $enerzee_option["footerlogo-dimensions"]["width"]; }
        if(!empty($enerzee_option["footerlogo-dimensions"]["height"])) { $footerlogo_height = $enerzee_option["footerlogo-dimensions"]["height"]; }
        
        $enerzee_dynamic_css[] = array(
            'elements'  =>  '.navbar-brand img',
            'property'  =>  'width',
            'value'     =>  $logo_width. '!important'
        );
        $enerzee_dynamic_css[] = array(
            'elements'  =>  '.navbar-brand img',
            'property'  =>  'height',
            'value'     =>  $logo_height. '!important'
        );
	
        $enerzee_dynamic_css[] = array(
            'elements'  =>  'footer .footer-logo img',
            'property'  =>  'width',
            'value'     =>  $footerlogo_width. '!important'
        );
        $enerzee_dynamic_css[] = array(
            'elements'  =>  'footer .footer-logo img',
            'property'  =>  'height',
            'value'     =>  $footerlogo_height. '!important'
        );
       

        // Start generating if related arrays are populated
        if ( count( $enerzee_dynamic_css ) > 0 ) {
            echo "<style type='text/css' id='enerzee-dynamic-css'>\n\n";
            
            // Basic dynamic CSS
            if ( count( $enerzee_dynamic_css ) > 0 ) {
                enerzee_dynamic_style( $enerzee_dynamic_css );
            }            
            echo '</style>';
        }
}
    }
}
add_action( 'wp_head', 'enerzee_create_dynamic_style' );
