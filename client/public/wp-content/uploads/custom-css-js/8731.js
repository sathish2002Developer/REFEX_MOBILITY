<!-- start Simple Custom CSS and JS -->
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const prevButtons = document.querySelectorAll('.elementor-swiper-button-prev');
    const nextButtons = document.querySelectorAll('.elementor-swiper-button-next');

    prevButtons.forEach(btn => btn.setAttribute('aria-label', 'Previous Slide'));
    nextButtons.forEach(btn => btn.setAttribute('aria-label', 'Next Slide'));
  });
</script><!-- end Simple Custom CSS and JS -->
