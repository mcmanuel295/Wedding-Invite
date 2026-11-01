// Admin sign-in. Frontend only: connect your backend where marked.
(function () {
  const form = document.getElementById("admin-login-form");
  if (!form) return;
  const status = document.getElementById("admin-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.classList.remove("error");
    if (!form.checkValidity()) {
      status.classList.add("error");
      status.textContent = "Please enter your email and password.";
      form.reportValidity();
      return;
    }
    // TODO: send form.email.value and form.password.value to your login endpoint,
    // then store the session token and redirect to the admin dashboard.
    status.textContent = "Sign-in is not connected yet.";
  });
})();
