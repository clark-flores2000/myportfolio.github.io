/* Basic interactions:
 - 3D tilt for project cards (mouse + touch)
 - modal viewer open/close
 - smooth scroll & simple form handler
*/

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // 3D tilt effect for project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    const limit = 12; // tilt degrees
    function handleMove(e){
      const rect = card.getBoundingClientRect();
      const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) - rect.top;
      const cx = rect.width/2;
      const cy = rect.height/2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const rx = (-dy * limit).toFixed(2);
      const ry = (dx * limit).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      card.style.boxShadow = `${-ry}px ${rx}px 30px rgba(0,0,0,0.35)`;
    }
    function reset(){
      card.style.transform = '';
      card.style.boxShadow = '';
    }
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('touchmove', e => { handleMove(e); }, {passive:true});
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchend', reset);
    // keyboard accessible open on Enter
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter') {
        const link = card.dataset.link;
        if(link) window.open(link, '_blank');
      }
    });
  });

 // Unified modal for video or iframe
const modal = document.getElementById("projectModal");
const modalVideo = document.getElementById("modalVideo");
const modalSource = document.getElementById("modalSource");
const modalIframe = document.getElementById("modalIframe");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".open-modal").forEach(button => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-src");

    // Reset
    modalVideo.style.display = "none";
    modalIframe.style.display = "none";
    modalVideo.pause();
    modalIframe.src = "";

   if (src.endsWith(".mp4")) {
  // Show video
  modalVideo.style.display = "block";
  modalSource.src = src;
  modalVideo.load();
  modalVideo.play(); // <--- ito yung kulang


    } else {
      // Show iframe
      modalIframe.style.display = "block";
      modalIframe.src = src;
    }

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
  modalIframe.src = "";
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

});

const line1El = document.getElementById("line1");
const line2El = document.getElementById("line2");

const line1Text = "Hey, I'm Clark";
const line2Text = "I Build Apps, Websites, and Cool Stuff";


function typeText(element, text, callback) {
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    } else if (callback) {
      setTimeout(callback, 1000);
    }
  }
  typing();
}

function startTypingSequence() {
  typeText(line1El, line1Text, () => {
    typeText(line2El, line2Text, () => {
      setTimeout(startTypingSequence, 2000);
    });
  });
}

startTypingSequence();
