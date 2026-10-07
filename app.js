document.querySelector(".bottom").innerHTML = document
  .querySelector(".bottom")
  .innerHTML.replace("SCRIPT_YEAR", new Date().getFullYear());

const nav = document.querySelector("header.nav");
const burger = nav.querySelector(".burger");

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const btn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  btn.classList.toggle("visible", window.scrollY > 300);
});

btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const mentionsSection = document.getElementById("mentions-legales");
  const mentionsLink = document.querySelector('a[href="#mentions-legales"]');
  const closeBtn = document.querySelector(".close-mentions");

  if (mentionsLink && mentionsSection && closeBtn) {
    mentionsLink.addEventListener("click", function (e) {
      e.preventDefault();
      mentionsSection.classList.remove("hidden");
      mentionsSection.scrollIntoView({ behavior: "smooth" });
    });

    closeBtn.addEventListener("click", function () {
      mentionsSection.classList.add("hidden");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.getElementById("video-popup");
  const closeVideoBtn = document.getElementById("close-video-popup");
  const videoElement = document.getElementById("presentation-video");
  const unmuteBtn = document.getElementById("unmute-video");

  if (!videoPopup || !closeVideoBtn || !videoElement) return;

  let soundUnlocked = false;

  function updateUnmuteButton() {
    if (!unmuteBtn) return;
    unmuteBtn.classList.toggle("hidden", !videoElement.muted);
    unmuteBtn.textContent = videoElement.muted
      ? "🔇 Activer le son"
      : "🔊 Couper le son";
  }

  function unlockSound() {
    if (soundUnlocked || !videoElement) return;
    soundUnlocked = true;
    videoElement.muted = false;
    videoElement.volume = 1;
    videoElement.play().catch(() => {});
    updateUnmuteButton();
    events.forEach((e) => window.removeEventListener(e, unlockSound));
  }

  const events = [
    "click",
    "touchstart",
    "keydown",
    "scroll",
    "mousemove",
    "pointerdown",
  ];

  function armSoundUnlock() {
    if (soundUnlocked) return;
    events.forEach((e) =>
      window.addEventListener(e, unlockSound, { passive: true })
    );
  }

  function openVideoPopup() {
    videoPopup.classList.remove("hidden");
    videoElement.currentTime = 0;
    videoElement.muted = true;
    updateUnmuteButton();

    videoElement
      .play()
      .then(() => {
        armSoundUnlock();
      })
      .catch((error) => {
        console.log("La lecture automatique a été bloquée par le navigateur.");
      });
  }

  function closeVideoPopup() {
    videoPopup.classList.add("hidden");
    videoElement.pause();
    videoElement.currentTime = 0;
  }

  setTimeout(openVideoPopup, 1000);

  closeVideoBtn.addEventListener("click", closeVideoPopup);

  videoPopup.addEventListener("click", function (event) {
    if (event.target === videoPopup) {
      closeVideoPopup();
    }
  });

  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      videoElement.muted = !videoElement.muted;
      if (!videoElement.muted) {
        videoElement.play().catch(() => {});
      }
      soundUnlocked = true;
      updateUnmuteButton();
    });
  }

  videoElement.addEventListener("error", function () {
    console.error("Erreur de chargement de la vidéo :", videoElement.error);
    if (videoElement.error) {
      switch (videoElement.error.code) {
        case 1:
          console.error("Téléchargement interrompu.");
          break;
        case 2:
          console.error(
            "Erreur réseau : le fichier est introuvable. Vérifiez le chemin (dossier public ?)."
          );
          break;
        case 3:
          console.error(
            "Erreur de décodage : le format de la vidéo n'est pas supporté par le navigateur."
          );
          break;
        case 4:
          console.error("Format non supporté ou fichier corrompu.");
          break;
      }
    }
  });
});