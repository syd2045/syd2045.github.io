        let isPlaying = false;
        let countdownInterval;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Lucide icons
            lucide.createIcons();
            
            // Get guest name from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const guestNameParam = urlParams.get('to');
            if (guestNameParam) {
                const guestNameElement = document.getElementById('guestName');
                guestNameElement.textContent = `${decodeURIComponent(guestNameParam)}`;
                guestNameElement.style.display = 'block';
            }

            // Load wedding data
            loadWeddingData();
            
            // Start countdown
            startCountdown();
        });

        function loadWeddingData() {
            if (typeof weddingData === 'undefined') {
                console.error('Wedding data not loaded');
                return;
            }

            // Load landing page data
            document.getElementById('couplePhoto').src = weddingData.couple.photo;
            document.getElementById('coupleNamesLanding').textContent = `${weddingData.bride.name} & ${weddingData.groom.name}`;
            document.getElementById('weddingDateLanding').textContent = weddingData.wedding.dateFormatted;

            // Load main content data
            document.getElementById('coupleNamesMain').textContent = `${weddingData.bride.name} & ${weddingData.groom.name}`;
            
            // Bride and Groom data
            document.getElementById('bridePhoto').src = weddingData.bride.photo;
            document.getElementById('brideName').textContent = weddingData.bride.name;
            document.getElementById('brideParents').textContent = weddingData.bride.parents;
            
            document.getElementById('groomPhoto').src = weddingData.groom.photo;
            document.getElementById('groomName').textContent = weddingData.groom.name;
            document.getElementById('groomParents').textContent = weddingData.groom.parents;

            // Hadith data
            document.getElementById('hadithArabic').textContent = weddingData.hadith.arabic;
            document.getElementById('hadithTranslation').textContent = `"${weddingData.hadith.translation}"`;
            document.getElementById('hadithSource').textContent = `- ${weddingData.hadith.source}`;

            // Wedding details
            document.getElementById('akadDate').textContent = weddingData.wedding.akad.date;
            document.getElementById('akadTime').textContent = weddingData.wedding.akad.time;
            document.getElementById('resepsiDate').textContent = weddingData.wedding.resepsi.date;
            document.getElementById('resepsiTime').textContent = weddingData.wedding.resepsi.time;
            
            document.getElementById('venueAddress').textContent = weddingData.wedding.venue.address;
            document.getElementById('mapButton').href = weddingData.wedding.venue.mapLink;

            // Footer
            document.getElementById('coupleSignature').textContent = `${weddingData.bride.name} & ${weddingData.groom.name}`;

            // Gallery
            // Gallery
            if (weddingData.gallery.enabled) {
               document.getElementById('gallerySection').style.display = 'block';
                 const galleryScroll = document.getElementById('galleryScroll');
                 weddingData.gallery.photos.forEach((photo, index) => {
                   const galleryItem = document.createElement('div');
                   galleryItem.className = 'snap-center flex-shrink-0 w-full';
                  galleryItem.innerHTML = `
                  <img src="${photo}" 
                 alt="Gallery ${index + 1}" 
                 class="w-full h-80 object-cover rounded-xl shadow-md">
                  `;
                 galleryScroll.appendChild(galleryItem);
                });
            }


        }

        function openInvitation() {
            // Hide landing page
            document.getElementById('landingPage').style.display = 'none';
            
            // Show invitation content
            document.getElementById('invitationContent').style.display = 'block';
            // Show bottom nav
            document.getElementById('bottomNav').classList.remove("hidden");
            // Pastikan icon lucide dirender (jika perlu)
            lucide.createIcons();
           // Trigger update active tab (dengan memicu scroll event)
            window.dispatchEvent(new Event('scroll'));
            // Create falling hearts animation
            createFallingHearts();
            
            // Play music
            const audio = document.getElementById('weddingMusic');
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('musicIcon').setAttribute('data-lucide', 'volume-2');
                lucide.createIcons();
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
            
            // Smooth scroll to main content
            setTimeout(() => {
                document.getElementById('mainContent').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1000);
        }

        function createFallingHearts() {
            const container = document.getElementById('fallingHeartsContainer');
            
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.className = 'falling-heart';
                heart.textContent = '♥';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 3 + 's';
                heart.style.animationDuration = (3 + Math.random() * 2) + 's';
                
                container.appendChild(heart);
                
                // Remove hearts after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 8000);
            }
        }

        function toggleMusic() {
            const audio = document.getElementById('weddingMusic');
            const musicIcon = document.getElementById('musicIcon');
            
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicIcon.setAttribute('data-lucide', 'volume-x');
            } else {
                audio.play().then(() => {
                    isPlaying = true;
                    musicIcon.setAttribute('data-lucide', 'volume-2');
                }).catch(error => {
                    console.log('Audio play failed:', error);
                });
            }
            lucide.createIcons();
        }

        function startCountdown() {
            if (typeof weddingData === 'undefined') {
                setTimeout(startCountdown, 100);
                return;
            }

            countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const weddingDate = new Date(weddingData.wedding.date).getTime();
                const distance = weddingDate - now;

                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    document.getElementById('days').textContent = days || 0;
                    document.getElementById('hours').textContent = hours || 0;
                    document.getElementById('minutes').textContent = minutes || 0;
                    document.getElementById('seconds').textContent = seconds || 0;
                } else {
                    // Wedding day has arrived or passed
                    document.getElementById('days').textContent = '0';
                    document.getElementById('hours').textContent = '0';
                    document.getElementById('minutes').textContent = '0';
                    document.getElementById('seconds').textContent = '0';
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }
        
        
// ----- Bottom Nav: active tab + click-to-scroll -----
document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll("section"));
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));

  // helper: ambil "key" section (class pertama atau id)
  function getSectionKey(section) {
    return section.classList[0] || section.id || null;
  }

  // update tampilan tab aktif berdasarkan posisi scroll
  function updateActiveTab() {
    if (!tabButtons.length || !sections.length) return;

    const offset = 120; // sesuaikan kalau perlu
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    let current = null;

    // cari section terakhir yang top <= scrollPos + offset
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      const top = sec.getBoundingClientRect().top + window.pageYOffset - offset;
      if (scrollPos >= top) {
        current = getSectionKey(sec);
        break;
      }
    }

    tabButtons.forEach(btn => {
      const dot = btn.querySelector(".active-dot");
      // reset
      btn.classList.remove("text-pink-500", "font-semibold");
      btn.classList.add("text-gray-500");
      if (dot) dot.classList.add("hidden");

      // aktif jika cocok
      if (btn.getAttribute("data-target") === current) {
        btn.classList.remove("text-gray-500");
        btn.classList.add("text-pink-500", "font-semibold");
        if (dot) dot.classList.remove("hidden");
      }
    });
  }

  // click => scroll ke section
  tabButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetKey = btn.getAttribute("data-target");
      const target = document.querySelector(`.${targetKey}`) || document.getElementById(targetKey);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // sedikit delay supaya posisi scroll berubah dulu sebelum update aktif
      setTimeout(updateActiveTab, 400);
    });
  });

  // update saat scroll
  window.addEventListener("scroll", updateActiveTab, { passive: true });

  // jalankan sekali saat load (jika user sudah di dalam invitation)
  updateActiveTab();
});


       