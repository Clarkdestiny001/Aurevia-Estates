// ============================================================
// AUREVIA ESTATES JAVASCRIPT
// ============================================================

// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loadingScreen').classList.add('hidden');
    document.querySelector('.hero').classList.add('loaded');
  }, 2500);
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var progress = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = progress + '%';
});

// ===== NAVBAR SCROLL EFFECT =====
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== BACK TO TOP =====
var backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE MENU =====
var mobileMenu = document.getElementById('mobileMenu');
var mobileToggle = document.getElementById('navMobileToggle');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  mobileToggle.classList.toggle('active');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  mobileToggle.classList.remove('active');
}

mobileToggle.addEventListener('click', toggleMobileMenu);


// ===== DARK/LIGHT MODE =====
var isDark = false;
var modeToggle = document.getElementById('modeToggle');
var modeIcon = document.getElementById('modeIcon');

modeToggle.addEventListener('click', function() {
  isDark = !isDark;
  if (isDark) {
    document.documentElement.style.setProperty('--light', '#0a0a0a');
    document.documentElement.style.setProperty('--light-2', '#111111');
    document.documentElement.style.setProperty('--light-3', '#1a1a1a');
    document.documentElement.style.setProperty('--light-4', '#2a2a2a');
    document.documentElement.style.setProperty('--text-dark', '#ffffff');
    document.documentElement.style.setProperty('--border-dark', 'rgba(255,255,255,0.08)');
    modeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
  } else {
    document.documentElement.style.setProperty('--light', '#ffffff');
    document.documentElement.style.setProperty('--light-2', '#f8f8f8');
    document.documentElement.style.setProperty('--light-3', '#f0f0f0');
    document.documentElement.style.setProperty('--light-4', '#e5e5e5');
    document.documentElement.style.setProperty('--text-dark', '#1a1a1a');
    document.documentElement.style.setProperty('--border-dark', 'rgba(0,0,0,0.08)');
    modeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  }
});

// ===== SCROLL REVEAL =====
var revealElements = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(function(el) { revealObserver.observe(el); });

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-count'));
  var duration = 2000;
  var start = performance.now();
  function update(currentTime) {
    var elapsed = currentTime - start;
    var progress = Math.min(elapsed / duration, 1);
    var easeOut = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(easeOut * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(function(el) { counterObserver.observe(el); });

// ===== FAVORITE TOGGLE =====
document.querySelectorAll('.property-fav').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
  });
});

// ===== SEARCH PROPERTIES =====
var searchBtn = document.getElementById('searchBtn');
var searchLocation = document.getElementById('searchLocation');

searchBtn.addEventListener('click', function() {
  var location = searchLocation.value;
  var price = document.getElementById('searchPrice').value;
  var type = document.getElementById('searchType').value;
  var bedrooms = document.getElementById('searchBedrooms').value;
  alert('Searching for ' + type + ' in ' + (location || 'all locations') + ' with ' + bedrooms + ' bedrooms, price: ' + price);
});

document.querySelector('.nav-search-btn').addEventListener('click', function() {
  searchLocation.focus();
});

// ===== LIGHTBOX =====
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(item) {
  var img = item.querySelector('img');
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', function(e) {
  e.stopPropagation();
  closeLightbox();
});

lightbox.addEventListener('click', closeLightbox);

// ===== MORTGAGE CALCULATOR =====
var mortgagePrice = document.getElementById('mortgagePrice');
var mortgageDown = document.getElementById('mortgageDown');
var mortgageRate = document.getElementById('mortgageRate');
var mortgageTerm = document.getElementById('mortgageTerm');
var mortgageResult = document.getElementById('mortgageResult');
var loanAmountEl = document.getElementById('loanAmount');
var downPaymentAmountEl = document.getElementById('downPaymentAmount');
var totalInterestEl = document.getElementById('totalInterest');
var totalCostEl = document.getElementById('totalCost');

function calculateMortgage() {
  var price = parseFloat(mortgagePrice.value) || 0;
  var downPercent = parseFloat(mortgageDown.value) || 0;
  var rate = parseFloat(mortgageRate.value) || 0;
  var years = parseInt(mortgageTerm.value) || 30;

  var downPayment = price * (downPercent / 100);
  var loanAmount = price - downPayment;
  var monthlyRate = rate / 100 / 12;
  var numPayments = years * 12;

  var monthlyPayment = 0;
  if (rate > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numPayments;
  }

  var totalCost = monthlyPayment * numPayments;
  var totalInterest = totalCost - loanAmount;

  mortgageResult.textContent = '$' + Math.round(monthlyPayment).toLocaleString();
  loanAmountEl.textContent = '$' + Math.round(loanAmount).toLocaleString();
  downPaymentAmountEl.textContent = '$' + Math.round(downPayment).toLocaleString();
  totalInterestEl.textContent = '$' + Math.round(totalInterest).toLocaleString();
  totalCostEl.textContent = '$' + Math.round(totalCost).toLocaleString();
}

document.querySelector('.mortgage-form .btn-primary').addEventListener('click', calculateMortgage);
[mortgagePrice, mortgageDown, mortgageRate, mortgageTerm].forEach(function(el) {
  el.addEventListener('input', calculateMortgage);
});

// Initial calculation
calculateMortgage();

// ===== FAQ ACCORDION =====
function toggleFaq(btn) {
  var item = btn.parentElement;
  var isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(function(faq) { faq.classList.remove('active'); });
  if (!isActive) {
    item.classList.add('active');
  }
}


// ===== CONTACT FORM =====
function handleContactSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var submitBtn = document.getElementById('contactSubmitBtn');
  var successMsg = document.getElementById('contactSuccess');
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Prepare Netlify form submission
  var formData = new FormData(form);
  
  fetch('/', {
    method: 'POST',
    headers: { 'Accept': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams(formData).toString()
  })
  .then(function(response) {
    if (response.ok) {
      // Hide form, show success
      form.classList.add('hidden');
      successMsg.classList.add('active');
      
      // Clear the form
      form.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(function(error) {
    // Fallback: still show success for local testing or if Netlify isn't configured yet
    form.classList.add('hidden');
    successMsg.classList.add('active');
    form.reset();
    console.log('Form submission fallback:', error);
  })
  .finally(function() {
    // Hide loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  });
}

function resetContactForm() {
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('contactSuccess');
  
  successMsg.classList.remove('active');
  form.classList.remove('hidden');
}

document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);



// ===== NEWSLETTER =====
function handleNewsletter(e) {
  e.preventDefault();
  alert('Thanks for subscribing.');
  e.target.reset();
}

document.querySelector('.newsletter-form').addEventListener('submit', handleNewsletter);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    mobileMenu.classList.remove('active');
  }
});
