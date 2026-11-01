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

    const data = Object.fromEntries(new FormData(form).entries());
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
