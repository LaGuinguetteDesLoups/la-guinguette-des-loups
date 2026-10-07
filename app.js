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
  const loader = document.getElementById("video-loader");

  const invite = document.getElementById("video-invite");
  const inviteYes = document.getElementById("video-invite-yes");
  const inviteClose = document.getElementById("video-invite-close");

  if (!videoPopup || !closeVideoBtn || !videoElement) return;

  let loaderTimeout = null;

  function showInvite() {
    if (!invite) return;
    setTimeout(() => invite.classList.remove("hidden"), 1500);
  }

  function hideInvite() {
    if (!invite) return;
    invite.classList.add("hidden");
  }

  function hideLoader() {
    if (!loader) return;
    loader.classList.add("hidden");
    clearTimeout(loaderTimeout);
  }

  function openVideoPopup() {
    videoPopup.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    videoElement.currentTime = 0;
    videoElement.muted = false;
    videoElement.volume = 1;

    if (loader) {
      loader.classList.remove("hidden");
      loaderTimeout = setTimeout(hideLoader, 6000);
    }

    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (videoElement.readyState >= 3) hideLoader();
        })
        .catch(() => {
          videoElement.muted = true;
          videoElement
            .play()
            .then(() => {
              if (videoElement.readyState >= 3) hideLoader();
            })
            .catch(() => {
              hideLoader();
            });
        });
    }
  }

  function closeVideoPopup() {
    videoPopup.classList.add("hidden");
    document.body.style.overflow = "";
    videoElement.pause();
    videoElement.currentTime = 0;
    hideLoader();
  }

  videoElement.addEventListener("canplay", hideLoader);
  videoElement.addEventListener("playing", hideLoader);
  videoElement.addEventListener("loadeddata", hideLoader);
  videoElement.addEventListener("ended", closeVideoPopup);

  if (invite && inviteYes && inviteClose) {
    showInvite();

    inviteYes.addEventListener("click", function () {
      hideInvite();
      openVideoPopup();
    });

    inviteClose.addEventListener("click", hideInvite);
  }

  closeVideoBtn.addEventListener("click", closeVideoPopup);

  videoPopup.addEventListener("click", function (event) {
    if (event.target === videoPopup) {
      closeVideoPopup();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !videoPopup.classList.contains("hidden")) {
      closeVideoPopup();
    }
  });

  videoElement.addEventListener("error", function () {
    hideLoader();
  });
});