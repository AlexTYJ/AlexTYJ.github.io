/*
 * The two totals on the projects page. The repos to sum come from data
 * attributes written by _includes/widgets/project-stats.html, which reads
 * _data/projects.yml, so adding a project updates this automatically.
 *
 * Both APIs are public and CORS-enabled, so this runs straight from the
 * browser with no key. If any request in a group fails, that group keeps its
 * snapshot number rather than showing a total that silently dropped a repo —
 * an undercount looks just as authoritative as the real figure.
 */
(function () {
  "use strict";

  var root = document.querySelector(".project-stats");
  if (!root) return;

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function list(attr) {
    var raw = root.getAttribute(attr) || "";
    return raw ? raw.split(",") : [];
  }

  function field(node) {
    return root.querySelector('[data-stat="' + node + '"]');
  }

  function format(value) {
    return value.toLocaleString("en-US");
  }

  /* Counts from zero to `target`; the snapshot is already in the DOM, so the
     run is purely decorative and gets skipped outright when motion is off. */
  function countUp(el, target) {
    if (reduceMotion) {
      el.textContent = format(target);
      return;
    }

    var DURATION = 900;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / DURATION, 1);
      /* easeOutCubic — fast at first, so the magnitude reads immediately. */
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  function getJSON(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) throw new Error(url + " -> " + response.status);
      return response.json();
    });
  }

  /* Resolves to the summed value, or rejects if any single request failed. */
  function sum(urls, pick) {
    if (!urls.length) return Promise.reject(new Error("nothing to sum"));
    return Promise.all(urls.map(getJSON)).then(function (results) {
      return results.reduce(function (total, item) {
        return total + (pick(item) || 0);
      }, 0);
    });
  }

  function live(el, promise) {
    if (!el) return;

    countUp(el, parseInt(el.getAttribute("data-value"), 10) || 0);

    promise.then(
      function (total) {
        /* The count-up may still be running; let it finish, then correct. */
        window.setTimeout(function () {
          el.textContent = format(total);
        }, reduceMotion ? 0 : 950);
      },
      function () {
        /* Keep the snapshot. */
      }
    );
  }

  live(
    field("stars"),
    sum(
      list("data-repos").map(function (repo) {
        return "https://api.github.com/repos/" + repo;
      }),
      function (repo) {
        return repo.stargazers_count;
      }
    )
  );

  var hfUrls = list("data-hf-models")
    .map(function (id) {
      return "https://huggingface.co/api/models/" + id;
    })
    .concat(
      list("data-hf-datasets").map(function (id) {
        return "https://huggingface.co/api/datasets/" + id;
      })
    );

  live(
    field("hf"),
    sum(hfUrls, function (item) {
      return item.downloads;
    })
  );
})();
