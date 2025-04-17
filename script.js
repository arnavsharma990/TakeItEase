document.addEventListener("DOMContentLoaded", () => {
  // Typing animation state
  const typingState = {
    currentText: "",
    phrases: ["Relax. Recharge. Reconnect.", "A Softer Way to Live."],
    currentPhraseIndex: 0,
    currentCharIndex: 0,
    isDeleting: false,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
  };

  // Services data with categories
  const services = [
    {
      title: "Audio Therapy",
      icon: "🎵",
      description:
        "Listening to music & other audio files often enlightens our mood.",
      category: "mental",
    },
    {
      title: "Reading Therapy",
      icon: "📚",
      description:
        "Motivational quotes and books can help us to divert and change our mood.",
      category: "mental",
    },
    {
      title: "Yoga Therapy",
      icon: "🧘",
      description:
        "Yoga and exercise plays a very important role in our lives.",
      category: "physical",
    },
    {
      title: "Laughing Therapy",
      icon: "😊",
      description: "Laughing is the only medicine which refreshes our mind.",
      category: "mental",
    },
    {
      title: "Talking Therapy",
      icon: "💭",
      description:
        "A quick short conversation can often bring smile to our face.",
      category: "social",
    },
    {
      title: "Consult A Doctor",
      icon: "👨‍⚕️",
      description:
        "If you're facing too many problems, you should consult a doctor.",
      category: "mental",
    },
    {
      title: "Child Therapy",
      icon: "👶",
      description:
        "Children make us forget about worries with their innocence.",
      category: "social",
    },
    {
      title: "Spiritual Therapy",
      icon: "🕊️",
      description: "Helps you to become more mindful in your thinking.",
      category: "mental",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I know which therapy is right for me?",
      answer:
        "We recommend starting with the therapy that resonates most with your interests. Many clients begin with audio or reading therapy as they're easily accessible. You can always explore other options as you progress on your wellness journey.",
    },
    {
      question: "How often should I practice these therapies?",
      answer:
        "For optimal results, we suggest incorporating at least one therapeutic practice into your daily routine. Even 15-20 minutes can make a significant difference in your overall wellbeing.",
    },
    {
      question: "Can I combine different therapy types?",
      answer:
        "Absolutely! In fact, we encourage a holistic approach. Many of our clients find that combining physical therapies like yoga with mental practices like reading therapy creates a more balanced experience.",
    },
    {
      question: "Do I need any special equipment or preparation?",
      answer:
        "Most of our therapies require minimal equipment. For audio therapy, a good pair of headphones is helpful. For yoga, a comfortable mat is recommended. Detailed preparation guidelines are provided when you sign up for specific programs.",
    },
    {
      question: "Are these therapies backed by scientific research?",
      answer:
        "Yes, all our therapeutic approaches are grounded in scientific research and evidence-based practices. We continuously update our methods based on the latest findings in psychology, neuroscience, and wellness studies.",
    },
  ];

  // Get DOM elements
  const typingTextElement = document.getElementById("typing-text");
  const servicesContainer = document.getElementById("services-container");
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");
  const navLinksItems = document.querySelectorAll(".nav-link");
  const themeToggle = document.getElementById("theme-toggle");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const faqAccordion = document.getElementById("faq-accordion");

  // Theme handling
  function initTheme() {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  // Initialize typing animation
  function typeText() {
    const currentPhrase = typingState.phrases[typingState.currentPhraseIndex];

    // Calculate typing/deleting speed
    const speed = typingState.isDeleting
      ? typingState.deletingSpeed
      : typingState.typingSpeed;

    // If deleting, remove a character
    if (typingState.isDeleting) {
      typingState.currentText = currentPhrase.substring(
        0,
        typingState.currentCharIndex - 1,
      );
      typingState.currentCharIndex--;
    }
    // If typing, add a character
    else {
      typingState.currentText = currentPhrase.substring(
        0,
        typingState.currentCharIndex + 1,
      );
      typingState.currentCharIndex++;
    }

    // Update the DOM
    typingTextElement.textContent = typingState.currentText;

    // Determine next steps
    if (
      !typingState.isDeleting &&
      typingState.currentCharIndex === currentPhrase.length
    ) {
      // Finished typing current phrase, pause before deleting
      typingState.isDeleting = true;
      setTimeout(typeText, typingState.pauseDuration);
    } else if (typingState.isDeleting && typingState.currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      typingState.isDeleting = false;
      typingState.currentPhraseIndex =
        (typingState.currentPhraseIndex + 1) % typingState.phrases.length;
      setTimeout(typeText, 500);
    } else {
      // Continue typing or deleting
      setTimeout(typeText, speed);
    }
  }

  // Render service cards
  function renderServices(category = "all") {
    servicesContainer.innerHTML = "";

    const filteredServices =
      category === "all"
        ? services
        : services.filter((service) => service.category === category);

    filteredServices.forEach((service, index) => {
      const serviceCard = document.createElement("article");
      serviceCard.className = "service-card";
      serviceCard.dataset.category = service.category;
      serviceCard.style.transitionDelay = `${index * 0.1}s`;

      serviceCard.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-description">${service.description}</p>
        <button class="explore-button">Let's Explore</button>
      `;

      servicesContainer.appendChild(serviceCard);
    });

    // Trigger animation check after rendering
    setTimeout(animateOnScroll, 100);
  }

  // Render FAQs
  function renderFAQs() {
    faqAccordion.innerHTML = "";

    faqs.forEach((faq, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
      accordionItem.dataset.index = index;

      accordionItem.innerHTML = `
        <div class="accordion-header">
          <h3 class="accordion-title">${faq.question}</h3>
          <i class="fas fa-chevron-down accordion-icon"></i>
        </div>
        <div class="accordion-content">
          <div class="accordion-body">${faq.answer}</div>
        </div>
      `;

      faqAccordion.appendChild(accordionItem);
    });
  }

  // FAQ accordion functionality
  function toggleAccordion(index) {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item, i) => {
      if (i === index) {
        item.classList.toggle("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Handle scroll events
  function handleScroll() {
    // Navbar background change on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Animate elements when they come into view
    animateOnScroll();
  }

  // Animate elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll(".service-card");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.8) {
        element.classList.add("animate");
      }
    });
  }

  // Toggle mobile menu
  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  }

  // Close mobile menu when a link is clicked
  function closeMenuOnClick() {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  }

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section, header");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        navLinksItems.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Filter services by category
  function filterServices() {
    const category = this.dataset.filter;

    // Update active button
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn === this);
    });

    // Render filtered services
    renderServices(category);
  }

  // Handle form submission
  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Here you would typically send the form data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log("Form submitted:", Object.fromEntries(formData));

    // Show success message (in a real app, this would happen after successful API response)
    alert("Thank you for your message! We will get back to you soon.");
    form.reset();
  }

  // Initialize the page
  function init() {
    // Initialize theme
    initTheme();

    // Render content
    renderServices();
    renderFAQs();
    typeText();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    menuToggle.addEventListener("click", toggleMenu);
    themeToggle.addEventListener("click", toggleTheme);

    navLinksItems.forEach((link) => {
      link.addEventListener("click", closeMenuOnClick);
    });

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", filterServices);
    });

    // FAQ accordion
    faqAccordion.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (header) {
        const item = header.parentElement;
        const index = parseInt(item.dataset.index);
        toggleAccordion(index);
      }
    });

    // Set up form submission handlers
    const contactForm = document.querySelector(".contact-form");
    const newsletterForm = document.querySelector(".newsletter-form");

    if (contactForm) {
      contactForm.addEventListener("submit", handleFormSubmit);
    }

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter!");
        e.target.reset();
      });
    }

    // Back to top button
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Initial scroll check to set correct states
    handleScroll();

    // Set up scroll spy for nav links
    window.addEventListener("scroll", updateActiveNavLink);
    updateActiveNavLink();
  }

  // Start the application
  init();
});

// Pricing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.toggle-label:first-child');
  const annualLabel = document.querySelector('.toggle-label:last-child');
  const priceAmounts = document.querySelectorAll('.pricing-price .amount');
  
  // Store original monthly prices
  const monthlyPrices = [];
  priceAmounts.forEach(price => {
    monthlyPrices.push(parseInt(price.textContent));
  });
  
  billingToggle.addEventListener('change', function() {
    if (this.checked) {
      // Annual pricing (20% discount)
      monthlyLabel.classList.remove('active');
      annualLabel.classList.add('active');
      
      priceAmounts.forEach((price, index) => {
        const annualPrice = Math.round(monthlyPrices[index] * 0.8);
        price.textContent = annualPrice;
      });
    } else {
      // Monthly pricing
      annualLabel.classList.remove('active');
      monthlyLabel.classList.add('active');
      
      priceAmounts.forEach((price, index) => {
        price.textContent = monthlyPrices[index];
      });
    }
  });
});