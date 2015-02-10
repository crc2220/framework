<?php 
//define constants//
define( 'ROOT', get_template_directory_uri() );
define( 'IMG', ROOT . '/img' );
define( 'CSS', ROOT . '/css' );
define( 'JS', ROOT . '/js' );
define( 'BOWER', ROOT . '/js/lib' );


//THEME SUPPORT//
//add support for different post formats
add_theme_support( 'post-formats', 
  array(
    'gallery', 
    'link',
    'image',
    'quote', 
    'video',
    'audio'
    )
 );
// add support for uploading svg files
function mime_types($mimes){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
} 
add_filter( 'upload_mimes', 'mime_types' );
//add support for automatic feed links
add_theme_support( 'automatic-feed-links' );
//add support for post thumbnails
add_theme_support( 'post-thumbnails' );
//add support for menus
add_theme_support('menus');
//register nav menus
register_nav_menus(
  array(
    'main-menu' => __( 'Main Menu', 'wmi' )
  )
);
//make theme available for translation//
$lang_dir = ROOT . '/languages';
load_theme_textdomain( 'wmi', $lang_dir );


//css//
function load_css(){
	wp_enqueue_style( 'style', ROOT . '/style.css' );
}    
add_action('wp_enqueue_scripts', 'load_css' );

//js//
function load_js() {
  wp_deregister_script('jquery');

  wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js", false, null);
  wp_register_script( 'touche', SCRIPTS . '/touche.min.js');
  wp_register_script( 'main', SCRIPTS . '/main.min.js');


  wp_enqueue_script('jquery');
  wp_enqueue_script('touche');
  wp_enqueue_script('main');
}
add_action( 'wp_enqueue_scripts', 'load_js' );

/**
 * Load Enqueued Scripts in the Footer
 *
 * Automatically move JavaScript code to page footer, speeding up page loading time.
 */
function footer_enqueue_scripts() {
   remove_action('wp_head', 'wp_print_scripts');
    remove_action('wp_head', 'wp_print_head_scripts', 9);
    remove_action('wp_head', 'wp_enqueue_scripts', 1);
    add_action('wp_footer', 'wp_print_scripts', 5);
    add_action('wp_footer', 'wp_enqueue_scripts', 5);
    add_action('wp_footer', 'wp_print_head_scripts', 5);
}
add_action('after_setup_theme', 'footer_enqueue_scripts');


//WIDGETS//
function create_widget($name, $id, $description) {
	register_sidebar(array(
		'name' => __( $name , 'uikit' ),	 
		'id' => $id, 
		'description' => __( $description ),
		'before_widget' => ' ',
		'after_widget' => ' ',
		'before_title' => '<h5>',
		'after_title' => '</h5>'
	));
}
create_widget('Twitter', 'twitter', 'This is the twitter widget area');
create_widget('Newsletter', 'newsletter', 'This is the newsletter widget area');



//CUSTOM//
//custom featured image sizes
add_image_size('featuredImageNavList', 70, 70, true);

//excerpt limit//
function get_excerpt($count){
  $permalink = get_permalink($post->ID);
  $excerpt = get_the_content();
  $excerpt = strip_tags($excerpt);
  $excerpt = substr($excerpt, 0, $count);
  $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
  $excerpt = $excerpt.'... <a href="'.$permalink.'">read more</a>';
  return $excerpt;
}

// read more 
function custom_excerpt_more($post) {
  return '<a href="'.get_permalink($post->ID).'" class="read-more"></br>'.'Continue Reading'.'</a>';
}
add_filter('excerpt_more', 'custom_excerpt_more');


//breadcrumbs//
function the_breadcrumb() {
    global $post;
    echo '<ul id="breadcrumbs">';
    if (!is_home()) {
        echo '<li><a href="';
        echo get_option('home');
        echo '">';
        echo 'Home';
        echo '</a></li><li class="separator"> / </li>';
        if (is_category() || is_single()) {
            echo '<li>';
            the_category(' </li><li class="separator"> / </li><li> ');
            if (is_single()) {
                echo '</li><li class="separator"> / </li><li>';
                the_title();
                echo '</li>';
            }
        } elseif (is_page()) {
            if($post->post_parent){
                $anc = get_post_ancestors( $post->ID );
                $title = get_the_title();
                foreach ( $anc as $ancestor ) {
                    $output = '<li><a href="'.get_permalink($ancestor).'" title="'.get_the_title($ancestor).'">'.get_the_title($ancestor).'</a></li> <li class="separator">/</li>';
                }
                echo $output;
                echo '<strong title="'.$title.'"> '.$title.'</strong>';
            } else {
                echo '<li><strong> '.get_the_title().'</strong></li>';
            }
        }
    }
    elseif (is_tag()) {single_tag_title();}
    elseif (is_day()) {echo"<li>Archive for "; the_time('F jS, Y'); echo'</li>';}
    elseif (is_month()) {echo"<li>Archive for "; the_time('F, Y'); echo'</li>';}
    elseif (is_year()) {echo"<li>Archive for "; the_time('Y'); echo'</li>';}
    elseif (is_author()) {echo"<li>Author Archive"; echo'</li>';}
    elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {echo "<li>Blog Archives"; echo'</li>';}
    elseif (is_search()) {echo"<li>Search Results"; echo'</li>';}
    echo '</ul>';
}


