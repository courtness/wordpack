
      <footer class="wordpack-footer">
      </footer>
    </div><!-- .wrap -->

    <?php if ( ENVIRONMENT == 'development' ): ?>
      <script type="text/javascript" src="<?php wordpack_include( 'dist/js/app.js', true ) ?>"></script>
    <?php else : ?>
      <script type="text/javascript" src="<?php wordpack_include( 'dist/js/app.min.js', true ) ?>"></script>
    <?php endif ?>

    <?php wp_footer(); ?>
  </body>
</html>
