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

// Guestbook: adds the message to the list on the page. Save it to your backend where marked.
(function () {
  const form = document.getElementById("guestbook-form");
  if (!form) return;
  const status = document.getElementById("guestbook-status");
  const list = document.getElementById("guestbook-list");

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
    const name = form.name.value.trim() || "A guest";

    // TODO: send { name, message } to your backend so it is saved for everyone.

    const empty = list.querySelector(".guestbook-empty");
    if (empty) empty.remove();

    const item = document.createElement("li");
    const who = document.createElement("p");
    who.className = "entry-name";
    who.textContent = name;
    const text = document.createElement("p");
    text.className = "entry-text";
    text.textContent = message;
    item.append(who, text);
    list.prepend(item);

    status.textContent = "Thank you for your message.";
    form.reset();
  });
})();
