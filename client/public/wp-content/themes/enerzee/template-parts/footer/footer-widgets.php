<?php
/**
* Displays footer widgets if assigned
*
* @package WordPress
* @subpackage enerzee
* @since 1.0
* @version 1.4.1
*/
?>
<?php
if( class_exists( 'ReduxFramework' ) )
{
    $enerzee_option = get_option('enerzee_options');
    if(!empty($enerzee_option['display_footer']))
    {
        $options = $enerzee_option['display_footer'];
        if($options == "yes"){ ?>
    <?php
    if ( is_active_sidebar( 'footer_1_sidebar' ) ||
    is_active_sidebar( 'footer_2_sidebar' )  ||
    is_active_sidebar( 'footer_3_sidebar' )  ||
    is_active_sidebar( 'footer_4_sidebar' )  ) :
    ?>
    <!-- Address -->
    <div class="footer-top">
         <div class="container">
             <div class="row">
            <?php
                $enerzee_options = get_option('enerzee_options');
                $options= $enerzee_options['enerzee_footer_width'];

                if($options == 1)
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-12 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php  }
                }

                if($options == 2)
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-6 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-6 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                }

                if($options == 3)
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 mt-4 mt-lg-0 mt-md-0">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-md-5 mt-4">
                            <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                        </div>
                    <?php }
                }

                if($options == 4)
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 mt-4 mt-lg-0 mt-md-0">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_4_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_4_sidebar' ); ?>
                        </div>
                    <?php }
                }

                if($options == 5)
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 mt-4 mt-lg-0 mt-md-0">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_4_sidebar' ) ) { ?>
                        <div class="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_4_sidebar' ); ?>
                        </div>
                    <?php }
                }

                if($options == 6)
                {
                   
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-2 col-md-6 col-sm-6 mt-4 mt-lg-0 mt-md-0">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                        <div class="col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_4_sidebar' ) ) { ?>
                        <div class="col-lg-4 col-md-6 col-sm-6 mt-lg-0 mt-4">
                            <?php dynamic_sidebar( 'footer_4_sidebar' ); ?>
                        </div>
                    <?php }
                }

                if(empty($options))
                {
                    if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                        </div>
                    <?php   }
                    if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                        </div>
                    <?php }
                    if( is_active_sidebar( 'footer_4_sidebar' ) ) { ?>
                        <div class="col-lg-3 col-md-6 col-sm-6 ">
                            <?php dynamic_sidebar( 'footer_4_sidebar' ); ?>
                        </div>
                    <?php }
                }
            ?>
             </div>
         </div>
    </div>
    <?php endif; ?>
    <?php
        }
    }
}
else
{
if ( is_active_sidebar( 'footer_1_sidebar' ) ||
is_active_sidebar( 'footer_2_sidebar' )  ||
is_active_sidebar( 'footer_3_sidebar' )  ||
is_active_sidebar( 'footer_4_sidebar' )  ) :
?>
<!-- Address -->
<div class="footer-top dummy-data">
    <div class="container">
    <div class="row">

                <?php
                if( is_active_sidebar( 'footer_1_sidebar' ) ) { ?>
                    <div class="col-lg-3 col-md-6 col-sm-6 ">
                        <?php dynamic_sidebar( 'footer_1_sidebar' ); ?>
                    </div>
                <?php   }
                if( is_active_sidebar( 'footer_2_sidebar' ) ) { ?>
                    <div class="col-lg-3 col-md-6 col-sm-6 ">
                        <?php dynamic_sidebar( 'footer_2_sidebar' ); ?>
                    </div>
                <?php }
                if( is_active_sidebar( 'footer_3_sidebar' ) ) { ?>
                    <div class="col-lg-3 col-md-6 col-sm-6 ">
                        <?php dynamic_sidebar( 'footer_3_sidebar' ); ?>
                    </div>
                <?php }
                if( is_active_sidebar( 'footer_4_sidebar' ) ) { ?>
                    <div class="col-lg-3 col-md-6 col-sm-6 ">
                        <?php dynamic_sidebar( 'footer_4_sidebar' ); ?>
                    </div>
                <?php } ?>

    </div>
    </div>
</div>
<?php endif;
}
?>
<!-- Address END -->
