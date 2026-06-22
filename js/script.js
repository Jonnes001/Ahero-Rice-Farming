const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.top-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const videoModal = document.querySelector('.video-modal');
const modalVideo = document.getElementById('modal-video');
const videoTitle = document.getElementById('modal-video-title');
const videoClose = document.querySelector('.video-modal-close');
const slides = document.querySelectorAll('.slide');
const searchInput = document.querySelector('#variety-search');
let currentSlide = 0;

const nextSlide = () => {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
};

if (slides.length) {
  slides[currentSlide].classList.add('active');
  setInterval(nextSlide, 5000);
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const term = event.target.value.toLowerCase();
    const cards = document.querySelectorAll('.variety-card');
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const description = card.dataset.description.toLowerCase();
      card.style.display = title.includes(term) || description.includes(term) ? 'grid' : 'none';
    });
  });
}

const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      lightboxImage.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

const videoButtons = document.querySelectorAll('.open-video');
if (videoButtons.length) {
  videoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const source = button.dataset.video;
      const title = button.dataset.title;
      modalVideo.src = source;
      videoTitle.textContent = title;
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      modalVideo.play();
    });
  });
}

if (videoClose) {
  videoClose.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
    document.body.style.overflow = '';
  });
}

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) {
      videoModal.classList.remove('active');
      modalVideo.pause();
      modalVideo.currentTime = 0;
      document.body.style.overflow = '';
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const animatedSections = document.querySelectorAll('.fade-up');
if (animatedSections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });
  animatedSections.forEach(section => observer.observe(section));
}
