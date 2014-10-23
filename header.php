<?php 
	$favicon = IMAGES . '/icons/favicon.png';
	$touch_icon = IMAGES . '/icons/apple-touch-icon-152x152-precomposed.png';
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>;?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<!-- mobile specific metas -->
	<meta name="viewport" content = "width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	
	<title><?php wp_title(' | ', true, 'right'); bloginfo('name'); ?></title>

	<!-- favicons and apple icons -->
	<link rel="shortcut icon" href="<?php echo $favicon; ?>">
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php  echo $touch_icon; ?>">


	<!-- main style -->
	<link rel="stylesheet" href="<?php echo THEMEROOT; ?>/style.css">
	
	<link rel='stylesheet'  href='<?php echo STYLES; ?>/ie10.css' type='text/css' media='all' />

	<!--[if lt IE 10]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link rel='stylesheet'  href='<?php echo STYLES; ?>/ie9.css' type='text/css' media='all' />
	<![endif]-->

	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link rel='stylesheet'  href='<?php echo STYLES; ?>/ie8.css' type='text/css' media='all' />
	<![endif]-->


	<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>

<a href="<?php  echo esc_url( home_url('/')); ?>" rel="home"></a>

<?php 

$args = array(
	'theme_location'  => 'main-menu',
	'container'       => 'div',
	'menu_class'      => 'menu',
	'name'            => 'main-menu',
    'container_class' => 'main-menu',
    'theme_location'  => 'main-menu'
);

wp_nav_menu( $args );

?>
