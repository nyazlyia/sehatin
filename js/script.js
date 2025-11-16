document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const introText = document.querySelector("#intro div");
  const intro = document.getElementById("intro");
  const loading = document.getElementById("loading");
  const logo = document.getElementById("loadingLogo");
  const percentEl = document.querySelector(".percent");
  const progressBar = document.querySelector(".progress-bar");
  const btn = document.getElementById("startBtn");
  const mainContent = document.getElementById("mainContent");
  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sound elements
  const soundControl = document.getElementById("soundControl");
  const soundToggle = document.getElementById("soundToggle");
  const soundIcon = document.getElementById("soundIcon");
  const soundText = document.getElementById("soundText");
  const backgroundMusic = document.getElementById("backgroundMusic");

  // Sound state
  let isSoundOn = false;

  // Initialize
  initNavigation(); // PASTIKAN NAVIGASI DIPANGGIL
  initScrollAnimations();
  initTypedText();
  initActiveSectionObserver();
  initSlides();
  initSoundControl();

  // Intro sequence
  setTimeout(() => {
    introText.classList.add("shrink");
    setTimeout(() => {
      intro.style.display = "none";
      loading.classList.add("active");

      setTimeout(() => {
        logo.classList.add("show");
      }, 300);

      // Loading progress
      let percent = 0;
      const interval = setInterval(() => {
        percent++;
        percentEl.textContent = percent + "%";
        progressBar.style.width = percent + "%";

        // Pulse animation
        percentEl.style.transform = "scale(1.2)";
        setTimeout(() => (percentEl.style.transform = "scale(1)"), 100);

        if (percent >= 100) {
          clearInterval(interval);
          showStartButton();
        }
      }, 30);
    }, 1000);
  }, 3000);

  // Initialize slides
  function initSlides() {
    const slideTrack = document.querySelector(".slide-track");
    const slides = [
      {
        type: "physical",
        title: "Kesehatan Fisik",
        icon: "person.svg",
        description:
          "Kesehatan fisik adalah seberapa baik organ dan sistem tubuh Anda berfungsi.",
        moreText:
          "Seseorang dapat mencapai definisi kesehatan fisiknya sendiri, terlepas dari penyakit, disabilitas, atau usianya.",
      },
      {
        type: "mental",
        title: "Kesehatan Mental",
        icon: "mental.svg",
        description:
          "Kesehatan mental adalah aspek penting dari kesejahteraan secara keseluruhan,",
        moreText:
          "karena berpengaruh langsung terhadap cara seseorang berpikir, merasa, dan berperilaku.",
      },
      {
        type: "social",
        title: "Kesehatan Sosial",
        icon: "people.svg",
        description:
          "Kesehatan sosial adalah suatu interaksi positif dengan orang lain, lingkungan, dan komunitas.",
        moreText:
          "Hal ini melibatkan hubungan yang sehat dan rasa saling memiliki antara satu orang dengan orang lainnya.",
      },
    ];

    // Create slides (duplicate for infinite scroll)
    const slideHTML = [...slides, ...slides, ...slides]
      .map(
        (slide, index) => `
      <div class="slide">
        <div class="card health-card ${
          slide.type === "mental" ? "mental" : ""
        }">
          <div class="card-icon">
            <div class="icon-circle">
              <img src="assets/${slide.icon}" alt="${slide.title}" />
            </div>
          </div>
          <div class="card-content">
            <h3>${slide.title}</h3>
            <p>${slide.description}</p>
            <div class="more-text hidden">
              <p>${slide.moreText}</p>
            </div>
            <button class="show-more-btn">Baca Selengkapnya</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    slideTrack.innerHTML = slideHTML;

    // Add event listeners to show-more buttons
    document.querySelectorAll(".show-more-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const moreText = this.previousElementSibling;
        moreText.classList.toggle("hidden");
        this.textContent = moreText.classList.contains("hidden")
          ? "Baca Selengkapnya"
          : "Tutup";
      });
    });
  }

  // Navigation functions
  function initNavigation() {
    // Hamburger menu
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);

      // Active link highlighting
      const scrollY = window.pageYOffset + 100;
      document.querySelectorAll("section[id]").forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove("active"));
          document
            .querySelector(`.nav-menu a[href*=${sectionId}]`)
            ?.classList.add("active");
        }
      });
    });
  }

  // Footer navigation
  function initFooterNavigation() {
    const footerLinks = document.querySelectorAll(".footer-links a");

    footerLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId.startsWith("#")) {
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            // Update active nav
            navLinks.forEach((l) => l.classList.remove("active"));
            const correspondingNavLink = document.querySelector(
              `.nav-link[href="${targetId}"]`
            );
            if (correspondingNavLink) {
              correspondingNavLink.classList.add("active");
            }

            // Close mobile menu if open
            if (hamburger && navMenu.classList.contains("active")) {
              hamburger.classList.remove("active");
              navMenu.classList.remove("active");
              document.body.style.overflow = "";
            }
          }
        }
      });
    });
  }

  // Sound control function
  function initSoundControl() {
    // Create sound toggle button styles
    const style = document.createElement("style");
    style.textContent = `
      .sound-toggle-btn {
        background: rgba(255, 255, 255, 0.9);
        color: var(--primary-color);
        border: 2px solid var(--primary-light);
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 50px;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
        font-family: "Poppins", sans-serif;
      }
      
      .sound-toggle-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        background: var(--primary-color);
        color: var(--white);
        border-color: var(--primary-color);
      }
    `;
    document.head.appendChild(style);

    soundToggle.addEventListener("click", () => {
      isSoundOn = !isSoundOn;

      if (isSoundOn) {
        // Try to play music
        backgroundMusic.play().catch((e) => {
          console.log("Autoplay prevented:", e);
          // Show user interaction required message
          alert("Klik 'Sound On' sekali lagi untuk memutar musik");
          isSoundOn = false;
          return;
        });
        soundIcon.textContent = "🔊";
        soundText.textContent = "Sound On";
        soundToggle.style.background = "var(--primary-color)";
        soundToggle.style.color = "var(--white)";
        soundToggle.style.borderColor = "var(--primary-color)";
      } else {
        backgroundMusic.pause();
        soundIcon.textContent = "🔇";
        soundText.textContent = "Sound Off";
        soundToggle.style.background = "rgba(255, 255, 255, 0.9)";
        soundToggle.style.color = "var(--primary-color)";
        soundToggle.style.borderColor = "var(--primary-light)";
      }
    });
  }

  // Active Section Observer
  function initActiveSectionObserver() {
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          // Remove active class from all links
          navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          // Add active class to current link
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Scroll animations
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    document
      .querySelectorAll("section")
      .forEach((sec) => observer.observe(sec));
  }

  // Typed text effect
  function initTypedText() {
    const text =
      "Perjalanan menuju diri yang lebih sehat dan bahagia dimulai dari sini. Temukan tips kesehatan yang sesuai dengan kamu dan pantau perkembanganmu. Yuk, mulai perjalanan menuju hidup yang lebih sehat dan bahagia.";
    const speed = 40;
    const typedtext = document.getElementById("typedtext");
    let i = 0;

    function type() {
      if (i < text.length) {
        typedtext.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    // Start typing when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            typedtext.innerHTML = "";
            type();
          }, 500);
          heroObserver.unobserve(entry.target);
        }
      });
    });

    heroObserver.observe(document.querySelector(".hero"));
  }

  // Show start button
  function showStartButton() {
    const buttonText = "Siap Menjalani Hidup Sehat?";
    btn.innerHTML = "";

    // Create animated letters
    for (let i = 0; i < buttonText.length; i++) {
      const char = buttonText[i];
      const span = document.createElement("span");
      span.textContent = char === " " ? " " : char;
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      span.style.transition = `all 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)`;
      span.style.transitionDelay = `${i * 0.03}s`;
      btn.appendChild(span);
    }

    btn.style.display = "inline-block";

    setTimeout(() => {
      btn.style.opacity = 1;
      btn.style.transform = "scale(1)";
      const spans = btn.querySelectorAll("span");
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }, i * 30);
      });
    }, 50);

    // Button click event
    btn.addEventListener("click", () => {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
        mainContent.style.display = "block";

        // Show sound control in beranda section
        soundControl.style.display = "block";

        // Add active class to beranda link
        const berandaLink = document.querySelector(
          '.nav-link[href="#beranda"]'
        );
        if (berandaLink) {
          document
            .querySelectorAll(".nav-link")
            .forEach((link) => link.classList.remove("active"));
          berandaLink.classList.add("active");
        }

        document
          .getElementById("beranda")
          .scrollIntoView({ behavior: "smooth" });
      }, 500);
    });
  }

  // Button hover effects
  btn.addEventListener("mouseenter", () => {
    const spans = btn.querySelectorAll("span");
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.style.opacity = "0";
        span.style.transform = `translateY(30px) rotate(${
          Math.random() * 30 - 15
        }deg) scale(0.7)`;
        span.style.color = "#fff";
        btn.style.backgroundColor = "#A3D1C6";
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0) rotate(0deg) scale(1)";
          span.style.color = "#fff";
        }, 100);
      }, i * 40);
    });
  });

  btn.addEventListener("mouseleave", () => {
    const spans = btn.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.color = "#A3D1C6";
      btn.style.backgroundColor = "#fff";
    });
  });

  // Calculator functionality
  let selectedGender = null;
  const maleBtn = document.getElementById("male");
  const femaleBtn = document.getElementById("female");

  [maleBtn, femaleBtn].forEach((btn) =>
    btn?.addEventListener("click", () => {
      selectedGender = btn.id === "male" ? "Laki-laki" : "Perempuan";
      maleBtn.classList.toggle("active", btn.id === "male");
      femaleBtn.classList.toggle("active", btn.id === "female");
    })
  );

  // BMI Calculator
  window.hitungBMI = function () {
    const berat = +document.getElementById("berat").value;
    const tinggi = +document.getElementById("tinggi").value / 100;
    const hasil = document.getElementById("hasil");

    if (!berat || !tinggi || berat <= 0 || tinggi <= 0) {
      hasil.innerHTML = `<p style="color: #e53e3e;">Isi data berat dan tinggi dengan benar.</p>`;
      return;
    }

    const bmi = (berat / (tinggi * tinggi)).toFixed(1);
    let kategori = "";
    let color = "";

    if (bmi < 18.5) {
      kategori = "Kurus";
      color = "#3182ce";
    } else if (bmi < 24.9) {
      kategori = "Normal";
      color = "#38a169";
    } else if (bmi < 29.9) {
      kategori = "Gemuk";
      color = "#d69e2e";
    } else {
      kategori = "Obesitas";
      color = "#e53e3e";
    }

    hasil.innerHTML = `
      <p>Jenis Kelamin: <b>${selectedGender || "Belum dipilih"}</b></p>
      <p>BMI Anda: <b style="color: ${color};">${bmi}</b></p>
      <p>Kategori: <b style="color: ${color};">${kategori}</b></p>
    `;
  };

  // Calorie Calculator
  window.hitungKalori = function () {
    const usia = +document.getElementById("usia").value;
    const aktivitas = +document.getElementById("aktivitas").value;
    const berat = +document.getElementById("berat-kalori").value;
    const tinggi = +document.getElementById("tinggi-kalori").value;
    const hasil = document.getElementById("hasil-kalori");

    if (!usia || !aktivitas || !berat || !tinggi) {
      hasil.innerHTML = `<p style="color: #e53e3e;">Lengkapi semua data.</p>`;
      return;
    }

    if (!selectedGender) {
      hasil.innerHTML = `<p style="color: #e53e3e;">Pilih jenis kelamin di kalkulator BMI.</p>`;
      return;
    }

    const bmr =
      selectedGender === "Laki-laki"
        ? 88.36 + 13.4 * berat + 4.8 * tinggi - 5.7 * usia
        : 447.6 + 9.2 * berat + 3.1 * tinggi - 4.3 * usia;

    const kebutuhanKalori = Math.round(bmr * aktivitas);

    hasil.innerHTML = `
      <p>Jenis Kelamin: <b>${selectedGender}</b></p>
      <p>BMR: <b>${Math.round(bmr)} kal/hari</b></p>
      <p>Kebutuhan Kalori: <b style="color: #3182ce;">${kebutuhanKalori} kal/hari</b></p>
    `;
  };
});

console.log("🎯 Navigation system loaded!");
