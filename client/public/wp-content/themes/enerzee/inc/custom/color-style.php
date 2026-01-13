<?php
function enerzee_layout_color() {
    //Set Body Color
    $enerzee_option = get_option('enerzee_options');
    $enerzee_layout_color="";
    if(isset($enerzee_option['enerzee_layout_color'])){
        $enerzee_layout_color = $enerzee_option['enerzee_layout_color'];
    }    
    $body_primary_color = "";

    if(isset($enerzee_option['layout_set'])){
        if($enerzee_option['layout_set'] == "1"){
            if( !empty($enerzee_layout_color) && $enerzee_layout_color != '#ffffff') {
                $body_primary_color .= "
                body {
                    background-color: $enerzee_layout_color !important;
                }";
            }
        }
    }   
    wp_add_inline_style( 'enerzee-style', $body_primary_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_layout_color' , 20);

// enerzee custom style color options
function enerzee_container_width(){

    $enerzee_option = get_option('enerzee_options');

     //box layout and full width layout container width

    $box_container_width="";

    if(isset($enerzee_option['opt-slider-label']) && !empty($enerzee_option['opt-slider-label'])){
         $container_width =$enerzee_option['opt-slider-label'];
        
         $box_container_width="
         body.boxed_layout #page, .container ,  body.boxed_layout header.menu-sticky ,body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container ,  body.full_width_layout  .elementor-section.elementor-section-boxed>.elementor-container {
            max-width: ".$container_width."px !important;
         }
         body.boxed_layout .elementor-section.elementor-section-full_width ,body.boxed_layout section.elementor-section.elementor-section-boxed{
            width:100% !important;
            left:0 !important;
            right: auto !important;
         }
         body.boxed_layout header.menu-sticky .main-header
         {
            width: ".$container_width."px !important;
         }
         body.boxed_layout .container ,body.boxed_layout .elementor-section.elementor-section-full_width>.elementor-container .elementor-container ,body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container .elementor-container 
         {
            padding:0;
         }
         body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container, body.boxed_layout .elementor-section.elementor-section-full_width>.elementor-container, body.boxed_layout header .container, body.boxed_layout footer .container
         {
            padding:0 15px;
         }

        @media (max-width: 1199px) and (min-width: 992px)
        {

                body.boxed_layout #page, .container ,  body.boxed_layout header.menu-sticky ,body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container ,  body.full_width_layout  .elementor-section.elementor-section-boxed>.elementor-container{
                    max-width: 960px !important;
                }
        }

        @media (max-width: 991px)
        {
                 body.boxed_layout #page, .container ,  body.boxed_layout header.menu-sticky ,body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container ,  body.full_width_layout  .elementor-section.elementor-section-boxed>.elementor-container
                {
                    max-width: 720px !important;
                }
                body.boxed_layout #page 
                {
                    max-width: 90% !important;
                    max-width: calc(100% - 60px) !important;
                }
        }

        @media (max-width: 767px)
        {
                   body.boxed_layout #page, .container ,  body.boxed_layout header.menu-sticky ,body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container ,  body.full_width_layout  .elementor-section.elementor-section-boxed>.elementor-container
                {
                    max-width: 100% !important;

                } 
                body.boxed_layout .elementor-section.elementor-section-boxed>.elementor-container, body.boxed_layout .elementor-section.elementor-section-full_width>.elementor-container 
                {
                    padding: 0 15px;
                }
 
                body.boxed_layout #page
                {
                    max-width: 90% !important;
                    max-width: calc(100% - 30px) !important;
                }


        }";
    }     
    
    // Custom extra css
    $custom_css = get_option('custom_css');

    // enerzee apply inline style
    wp_add_inline_style( 'enerzee-style',
        $custom_css.
        $box_container_width
    );

   
}
add_action( 'wp_enqueue_scripts', 'enerzee_container_width', 21 );


