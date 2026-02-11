<?php
function enerzee_import_files()
{
    return array(
        array(
            'import_file_name'             => esc_html__('Demo', 'enerzee'),
            'local_import_file'            => trailingslashit(get_template_directory()) . 'inc/demo/demo/enerzee-xml.xml',
            'local_import_widget_file'     => trailingslashit(get_template_directory()) . 'inc/demo/demo/enerzee-widgets.wie',
            'local_import_customizer_file' => trailingslashit(get_template_directory()) . 'inc/demo/demo/enerzee-export.dat',
            'local_import_redux'           => array(
                array(
                    'file_path'   => trailingslashit(get_template_directory()) . 'inc/demo/demo/enerzee-redux.json',
                    'option_name' => 'enerzee_options',
                ),
            ),
            'import_preview_image_url'     => get_template_directory_uri() . '/inc/demo/preview_import_image.png',
            'import_notice'                => esc_html__('After you import this demo, you will have to setup the slider separately.', 'enerzee'),
            'preview_url'                  => 'https://wordpress.iqonic.design/enerzee/',
        ),
    );
}
add_filter('pt-ocdi/import_files', 'enerzee_import_files');

function enerzee_after_import_setup($selected_import)
{

    // Assign menus to their locations.
    $locations = get_theme_mod('nav_menu_locations'); // registered menu locations in theme
    $menus = wp_get_nav_menus(); // registered menus

    if ($menus) {
        foreach ($menus as $menu) { // assign menus to theme locations

            if ($menu->name == 'Main Menu' || $menu->name == 'main menu') {
                $locations['top'] = $menu->term_id;
            }
        }
    }
    set_theme_mod('nav_menu_locations', $locations); // set menus to locations 

    // Assign front page and posts page (blog page).
    $front_page_id = get_page_by_title('Home');
    $blog_page_id  = get_page_by_title('Blog');

    update_option('show_on_front', 'page');
    update_option('page_on_front', $front_page_id->ID);
    update_option('page_for_posts', $blog_page_id->ID);


    //Import Revolution Slider
    if (class_exists('RevSlider')) {
        $slider_array = array(
            get_template_directory() . "/inc/demo/slider/enerzee-1.zip",
            get_template_directory() . "/inc/demo/slider/enerzee-2.zip",
            get_template_directory() . "/inc/demo/slider/home-3.zip",
            get_template_directory() . "/inc/demo/slider/Project-Carousel.zip",
            get_template_directory() . "/inc/demo/slider/Project-Carousel1.zip",
            get_template_directory() . "/inc/demo/slider/Grid-Creative.zip",
        );

        $slider = new RevSlider();

        foreach ($slider_array as $filepath) {
            $slider->importSliderFromPost(true, true, $filepath);
        }
    }


    // remove default post
    wp_delete_post(1);
}
add_action('pt-ocdi/after_import', 'enerzee_after_import_setup');
