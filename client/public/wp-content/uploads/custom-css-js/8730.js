<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function () {
    const prevButtons = document.querySelectorAll('.elementor-swiper-button-prev');
    const nextButtons = document.querySelectorAll('.elementor-swiper-button-next');

    prevButtons.forEach(btn => btn.setAttribute('aria-label', 'Previous Slide'));
    nextButtons.forEach(btn => btn.setAttribute('aria-label', 'Next Slide'));
	  
	const backToTopLink = document.querySelector('a#top');
    if (backToTopLink) {
      backToTopLink.setAttribute('aria-label', 'Back to top');
    }
	  
	  
	  const domainsToPrefetch = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//ajax.googleapis.com',
      '//www.googletagmanager.com',
      '//cdnjs.cloudflare.com'
    ];

    domainsToPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
	  
  });
</script>
<!-- end Simple Custom CSS and JS -->
