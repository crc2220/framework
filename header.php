<?php 
	$favicon = IMG . '/icons/favicon.png';
	$touch_icon = IMG . '/icons/apple-touch-icon-152x152-precomposed.png';
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>;?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<!-- social -->
	<!-- facebook -->
	<!-- images must be at least 200px x 200px -->
	<!-- <meta property="og:locale" content="en_US">
	<meta property="og:type" content="article">
	<meta property="og:site_name" content="Thinking Ahead Business Series">
	<meta property="og:url" content="https://thinkingahead.capitalbankmd.com/">
	<meta property="og:title" content="Thinking Ahead Business Series">
	<meta property="og:description" content="Social Media Strategies for Business Success -- Get the Conversation Started Thursday December 4th, 2014 | | 4:00pm – 5:30pm Join us for a complimentary session as Capital Bank presents David Nelsen, a social media pioneer and award winning CEO, who will outline key social media strategies to connect with audiences and improve your business performance.">
	<meta property="og:image" content="https://thinkingahead.capitalbankmd.com/wp-content/uploads/2014/10/tabs-social-sharing-thumbnail.jpg"> -->
	<!-- twitter -->
	<!-- <meta name="twitter:site" content="@CompanyName">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Thinking Ahead Business Series">
	<meta name="twitter:description" content="Social Media Strategies for Business Success -- Get the Conversation Started Thursday December 4th, 2014 | | 4:00pm – 5:30pm ">
	<meta name="twitter:image" content="https://thinkingahead.capitalbankmd.com/wp-content/uploads/2014/10/tabs-social-sharing-thumbnail.jpg/"> -->

	<!-- mobile specific metas -->
	<meta name="viewport" content = "width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	
	<title><?php wp_title(' | ', true, 'right'); bloginfo('name'); ?></title>

	<!-- favicons and apple icons -->
	<link rel="shortcut icon" href="<?php echo $favicon; ?>">
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php  echo $touch_icon; ?>">

	<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel='stylesheet'  href='<?php echo CSS; ?>/ie10.css' type='text/css' media='all' />

	<!--[if lt IE 10]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link rel='stylesheet'  href='<?php echo CSS; ?>/ie9.css' type='text/css' media='all' />
	<![endif]-->

	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<link rel='stylesheet'  href='<?php echo CSS; ?>/ie8.css' type='text/css' media='all' />
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
