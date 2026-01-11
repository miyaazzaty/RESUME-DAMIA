// ====================== 1. TYPING EFFECT ======================
const typingText = "WEB DEVELOPER";
let charIndex = 0;
let isDeleting = false;

function playTyping() {
    const target = document.querySelector (".typing");
    
    if (!target) return;

    const displayedContent = typingText.substring(0, charIndex);
    target.textContent = displayedContent;

    let speed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex < typingText.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        speed = 50; 
    } else {
        isDeleting = !isDeleting;
        speed = isDeleting ? 1500 : 500;
    }

    setTimeout(playTyping, speed);
}

// ====================== 2. ACTIVE MENU & REVEAL ======================
function initFunctions() {
    playTyping();

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message Sent! Thank you for contacting me.");
            contactForm.reset();
        });
    }

    // Tambahan: Tutup lightbox bila klik di luar gambar
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            // Jika yang diklik adalah latar belakang (bukan imej itu sendiri), tutup ia
            if (e.target === this) {
                closeImage();
            }
        });
    }
}

// ====================== 3. EVENT LISTENERS ======================
window.onload = initFunctions;

window.onscroll = function() {
    document.querySelectorAll(".reveal").forEach(el => {
        const rect = el.getBoundingClientRect().top;
        if (rect < window.innerHeight - 50) el.classList.add("active");
    });

    document.querySelectorAll(".skill-level").forEach(bar => {
        const rect = bar.getBoundingClientRect().top;
        if (rect < window.innerHeight - 50) {
            bar.style.width = bar.dataset.skill + "%";
        }
    });
};

// ====================== 4. LIGHTBOX & PROJECT FUNCTIONS ======================

function openImage(imageSrc) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
        // Tambah style sikit supaya nampak cantik tengah-tengah
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.style.cursor = 'pointer';
    }
}

// FUNGSI BARU UNTUK TUTUP GAMBAR
function closeImage() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

function toggleProjectImage(btn) {
    const imgDiv = btn.nextElementSibling; 
    if (imgDiv.style.maxHeight === "0px" || imgDiv.style.maxHeight === "") {
        imgDiv.style.maxHeight = "500px";
        btn.textContent = "Hide Image";
    } else {
        imgDiv.style.maxHeight = "0px";
        btn.textContent = "View Image";
    }
}