function enerzee_loader_color() {
    //Set Loader Background Color
    $enerzee_option = get_option('enerzee_options');
    $loader_color="";
    if(isset($enerzee_option['loader_color'])){
        $loader_color = $enerzee_option['loader_color'];
    }    
    $ld_color = "";

    if( !empty($loader_color) && $loader_color != '#ffffff') {
        $ld_color .= "
        #loading {
            background : $loader_color !important;
        }";
    }
    wp_add_inline_style( 'enerzee-style', $ld_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_loader_color' , 20);

function enerzee_banner_title_hide() {     
    $enerzee_option = get_option('enerzee_options');
    $display_title="";
    if(isset($enerzee_option['display_title'])){
        $display_title =$enerzee_option['display_title'];
    }
    
    $display_title_style = "";  
          
        if( !empty($display_title) ) {
            if($display_title == "no")
            {
                 $display_title_style .= "
                .iq-breadcrumb-one h2.title{
                    display:none !important;
                }"; 
            }
        }    
    wp_add_inline_style( 'enerzee-style', $display_title_style );
}
add_action( 'wp_enqueue_scripts', 'enerzee_banner_title_hide' , 20);



function enerzee_header_sticky_bg_color() {
    $enerzee_option = get_option('enerzee_options');

  
    if(isset($enerzee_option['enerzee_header_sticky'])){
        if($enerzee_option['enerzee_header_sticky'] == "1"){
            $head_sticky_bg_color = $enerzee_option['header_sticky_bg_color'];   
            $header_sticky_bg_color_two = $enerzee_option['header_sticky_bg_color_two'];
            }
    }

    

    $header_sticky_bg_color = "";

    if(isset($enerzee_option['enerzee_header_sticky'])){ 
        if($enerzee_option['enerzee_header_sticky'] == "1"){
            if(!empty($header_sticky_bg_color_two)) {
                $header_sticky_bg_color .= "
                header.menu-sticky {
                        background-image: -moz-linear-gradient(0deg, $head_sticky_bg_color 0%, $header_sticky_bg_color_two 100%) !important;
                    background-image: -webkit-linear-gradient(0deg, $head_sticky_bg_color 0%, $header_sticky_bg_color_two 100%) !important;
                    background-image: -ms-linear-gradient(0deg, $head_sticky_bg_color 0%, $header_sticky_bg_color_two 100%) !important;
                }";
                }
            else
            {
                $header_sticky_bg_color .= "
                header.menu-sticky {
                    background : $head_sticky_bg_color !important;
                }";
            }
            }
    }
    
    wp_add_inline_style( 'enerzee-style', $header_sticky_bg_color );

}
add_action( 'wp_enqueue_scripts', 'enerzee_header_sticky_bg_color' , 20);




function enerzee_header_transparent() {
    $transparent = "";
 
    $enerzee_option = get_option('enerzee_options');
    if(isset($enerzee_option['header_transparent'])){
        if($enerzee_option['header_transparent'] == "1"){ 
     
            $transparent .= "
            header.style-one { 
                position: absolute;
                background : transparent;
            }"; 
            $transparent .= "
            header.style-one .sub-header {
                background: 
                transparent;
            }";
            $transparent .= "
            .admin-bar header.style-one {
                top: 30px;
            }";
        }
    }
   
   wp_add_inline_style( 'enerzee-style', $transparent );   
}
add_action( 'wp_enqueue_scripts', 'enerzee_header_transparent' , 20);



function enerzee_header_bg_color() { 
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['header_color'] == "2"){ 
    $head_bg_color = $enerzee_option['header_bg_color'];
    }

    $header_bg_color = "";
    
    if($enerzee_option['header_color'] == "2"){ 
        if(!empty($head_bg_color)) { 
        $header_bg_color .= "
         header {
            background : $head_bg_color !important;
        }"; 
        }
    }
    wp_add_inline_style( 'enerzee-style', $header_bg_color );
    
}
add_action( 'wp_enqueue_scripts', 'enerzee_header_bg_color' , 20);

function enerzee_header_text_color() { 
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['header_color'] == "2"){ 
        $head_text_color = $enerzee_option['header_text_color'];
    }

    $header_text_color = "";
    
    if($enerzee_option['header_color'] == "2"){ 
        if(!empty($head_text_color)) { 
            $header_text_color .= "
            header li .search-box .search-submit i, header ul.shop_list li.cart-btn .cart_count a i {
                color : $head_text_color !important;
            }"; 
        }
    }
    wp_add_inline_style( 'enerzee-style', $header_text_color );
    
}
add_action( 'wp_enqueue_scripts', 'enerzee_header_text_color' , 20);

