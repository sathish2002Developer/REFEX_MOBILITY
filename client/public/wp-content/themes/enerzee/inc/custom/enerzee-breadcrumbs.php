<?php
function enerzee_display_header()
{
   $enerzee_option = get_option('enerzee_options');
   if (!is_front_page()) {
?>
      <div class="text-left iq-breadcrumb-one <?php enerzee_banner_class(); ?>">
         <div class="container">
            <?php
            $options = isset($enerzee_option['bg_image']) ? $enerzee_option['bg_image'] : '';

            if ($options == '1') {
            ?>
               <div class="row align-items-center">
                  <div class="col-sm-12">
                     <nav aria-label="breadcrumb" class="text-center iq-breadcrumb-two">
                        <h2 class="title">
                           <?php
                           if (is_404()) {
                              if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                                 echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                              } else {
                                 echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                              }
                           } else {
                              wp_title('');
                           }
                           ?>
                        </h2>
                        <?php
                        if (isset($enerzee_option['display_breadcrumbs'])) {
                           $options = $enerzee_option['display_breadcrumbs'];
                           if ($options == "yes") {
                        ?>
                              <ol class="breadcrumb main-bg">
                                 <?php echo enerzee_custom_breadcrumbs(); ?>
                              </ol>
                        <?php
                           }
                        }
                        ?>
                     </nav>
                  </div>
               </div>
            <?php } elseif ($options == '2') {
            ?>
               <div class="row align-items-center">
                  <div class="col-lg-12 col-md-12 text-left align-self-center">
                     <nav aria-label="breadcrumb" class="text-left">
                        <h2 class="title">
                           <?php
                           if (is_404()) {
                              if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                                 echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                              } else {
                                 echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                              }
                           } else {
                              wp_title('');
                           }
                           ?>
                        </h2>
                        <?php
                        if (isset($enerzee_option['display_breadcrumbs'])) {
                           $options = $enerzee_option['display_breadcrumbs'];
                           if ($options == "yes") {
                        ?>
                              <ol class="breadcrumb main-bg">
                                 <?php echo enerzee_custom_breadcrumbs(); ?>
                              </ol>
                        <?php
                           }
                        }
                        ?>
                     </nav>
                  </div>
               </div>
            <?php } elseif ($options == '3') {
            ?>
               <div class="row align-items-center">
                  <div class="col-lg-12 col-md-12 text-left align-self-center">
                     <nav aria-label="breadcrumb" class="text-right iq-breadcrumb-two">
                        <h2 class="title">
                           <?php
                           if (is_404()) {
                              if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                                 echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                              } else {
                                 echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                              }
                           } else {
                              wp_title('');
                           }
                           ?>
                        </h2>
                        <?php
                        if (isset($enerzee_option['display_breadcrumbs'])) {
                           $options = $enerzee_option['display_breadcrumbs'];
                           if ($options == "yes") {
                        ?>
                              <ol class="breadcrumb main-bg">
                                 <?php echo enerzee_custom_breadcrumbs(); ?>
                              </ol>
                        <?php
                           }
                        }
                        ?>
                     </nav>
                  </div>
               </div>
            <?php } elseif ($options == '4') {
            ?>
               <div class="row align-items-center iq-breadcrumb-three">
                  <div class="col-sm-6 mb-3 mb-lg-0 mb-md-0">
                     <h2 class="title">
                        <?php
                        if (is_404()) {
                           if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                              echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                           } else {
                              echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                           }
                        } else {
                           wp_title('');
                        }
                        ?>
                     </h2>
                  </div>
                  <div class="col-sm-6 ext-lg-right text-md-right text-sm-left">
                     <nav aria-label="breadcrumb" class="iq-breadcrumb-two">
                        <?php
                        if (isset($enerzee_option['display_breadcrumbs'])) {
                           $options = $enerzee_option['display_breadcrumbs'];
                           if ($options == "yes") {
                        ?>
                              <ol class="breadcrumb main-bg">
                                 <?php echo enerzee_custom_breadcrumbs(); ?>
                              </ol>
                        <?php
                           }
                        }
                        ?>
                     </nav>
                  </div>
               </div>
            <?php } elseif ($options == '5') {
            ?>
               <div class="row align-items-center iq-breadcrumb-three">
                  <div class="col-sm-6 mb-3 mb-lg-0 mb-md-0">
                     <nav aria-label="breadcrumb" class="text-left iq-breadcrumb-two">
                        <?php
                        if (isset($enerzee_option['display_breadcrumbs'])) {
                           $options = $enerzee_option['display_breadcrumbs'];
                           if ($options == "yes") {
                        ?>
                              <ol class="breadcrumb main-bg">
                                 <?php echo enerzee_custom_breadcrumbs(); ?>
                              </ol>
                        <?php
                           }
                        }
                        ?>
                     </nav>
                  </div>
                  <div class="col-sm-6">
                     <h2 class="title text-lg-right text-md-right text-sm-left">
                        <?php
                        if (is_404()) {
                           if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                              echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                           } else {
                              echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                           }
                        } else {
                           wp_title('');
                        }
                        ?>
                     </h2>
                  </div>
               </div>
            <?php } else {
            ?>
               <div class="row align-items-center">
                  <div class="col-sm-12">
                     <nav aria-label="breadcrumb" class="text-left">
                        <h2 class="title">
                           <?php
                           if (is_404()) {
                              if (!empty($enerzee_option['enerzee_fourzerofour_title'])) {
                                 echo esc_html($enerzee_option['enerzee_fourzerofour_title']);
                              } else {
                                 echo esc_html__('Oops! This Page is Not Found.', 'enerzee');
                              }
                           } else {
                              wp_title('');
                           }
                           ?>
                        </h2>
                        <ol class="breadcrumb main-bg">
                           <?php echo enerzee_custom_breadcrumbs(); ?>
                        </ol>
                     </nav>
                  </div>
               </div>
            <?php } ?>
         </div>
      </div>
<?php
   }
}
