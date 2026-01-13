<?php
add_action( 'wp_enqueue_scripts', 'enerzee_enqueue_styles' ,99);

function enerzee_enqueue_styles() {
	    $parent_style = 'parent-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.
    wp_enqueue_style( 'parent-style', get_stylesheet_directory_uri() . '/style.css'); 
    wp_enqueue_style( 'child-style',get_stylesheet_directory_uri() . '/style.css');
}

/**
  * Set up My Child Theme's textdomain.
  *
  * Declare textdomain for this child theme.
  * Translations can be added to the /languages/ directory.
  */
function enerzee_child_theme_setup() {
    load_child_theme_textdomain( 'enerzee', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'enerzee_child_theme_setup' );


function hide_feedback_permalink_field() {
    global $post;

    // Check if we're editing the 'feedbacks' custom post type
    if ($post && $post->post_type === 'feedbacks') {
        echo '<style>#edit-slug-box { display: none !important; }</style>';
    }
}
add_action('admin_head-post.php', 'hide_feedback_permalink_field');
add_action('admin_head-post-new.php', 'hide_feedback_permalink_field');


function register_feedbacks_post_type() {
    register_post_type('feedbacks',
        array(
            'labels' => array(
                'name' => __('Feedbacks'),
                'singular_name' => __('Feedback'),
            ),
            'public' => true,
           'rewrite' => false,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
        )
    );
}
add_action('init', 'register_feedbacks_post_type');


function feedbacks_swiper_slider_shortcode() {
    wp_enqueue_style('swiper-css', 'https://unpkg.com/swiper/swiper-bundle.min.css');
    wp_enqueue_script('swiper-js', 'https://unpkg.com/swiper/swiper-bundle.min.js', array(), null, true);

    ob_start();
    ?>
    <style>
       
    </style>
<div class="testimonials-reviews">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php
            $args = array(
                'post_type' => 'feedbacks',
                'posts_per_page' => -1,
            );
            $feedbacks = new WP_Query($args);
            if ($feedbacks->have_posts()) :
                while ($feedbacks->have_posts()) : $feedbacks->the_post();
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail') ?: 'https://via.placeholder.com/50';
                    ?>
                    <div class="swiper-slide">
                      <div class="swiper-main-sec">
                        <div class="testimonial-user">
                            <img src="<?php echo esc_url($image_url); ?>" alt="User Image">
                            <div>
                                <div class="testimonial-user-name"><?php the_title(); ?></div>
                                <div class="testimonial-location"><?php echo get_post_meta(get_the_ID(), 'location', true); ?></div>
                            </div>
                        </div>
                        <div class="testimonial-text"><?php the_content(); ?></div>
                    </div>
                    </div>
                <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
 <div class="swiper-controls">
  <div class="swipers-btn-sec">
    <div class="swiper-button-prev custom-arrow"></div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next custom-arrow"></div>
  </div>
  </div>
    </div>
          </div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        new Swiper('.swiper-container', {
            loop: true,
            centeredSlides: true,
            spaceBetween: 60,
            slidesPerView: 'auto', // enables dynamic width

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // breakpoints: {
            //     320: {
            //         slidesPerView: 1.1,
            //         spaceBetween: 16,
            //     },
            //     768: {
            //         slidesPerView: 1.4,
            //         spaceBetween: 24,
            //     },
            //     1024: {
            //         slidesPerView: 1.8,
            //         spaceBetween: 30,
            //     },
            //     1200: {
            //         slidesPerView: 1.9,
            //         spaceBetween: 40,
            //     },
            //     1400: {
            //         slidesPerView: 2,
            //         spaceBetween: 40,
            //     }
            // }
        });
    });
</script>


    <?php
    return ob_get_clean();
}
add_shortcode('feedbacks_slider', 'feedbacks_swiper_slider_shortcode');




/*Ride option */

function register_rides_post_type() {
    register_post_type('rides',
        array(
            'labels' => array(
                'name' => __('Rides'),
                'singular_name' => __('Ride')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail'),
            'rewrite' => array('slug' => 'rides'),
            'menu_icon' => 'dashicons-car',
        )
    );
}
add_action('init', 'register_rides_post_type');

function rides_swiper_shortcode() {
    ob_start();

    $args = array(
        'post_type' => 'rides',
        'posts_per_page' => -1,
    );
    $rides = new WP_Query($args);

    if ($rides->have_posts()) : ?>
        <div class="swiper rides-swiper">
            <div class="swiper-wrapper">
                <?php while ($rides->have_posts()) : $rides->the_post(); ?>
                    <div class="swiper-slide">
                        <div class="ride-card">
                            <div class="ride-image">
                                <?php the_post_thumbnail('medium'); ?>
                            </div>
                            <div class="ride-content">
                                <h3 class="ride-title"><?php the_title(); ?></h3>
                                <p class="ride-description"><?php echo wp_trim_words(get_the_content(), 25); ?></p>
                                <a href="<?php the_field('ride-btn-url'); ?>" class="ride-btn"><?php the_field('ride-btn'); ?></a>
                            </div>
                        </div>
                    </div>
                <?php endwhile; ?>
            </div>

            <!-- Navigation -->
            <!-- <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div> -->
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function () {
            new Swiper('.rides-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // breakpoints: {
                //     0: {
                //         slidesPerView: 1,
                //         centeredSlides: true
                //     },
                //     768: {
                //         slidesPerView: 'auto',
                //         centeredSlides: true
                //     }
                // }
            });
        });
        </script>
    <?php endif;

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('rides_swiper', 'rides_swiper_shortcode');