function enerzee_header_link_color() {
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['header_color'] == "2"){
        $head_link_color = $enerzee_option['header_link_color'];
    $head_link_hover_color = $enerzee_option['header_link_hover_color'];
    }

    $header_link_color = "";

    if($enerzee_option['header_color'] == "2"){
        if(!empty($head_link_color)) {
            $header_link_color .= "
            header .navbar ul li a,header .navbar ul li .sub-menu li a ,header .navbar ul li.current-menu-ancestor .sub-menu li a, header .navbar ul li i, header .navbar ul li:hover .sub-menu li i,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link,header .navbar ul li:hover a,

        header #mega-menu-top li .mega-sub-menu li a,
            #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link
            {
                color : $head_link_color !important;
            }";


            if($head_link_color == '#ffffff'){
                 $header_link_color .= "
                    header .navbar ul li .sub-menu li a ,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link,   header #mega-menu-top li .mega-sub-menu li a,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-ancestor ul.mega-sub-menu li a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li:hover ul.mega-sub-menu li a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link,
                    {color:#1e1e1e !important;   background:#ffffff !important;}
                 ";


                  $header_link_color .= "
                         @media (max-width: 992px){
                            header .navbar ul#mega-menu-top li a, header .navbar ul#mega-menu-top li .sub-menu li a, header .navbar ul#mega-menu-top li.current-menu-ancestor .sub-menu li a, header .navbar ul#mega-menu-top li i, header .navbar ul#mega-menu-top li:hover .sub-menu li i, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link, header #mega-menu-top li .mega-sub-menu li a, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link{
                                color:#1e1e1e !important;   background:#ffffff !important;
                            }

                         }
                  ";
            }


        }
    if(!empty($head_link_hover_color)) {

            $header_link_color .= "
            header .navbar ul li .sub-menu li:hover, header .navbar ul li a:hover, header .navbar ul li.current-menu-item a, header .navbar ul li.current-menu-parent a, header .navbar ul li.current-menu-parent i, header .navbar ul li.current-menu-item i, header .navbar ul li:hover .mega-sub-menu li a:hover,  header .navbar ul li:hover i ,header .navbar ul li.current-menu-ancestor a, header .navbar ul li.current-menu-ancestor i,
            #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-menu-ancestor > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-page-ancestor > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-toggle-on > a.mega-menu-link,header .navbar ul li:hover a

            {
                color : $head_link_hover_color !important;
            }";

            $header_link_color .= "header .navbar ul li.current-menu-parent .sub-menu li a{
            color : $head_link_color !important;
            }";

            $header_link_color .= "header .navbar ul li .sub-menu li a:hover, header .navbar ul li .sub-menu li.current-menu-item a, header .navbar ul li .sub-menu li:hover>a, header .navbar ul li .sub-menu li .sub-menu li.menu-item:hover a, header .navbar ul li .sub-menu li.current-menu-parent a, header .navbar ul li .sub-menu li.current-menu-parent .sub-menu li.current-menu-item a,
            header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link:hover, header #mega-menu-top li .mega-sub-menu li:hover>a.mega-menu-link, header #mega-menu-top li .mega-sub-menu li.mega-current-menu-ancestor a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item:hover > a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link:hover, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link:hover, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link:focus, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link:focus, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-menu-item a.mega-menu-link:hover, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-menu-item a.mega-menu-link:focus, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-ancestor a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-ancestor ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-ancestor ul.mega-sub-menu li:hover a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li:hover a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li:hover ul.mega-sub-menu li:hover a.mega-menu-link,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-current-menu-item a.mega-menu-link,header #mega-menu-wrap-top #mega-menu-top li.mega-menu-item > ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link
            {
            background : $head_link_hover_color !important;
            color : #ffffff !important;
            }
            header .navbar ul li .sub-menu li .sub-menu li.menu-item a, header .navbar ul li .sub-menu li.current-menu-parent .sub-menu li a, header #mega-menu-wrap-top #mega-menu-top > li ul.mega-sub-menu li.mega-current-menu-ancestor ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-ancestor ul.mega-sub-menu li a.mega-menu-link, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li:hover  ul.mega-sub-menu li a.mega-menu-link , #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link{

                    background: #ffffff !important;
                    color: $head_link_color !important;
            }";

            $header_link_color .= "header .navbar ul li .sub-menu li:hover > i,header .navbar  ul li .sub-menu li.current-menu-ancestor i{
            color : #ffffff !important;
            }";

             if($head_link_color == '#ffffff'){
                 $header_link_color.="
                         header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li:hover ul.mega-sub-menu li a.mega-menu-link,header #mega-menu-top li .mega-sub-menu li a,#mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link ,header #mega-menu-wrap-top #mega-menu-top li.mega-menu-item > ul.mega-sub-menu li.mega-menu-item a.mega-menu-link{
                             color:#1e1e1e !important;   background:#ffffff !important;
                         }
                          header #mega-menu-wrap-top #mega-menu-top li.mega-menu-item > ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link{
                            background:$head_link_hover_color !important;
                              color : #ffffff !important;
                         }

                 ";
             }
            $header_link_color.="
            @media (max-width: 992px){
                header .navbar-light .navbar-toggler:hover ,header #mega-menu-wrap-top .mega-menu-toggle .mega-toggle-block-1:after{
                    background:$head_link_hover_color !important;
                    border-color:$head_link_hover_color !important;
                }
            }
            ";
        }

         $header_link_color.="
            @media (max-width: 992px){
                header .navbar-light .navbar-toggler {
                    background:$head_link_hover_color !important;
                    border-color:$head_link_hover_color !important;
                }
                header .navbar ul li a, header .navbar ul li .sub-menu li a, header .navbar ul li.current-menu-ancestor .sub-menu li a, header .navbar ul li i, header .navbar ul li:hover .sub-menu li i, header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-flyout ul.mega-sub-menu li.mega-current-menu-item a.mega-menu-link, header #mega-menu-top li .mega-sub-menu li a, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-menu-item > a.mega-menu-link
                               {background:transparent !important;
                               }
               header .navbar ul li.current-menu-parent>a,header .navbar ul li.current-menu-item a, header .navbar ul li a:hover ,header .navbar ul li .sub-menu li:hover, header .navbar ul li a:hover, header .navbar ul li.current-menu-item a, header .navbar ul li.current-menu-parent a, header .navbar ul li:hover .mega-sub-menu li a:hover,  header .navbar ul li.current-menu-ancestor a,  #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-menu-item > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-menu-ancestor > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-current-page-ancestor > a.mega-menu-link, #mega-menu-wrap-top #mega-menu-top > li.mega-menu-item.mega-toggle-on > a.mega-menu-link,header #mega-menu-wrap-top #mega-menu-top > li.mega-menu-megamenu > ul.mega-sub-menu li.mega-menu-column > ul.mega-sub-menu > li.mega-current-menu-item a.mega-menu-link,header .navbar ul li.current-menu-parent .sub-menu li.current-menu-item a, header .navbar ul li.current-menu-ancestor a, header .navbar ul li.current-menu-ancestor .sub-menu li.current-menu-ancestor a{
                    background:$head_link_hover_color !important;
                    color:#ffffff !important;
                }
 

                header .navbar ul li:hover i,header .navbar ul li.current-menu-ancestor i, header .navbar ul li.current-menu-parent i, header .navbar ul li.current-menu-item i{color:#ffffff !important;}
            }
            ";
    }
    wp_add_inline_style( 'enerzee-style', $header_link_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_header_link_color' , 20);



function enerzee_button_color() {
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['he_button_color'] == "2"){
        $hedaer_button_color = $enerzee_option['hedaer_button_color'];
        $hedaer_button_hover_color = $enerzee_option['hedaer_button_hover_color'];
        $hedaer_button_text_color = $enerzee_option['hedaer_button_text_color'];
        $hedaer_button_hover_text_color = $enerzee_option['hedaer_button_hover_text_color'];
    }

    $button_color = "";

    if($enerzee_option['he_button_color'] == "2"){
            $button_color .= "
            header .blue-btn.button {
                background: $hedaer_button_color !important;
            }";
            $button_color .= "
            header .blue-btn.button:hover {
                background: $hedaer_button_hover_color !important;
            }";
            $button_color .= "
            header .blue-btn.button a {
                color: $hedaer_button_text_color !important;
            }";
            $button_color .= "
            header .blue-btn.button a:hover {
                color: $hedaer_button_hover_text_color !important;
            }";
    }
    wp_add_inline_style( 'enerzee-style', $button_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_button_color' , 20);


function hex2rgb($hex) {
    $hex = str_replace("#", "", $hex);
 
    if(strlen($hex) == 3) {
       $r = hexdec(substr($hex,0,1).substr($hex,0,1));
       $g = hexdec(substr($hex,1,1).substr($hex,1,1));
       $b = hexdec(substr($hex,2,1).substr($hex,2,1));
    } else {
       $r = hexdec(substr($hex,0,2));
       $g = hexdec(substr($hex,2,2));
       $b = hexdec(substr($hex,4,2));
    }
    $rgb = array($r, $g, $b);
    
    return $rgb; // returns an array with the rgb values
 }
 
function enerzee_banner_title_color() {     
    //Set Body Color
    $enerzee_option = get_option('enerzee_options');
   
    $bn_title_color = "";

    if(isset($enerzee_option['bg_title_color']) && !empty($enerzee_option['bg_title_color']))
    {
     
        $bg_title_color = $enerzee_option['bg_title_color'];
        if(!empty($bg_title_color)){ 
            $bn_title_color .="
            .iq-breadcrumb-one h2{
                color: $bg_title_color !important;
            }"; 
        } 
    
     wp_add_inline_style( 'enerzee-style', $bn_title_color );
    }
}
add_action( 'wp_enqueue_scripts', 'enerzee_banner_title_color' , 20);

function enerzee_banner_padding() {     
    //Set Body Color
    $enerzee_option = get_option('enerzee_options');
   
    $bn_padding = "";

    if(isset($enerzee_option['banner_padding']) && !empty($enerzee_option['banner_padding']))
    {
     
        $banner_padding = $enerzee_option['banner_padding'];
        $top = $banner_padding['width'];
        $bottom = $banner_padding['height'];
       
        if(!empty($top) || !empty($bottom) ){ 
            $bn_padding .="
            .iq-breadcrumb-one{
                padding-top: $top !important;
                padding-bottom: $bottom !important;
            }"; 
        } 
    
     
    }

    if(isset($enerzee_option['banner_padding_responsive']) && !empty($enerzee_option['banner_padding_responsive']))
    {
     
        $banner_padding_responsive = $enerzee_option['banner_padding_responsive'];
        $top = $banner_padding_responsive['width'];
        $bottom = $banner_padding_responsive['height'];
       
        if(!empty($top) || !empty($bottom) ){ 
            $bn_padding .="
            @media only screen and (max-width: 991px) {
                .iq-breadcrumb-one {
                    padding-top: $top !important;
                    padding-bottom: $bottom !important;
                }
              }"; 
        } 
    
     
    }
    if(!empty($bn_padding))
    {
        wp_add_inline_style( 'enerzee-style', $bn_padding );
    }
    
}
add_action( 'wp_enqueue_scripts', 'enerzee_banner_padding' , 20);




function enerzee_bg_color() {
    //Set Background Color
    
    $enerzee_option = get_option('enerzee_options');
    $bg_color = '';
    $background_color = '';
    if(isset($enerzee_option['bg_type']) && !empty($enerzee_option['bg_type']))
    {
        if($enerzee_option['bg_type'] == "1"){
            if(isset($enerzee_option['bg_color']))
            {
                $bg_color = $enerzee_option['bg_color'];
                if( !empty($bg_color) && $bg_color != '#ffffff') {
                    $background_color .= "
                    .iq-bg-over {
                        background : $bg_color !important;
                    }"; 
                }
            }
        }
        if($enerzee_option['bg_type'] == "2"){
            if(isset($enerzee_option['banner_image']))
            {
                if(isset($enerzee_option['banner_image']['url']) && !empty($enerzee_option['banner_image']['url'])){

                    $bgurl = $enerzee_option['banner_image']['url'];
                    $background_color .= "
                    .iq-bg-over {
                        background : url('".$bgurl."') !important;
                    }"; 
                }
                
            }
        }
      
    
        wp_add_inline_style( 'enerzee-style', $background_color ); 
    }
}
add_action( 'wp_enqueue_scripts', 'enerzee_bg_color' , 20);

function enerzee_opacity_color() {
    //Set Background Opacity Color
    
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['bg_opacity'] == "3"){
    $bg_opacity = $enerzee_option['opacity_color']['rgba'];
    }
    $op_color = "";

   
        if($enerzee_option['bg_opacity'] == "3"){
        if( !empty($bg_opacity) && $bg_opacity != '#ffffff') {
            $op_color .= "
            .breadcrumb-video::before,.breadcrumb-bg::before, .breadcrumb-ui::before {
                position: absolute;
                content: '';
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;                
                background : $bg_opacity !important;
            }"; 
            }
        }
    
    wp_add_inline_style( 'enerzee-style', $op_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_opacity_color' , 20);

function enerzee_breadcrumbs_color() {
    //Set Background Opacity Color
    
    $enerzee_option = get_option('enerzee_options');
    $breadcrum_color = "";
    if($enerzee_option['display_breadcrumbs'] == "yes"){
        if(isset($enerzee_option['breadcrumbs_color']) && !empty($enerzee_option['breadcrumbs_color']))
        {
            $breadcrumbs_color = $enerzee_option['breadcrumbs_color'];
        }
    }
        if( !empty($breadcrumbs_color)){
            $breadcrum_color .= "
            .iq-breadcrumb-one ol li a, .iq-breadcrumb-one .breadcrumb-item.active, .iq-breadcrumb-one .breadcrumb-item + .breadcrumb-item::before {
                color : $breadcrumbs_color !important;
            }"; 

            wp_add_inline_style( 'enerzee-style', $breadcrum_color );
            }
    
    
}
add_action( 'wp_enqueue_scripts', 'enerzee_breadcrumbs_color' , 20);

function enerzee_breadcrumbs_hover_color() {
    //Set Background Opacity Color
   
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['display_breadcrumbs'] == "yes" && isset($enerzee_option['breadcrumbs_hover_color'])){
    $breadcrumbs_hover_color = $enerzee_option['breadcrumbs_hover_color'];
    }
    $breadcrum_hover_color = "";

    
        if( !empty($breadcrumbs_hover_color)){
            $breadcrum_hover_color .= "
            .iq-breadcrumb-one ol li a:hover, .iq-breadcrumb-one .breadcrumb-item.active {
                color : $breadcrumbs_hover_color !important;
            }"; 
            }
    
    wp_add_inline_style( 'enerzee-style', $breadcrum_hover_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_breadcrumbs_hover_color' , 20);

function enerzee_footer_color(){
    //Set Footer Background Color
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['footer_option'] == "2"){
        $f_color = $enerzee_option['footer_color']['rgba'];
        $footer_heading_color = $enerzee_option['footer_heading_color'];
        $footer_text_color = $enerzee_option['footer_text_color'];
        $footer_link_color = $enerzee_option['footer_link_color'];
    }
    $footer_color = "";
    
    if($enerzee_option['footer_option'] == "2"){
            $footer_color .= "
            .iq-over-dark-90::before {
                background : $f_color !important;
            }"; 
            $footer_color .= "
            footer .footer-top .footer-title,footer .testimonail-widget-menu .owl-carousel .owl-item .testimonial-info .testimonial-name h5,footer .testimonail-widget-menu .owl-carousel .owl-item .testimonial-info .testimonial-name .sub-title,footer .footer-top .text-white {
                color : $footer_heading_color !important;
            }"; 
            $footer_color .= "
            footer .widget ul li a, footer.footer-one .info-share li a, footer.footer-one ul.iq-contact li i, footer .testimonail-widget-menu .owl-carousel .owl-item .testimonial-info p, footer.footer-three .info-share li a {
                color : $footer_text_color !important;
            }";

            $rgb = hex2rgb($footer_link_color);
            $conrgb = '';
            $conrgb .= '('; 
            foreach($rgb as $rgba){
                $conrgb .= $rgba.',';
            }
                $conrgb .= '0.6)';

            $footer_color .= "
            footer.footer-one .widget ul li a:hover, footer .widget ul.menu li a:hover, footer.footer-one .info-share li a:hover ,footer .wp-video .mejs-overlay-button:before, footer.footer-three .info-share li a:hover{
                color : $footer_link_color !important;
            }

            footer .wp-video:before{
                background:rgba$conrgb;
            }";    
    }
    wp_add_inline_style( 'enerzee-style', $footer_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_footer_color' , 20);

function enerzee_footer_copyright(){
    //Set Footer Background Color
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['footer_copy_color'] == "2"){
        $footer_copyright_color = $enerzee_option['footer_copyright_color'];
    }
    $footer_copyright = "";
    
    if($enerzee_option['footer_copy_color'] == "2"){
            $footer_copyright .= "
            .copyright-footer .copyright {
                color : $footer_copyright_color !important;
            }";  
    }
    wp_add_inline_style( 'enerzee-style', $footer_copyright );
}
add_action( 'wp_enqueue_scripts', 'enerzee_footer_copyright' , 20);


function enerzee_footer_opacity_color() {
    $enerzee_option = get_option('enerzee_options');
    if($enerzee_option['footer_opacity'] == "2"){
    $f_op_color = $enerzee_option['footer_opacity_color']['rgba'];
    }
    $footer_opacity_color = "";
    
    if($enerzee_option['footer_opacity'] == "2"){
        if(!empty($f_op_color)) {
            $footer_opacity_color .= "
            .iq-over-dark-90::before {
                background : $f_op_color !important;
            }"; 
        }
    }
    wp_add_inline_style( 'enerzee-style', $footer_opacity_color );
}
add_action( 'wp_enqueue_scripts', 'enerzee_footer_opacity_color' , 20);
