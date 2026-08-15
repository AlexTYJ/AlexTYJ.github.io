/*
 * Progressive enhancements that are additive: everything here is optional, and
 * the page is fully usable with this file blocked or failed.
 *
 *   1. Lightbox for publication figures — the figures carry fine print
 *      (axis labels, kernel names) that is unreadable at the inline size.
 *   2. Copy-citation buttons.
 *   3. Back-to-top button.
 *
 * Loaded as a plain script (not a module) at the end of <body>.
 */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. Figure lightbox
     --------------------------------------------------------------------- */

  function initLightbox() {
    /* Only the publication-page variant. The card and list variants are
       wrapped in links to the paper, where a click should navigate. */
    var figures = document.querySelectorAll(".pub-figure--page img");
    if (!figures.length || typeof HTMLDialogElement === "undefined") return;

    var dialog = document.createElement("dialog");
    dialog.className = "figure-lightbox";
    dialog.innerHTML =
      '<button class="figure-lightbox__close" type="button" aria-label="Close">&times;</button>' +
      '<img class="figure-lightbox__img" alt="">';
    document.body.appendChild(dialog);

    var img = dialog.querySelector(".figure-lightbox__img");

    dialog.querySelector(".figure-lightbox__close").addEventListener("click", function () {
      dialog.close();
    });

    /* Clicking the backdrop closes. The <img> sits inside, so only treat
       clicks that land on the dialog box itself as backdrop clicks. */
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });

    Array.prototype.forEach.call(figures, function (figure) {
      figure.closest(".pub-figure").classList.add("pub-figure--zoomable");

      /* The figure is a plain <img> in the markup, so it has to be made
         focusable here rather than in the template — where it would advertise
         an interaction that only exists once this script has run. */
      figure.setAttribute("role", "button");
      figure.setAttribute("tabindex", "0");

      function open() {
        img.src = figure.currentSrc || figure.src;
        img.alt = figure.alt;
        dialog.showModal();
      }

      figure.addEventListener("click", open);
      figure.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        open();
      });
    });
  }

  /* ----------------------------------------------------------------------
     2. Copy citation
     --------------------------------------------------------------------- */

  function initCopyButtons() {
    var buttons = document.querySelectorAll(".copy-cite");
    /* Secure-context only, so this is absent on plain http. The buttons ship
       hidden and stay that way, rather than appearing and then doing nothing. */
    if (!buttons.length || !navigator.clipboard) return;

    Array.prototype.forEach.call(buttons, function (button) {
      button.hidden = false;

      button.addEventListener("click", function () {
        navigator.clipboard.writeText(button.getAttribute("data-citation") || "").then(
          function () {
            flash(button, "copy-cite--done");
          },
          function () {
            flash(button, "copy-cite--failed");
          }
        );
      });
    });
  }

  function flash(button, className) {
    button.classList.add(className);
    window.setTimeout(function () {
      button.classList.remove(className);
    }, 1800);
  }

  /* ----------------------------------------------------------------------
     3. Back to top
     --------------------------------------------------------------------- */

  function initBackToTop() {
    var button = document.querySelector(".back-to-top");
    if (!button) return;

    var THRESHOLD = 600;
    var ticking = false;

    function update() {
      button.classList.toggle("back-to-top--visible", window.scrollY > THRESHOLD);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    update();
  }

  function init() {
    initLightbox();
    initCopyButtons();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
