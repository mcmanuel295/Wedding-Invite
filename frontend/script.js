// Countdown timer. Reads the target date from data-date on #countdown.
(function () {
  const container = document.getElementById("countdown");
  if (!container) return;

  const target = new Date(container.dataset.date);
  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      Object.values(els).forEach((el) => (el.textContent = "00"));
      clearInterval(timer);
      return;
    }
    const total = Math.floor(diff / 1000);
    els.days.textContent = pad(Math.floor(total / 86400));
    els.hours.textContent = pad(Math.floor((total % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((total % 3600) / 60));
    els.seconds.textContent = pad(total % 60);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// RSVP form. Frontend validation and a placeholder submit handler.
// Replace the TODO block with a call to your backend endpoint.
(function () {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.classList.remove("error");

    if (!form.checkValidity()) {
      status.classList.add("error");
      status.textContent = "Please complete the required fields.";
      form.reportValidity();
      return;
    }

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.events = fd.getAll("events");
    status.textContent = "Sending...";

    try {
      // TODO: replace with your backend endpoint, e.g.
      // await fetch("/api/rsvp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("RSVP payload (wire to backend):", data);

      status.textContent = "Thank you! We look forward to celebrating with you.";
      form.reset();
    } catch (err) {
      status.classList.add("error");
      status.textContent = "Something went wrong. Please try again.";
    }
  });
})();

// Mobile menu: open/close the dropdown.
(function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("nav-links");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
})();

// Story tabs: click a name to show that person's story.
(function () {
  const tabs = document.querySelectorAll(".story-tab");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.story;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll(".story-panel").forEach((panel) => {
        const active = panel.id === "story-" + key;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    });
  });
})();

// Pass lookup: frontend only. Connect your backend where marked.
(function () {
  const form = document.getElementById("pass-form");
  if (!form) return;
  const status = document.getElementById("pass-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("error");
    if (!form.checkValidity()) {
      status.classList.add("error");
      status.textContent = "Please enter a valid email address.";
      form.reportValidity();
      return;
    }
    // TODO: request the pass from your backend using form.email.value
    status.textContent = "Pass lookup is not connected yet.";
  });
})();

// Copy account number buttons.
(function () {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = document.getElementById(btn.dataset.copy);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy account number"), 1500);
      } catch (err) {
        btn.textContent = "Copy not available";
      }
    });
  });
})();

// Guestbook: shows messages in pages. "Load more" button or scrolling loads the next page.
// Placeholder entries below; replace them with messages loaded from your backend.
(function () {
  const form = document.getElementById("guestbook-form");
  const list = document.getElementById("guestbook-list");
  if (!form || !list) return;

  const status = document.getElementById("guestbook-status");
  const moreBtn = document.getElementById("load-more");
  const sentinel = document.getElementById("guestbook-sentinel");
  const PAGE_SIZE = 5;

  const entries = Array.from({ length: 12 }, (_, i) => ({
    name: "Sample Guest " + (i + 1),
    message: "Placeholder message " + (i + 1) + ". Replace with a real guest message.",
  }));
  let shown = 0;

  function makeItem(entry) {
    const item = document.createElement("li");
    const who = document.createElement("p");
    who.className = "entry-name";
    who.textContent = entry.name;
    const text = document.createElement("p");
    text.className = "entry-text";
    text.textContent = entry.message;
    item.append(who, text);
    return item;
  }

  function updateControls() {
    moreBtn.hidden = shown >= entries.length;
  }

  function loadMore() {
    const next = entries.slice(shown, shown + PAGE_SIZE);
    next.forEach((entry) => list.appendChild(makeItem(entry)));
    shown += next.length;
    updateControls();
  }

  moreBtn.addEventListener("click", loadMore);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (items) => {
        if (items[0].isIntersecting && shown < entries.length) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("error");
    const message = form.message.value.trim();
    if (!message) {
      status.classList.add("error");
      status.textContent = "Please write a message before posting.";
      form.message.focus();
      return;
    }
    const entry = { name: form.name.value.trim() || "A guest", message };

    // TODO: send entry to your backend so it is saved for everyone.

    entries.unshift(entry);
    list.prepend(makeItem(entry));
    shown += 1;
    updateControls();

    status.textContent = "Thank you for your message.";
    form.reset();
  });

  loadMore();
})();

// Quote slider: slides left to right with buttons, dots, or swipe.
(function () {
  const track = document.getElementById("quote-track");
  const prev = document.getElementById("quote-prev");
  const next = document.getElementById("quote-next");
  const dotsWrap = document.getElementById("slider-dots");
  if (!track || !prev || !next || !dotsWrap) return;

  const slides = Array.from(track.children);

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to quote " + (i + 1));
    dot.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" }));
    dotsWrap.appendChild(dot);
  });

  function currentIndex() {
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function updateDots() {
    const index = currentIndex();
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.setAttribute("aria-current", String(i === index));
    });
    prev.disabled = index <= 0;
    next.disabled = index >= slides.length - 1;
  }

  prev.addEventListener("click", () => track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: track.clientWidth, behavior: "smooth" }));
  track.addEventListener("scroll", () => window.requestAnimationFrame(updateDots), { passive: true });
  window.addEventListener("resize", updateDots);
  updateDots();
})();
