
// Banner carousel
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (slides.length === 0) return;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach((slide) => slide.classList.remove('active'));
  indicators.forEach((indicator) => indicator.classList.remove('active'));

  slides[index].classList.add('active');

  if (indicators[index]) {
    indicators[index].classList.add('active');
  }

  currentSlide = index;
}

function restartSlideTimer() {
  clearInterval(slideTimer);

  if (slides.length > 1) {
    slideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }
}

if (slides.length > 0) {
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      restartSlideTimer();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      restartSlideTimer();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      restartSlideTimer();
    });
  });

  showSlide(currentSlide);
  restartSlideTimer();
}


// Login page interactions
const loginForm = document.querySelector('#login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const message = document.querySelector('#login-message');

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!email || !password) {
      if (message) {
        message.textContent = 'Please enter your email and password.';
      } else {
        window.alert('Please enter your email and password.');
      }
      return;
    }

    window.alert('Login successful!');
    window.location.href = 'courses.html';
  });
}


// Show / Hide password
const showPasswordButton = document.querySelector('#show-password');

if (showPasswordButton) {
  showPasswordButton.addEventListener('click', () => {
    const passwordInput = document.querySelector('#password');

    if (!passwordInput) return;

    const isHidden = passwordInput.type === 'password';

    passwordInput.type = isHidden ? 'text' : 'password';
    showPasswordButton.textContent = isHidden ? 'Hide' : 'Show';
  });
}


// Course details modal
const modalBackdrop = document.querySelector('#course-modal');

if (modalBackdrop) {
  const modalTitle = document.querySelector('#modal-title');
  const modalCourseName = document.querySelector('#modal-course-name');
  const modalDescription = document.querySelector('#modal-description');

  const modalCloseButtons =
    modalBackdrop.querySelectorAll('[data-close-modal]');

  document.querySelectorAll('.course-details').forEach((button) => {
    button.addEventListener('click', () => {
      // Keep the modal header as "Course Details"
      if (modalTitle) {
        modalTitle.textContent = 'Course Details';
      }

      // Show the selected course name below the header
      if (modalCourseName) {
        modalCourseName.textContent = button.dataset.title || '';
      }

      // Show the description for the selected course
      if (modalDescription) {
        modalDescription.textContent = button.dataset.description || '';
      }

      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');

      const closeButton = modalBackdrop.querySelector('.modal-close');

      if (closeButton) {
        closeButton.focus();
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
  }

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      modalBackdrop.classList.contains('open')
    ) {
      closeModal();
    }
  });
}
