document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav a');
  const contentDiv = document.getElementById('content');

  // Function to load page fragments
  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
      .then(html => {
        contentDiv.innerHTML = html;
      })
      .catch(err => {
        contentDiv.innerHTML = '<p>Sorry, content could not be loaded.</p>';
        console.error('Load error:', err);
      });
  }

  // Navigation click handlers
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      loadPage(link.dataset.page);
    });
  });

  // Initial content load
  loadPage('services');

  // Image slider setup
  const slides = document.querySelectorAll('.slider .slide');
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
});