//get categories related to current post in the loop 
function the_category_unlinked($separator = ' ') {
    $categories = (array) get_the_category();
    
    $thelist = '';
    foreach($categories as $category) {    // concate
        $thelist .= $separator . $category->category_nicename;}
  
    echo $thelist;
}

/* pagination */
function wpbeginner_numeric_posts_nav() {
    if( is_singular() )
        return;
    global $wp_query;
    /** Stop execution if there's only 1 page */
    if( $wp_query->max_num_pages <= 1 )
        return;
    $paged = get_query_var( 'paged' ) ? absint( get_query_var( 'paged' ) ) : 1;
    $max   = intval( $wp_query->max_num_pages );
    /** Add current page to the array */
    if ( $paged >= 1 )
        $links[] = $paged;
    /** Add the pages around the current page to the array */
    if ( $paged >= 3 ) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }
    if ( ( $paged + 2 ) <= $max ) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }
    echo '<div class="navigation"><ul>' . "\n";
    /** Previous Post Link */
    if ( get_previous_posts_link() )
        printf( '<li>%s</li>' . "\n", get_previous_posts_link() );
    /** Link to first page, plus ellipses if necessary */
    if ( ! in_array( 1, $links ) ) {
        $class = 1 == $paged ? ' class="active"' : '';

        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( 1 ) ), '1' );

        if ( ! in_array( 2, $links ) )
            echo '<li>…</li>';
    }
    /** Link to current page, plus 2 pages in either direction if necessary */
    sort( $links );
    foreach ( (array) $links as $link ) {
        $class = $paged == $link ? ' class="active"' : '';
        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $link ) ), $link );
    }
    /** Link to last page, plus ellipses if necessary */
    if ( ! in_array( $max, $links ) ) {
        if ( ! in_array( $max - 1, $links ) )
            echo '<li>…</li>' . "\n";

        $class = $paged == $max ? ' class="active"' : '';
        printf( '<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url( get_pagenum_link( $max ) ), $max );
    }
    /** Next Post Link */
    if ( get_next_posts_link() )
        printf( '<li>%s</li>' . "\n", get_next_posts_link() );

    echo '</ul></div>' . "\n";
}

// detect if device is mobile
$mobile = array('iPhone', 'Android', 'webOS', 'BlackBerry', 'iPod'); //etc add more
function isMobile(){
  global $mobile;
  foreach($mobile as $agent){

     if ( strpos($_SERVER['HTTP_USER_AGENT'], $agent) ){
         //mobile detected
         //or return its name, do it the way you like
         return true;
     }
  }
}

//data uri 
function get_data_uri($file) {

    $contents = file_get_contents($file);
    $base64 = base64_encode($contents);
    $imagetype = exif_imagetype($file);
    $mime = image_type_to_mime_type($imagetype);
  
    return "data:$mime;base64,$base64";
}

function data_uri($file) {
    return get_data_uri($file);
}

//ADMIN VIEW//
// add a favicon for your admin
function admin_favicon() {
	echo '<link rel="icon" type="image/ico" href="'. IMAGES .'/icons/favicon-admin.ico" />';
}
add_action('admin_head', 'admin_favicon');
// custom admin login logo
function custom_login_logo() {
	echo '<style type="text/css">
	h1 a { background-image: url('.get_bloginfo('template_directory').'/img/custom-login-logo.png) !important; }
	</style>';
}
add_action('login_head', 'custom_login_logo');

//show page ids
// Set columns to be used in the Pages section
function custom_set_pages_columns($columns) {
    return array(
        'cb'      => '<input type="checkbox" />',
        'title'   => __('Title'),
        'page_id' => __('ID'),
        'author'  => __('Author'),
        'date'    => __('Date')
    );
}
// Add the ID to the page ID column
function custom_set_pages_columns_page_id($column, $post_id) {
    if ($column == 'page_id') {
        echo $post_id;
    }
}
// Add custom styles to the page ID column
function custom_admin_styling() {
    echo '<style type="text/css">',
         'th#page_id { width:60px; }',
         '</style>';
}
// Add filters and actions
add_filter('manage_edit-page_columns',   'custom_set_pages_columns');
add_action('manage_pages_custom_column', 'custom_set_pages_columns_page_id', 10, 2);
add_action('admin_head',                 'custom_admin_styling');


?>