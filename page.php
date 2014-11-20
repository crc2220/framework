<?php get_header(); ?>

		<?php if( have_posts() ) : while( have_posts() ): ?>
			<?php the_post(); ?>
				WMI
		<?php endwhile; ?>
	<?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
