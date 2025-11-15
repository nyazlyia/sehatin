document.addEventListener("DOMContentLoaded", () => {
  const introText = document.querySelector("#intro div");
  const intro = document.getElementById("intro");
  const loading = document.getElementById("loading");
  const logo = document.getElementById("loadingLogo");
  const percentEl = document.querySelector(".percent");
  const progressBar = document.querySelector(".progress-bar");
  const btn = document.getElementById("startBtn");
  const hero = document.getElementById("beranda");

  // Intro 3 detik
  setTimeout(() => {
    introText.classList.add("shrink");
    setTimeout(() => {
      intro.style.display = "none";

      // aktifkan loading
      loading.classList.add("active");

      // pastikan loading sudah terlihat sebelum animasi logo
      setTimeout(() => {
        logo.classList.add("show");
      }, 300);

      // Loading persentase
      let percent = 0;
      const interval = setInterval(() => {
        percent++;
        percentEl.textContent = percent + "%";
        progressBar.style.width = percent + "%";
        percentEl.style.transform = "scale(1.2)";
        setTimeout(() => (percentEl.style.transform = "scale(1)"), 100);

        if (percent >= 100) {
          clearInterval(interval);

          // Button muncul
          const buttonText = "Siap Menjalani Hidup Sehat?";
          btn.innerHTML = "";
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

          // Klik tombol -> loading hilang & hero muncul
          btn.addEventListener("click", () => {
            loading.style.display = "none";
            mainContent.style.display = "block";
            document
              .getElementById("beranda")
              .scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
              typewriter();
            }, 300);
          });
        }
      }, 30);
    }, 1000);
  }, 3000);

  // Hover efek huruf hidup
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

  // Hover keluar → reset warna
  btn.addEventListener("mouseleave", () => {
    const spans = btn.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.color = "#A3D1C6";
      btn.style.backgroundColor = "#fff";
    });
  });

  // ==== Navbar Scroll Behavior ====
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("fixed", window.scrollY > 50);
  });

  // ==== Active Link on Scroll ====
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset + 150;
    sections.forEach((section) => {
      if (
        scrollY > section.offsetTop &&
        scrollY <= section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.nav-menu a[href*=${section.id}]`)
          ?.classList.add("active");
      }
    });
  });

  // ==== Reveal on Scroll ====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll("section").forEach((sec) => observer.observe(sec));

  // subtitle
  var aText = new Array(
    "We are teams that have expertise in Many field of IT Engineering.",
    "(Hardware, Software, Network, Program, Design, etc.) Provide the",
    "best service, work quickly, accurate, and professional."
  );
  var iSpeed = 40;
  var iIndex = 0;
  var iArrLength = aText[0].length;
  var iScrollAt = 20;

  var iTextPos = 0;
  var sContents = "";
  var iRow;

  function typewriter() {
    sContents = " ";
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
      sContents += aText[iRow++] + "<br />";
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if (iTextPos++ == iArrLength) {
      iTextPos = 0;
      iIndex++;
      if (iIndex != aText.length) {
        iArrLength = aText[iIndex].length;
        setTimeout("typewriter()", 500);
      }
    } else {
      setTimeout("typewriter()", iSpeed);
    }
  }

  window.addEventListener("load", () => {
    document.querySelector(".hero").classList.add("show");
    document.querySelector(".tagline").classList.add("show");
  });

  // ==== Baca Selengkapnya ====
  document.querySelectorAll(".show-more-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest(".card, .card-2");
      const more = card?.querySelector(".more-text");
      if (!more) return;
      more.classList.toggle("hidden");
      btn.textContent = more.classList.contains("hidden")
        ? "Baca Selengkapnya"
        : "Tutup";
    });
  });

  // ==== Kalkulator BMI ====
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

  function hitungBMI() {
    const berat = +document.getElementById("berat").value;
    const tinggi = +document.getElementById("tinggi").value / 100;
    const hasil = document.getElementById("hasil");

    if (!berat || !tinggi)
      return (hasil.textContent = "Isi data dengan benar.");
    const bmi = (berat / tinggi ** 2).toFixed(1);
    const kategori =
      bmi < 18.5
        ? "Kurus 😕"
        : bmi < 24.9
        ? "Normal 😊"
        : bmi < 29.9
        ? "Gemuk 😐"
        : "Obesitas 😟";

    hasil.innerHTML = `
    <p>Jenis Kelamin: <b>${selectedGender ?? "Belum dipilih"}</b></p>
    <p>BMI Anda: <b>${bmi}</b></p>
    <p>Kategori: <b>${kategori}</b></p>`;
  }

  // ==== Kalkulator Kalori ====
  function hitungKalori() {
    const usia = +document.getElementById("usia").value;
    const aktivitas = +document.getElementById("aktivitas").value;
    const berat = +document.getElementById("berat").value;
    const tinggi = +document.getElementById("tinggi").value;
    const hasil = document.getElementById("hasil-kalori");

    if (!usia || !aktivitas || !berat || !tinggi)
      return (hasil.textContent = "Lengkapi semua data.");
    if (!selectedGender)
      return (hasil.textContent = "Pilih jenis kelamin di kalkulator BMI.");

    const bmr =
      selectedGender === "Laki-laki"
        ? 88.36 + 13.4 * berat + 4.8 * tinggi - 5.7 * usia
        : 447.6 + 9.2 * berat + 3.1 * tinggi - 4.3 * usia;

    hasil.innerHTML = `
    <p>Jenis Kelamin: <b>${selectedGender}</b></p>
    <p>BMR: <b>${Math.round(bmr)} kal/hari</b></p>
    <p>Kebutuhan Kalori: <b>${Math.round(bmr * aktivitas)} kal/hari</b></p>`;
  }
});
