$("input").focus(function (event) {
  $(this).closest(".float-label-field").addClass("float").addClass("focus");
});

$("input").blur(function () {
  $(this).closest(".float-label-field").removeClass("focus");
  if (!$(this).val()) {
    $(this).closest(".float-label-field").removeClass("float");
  }
});

// login poage
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitBtn = document.querySelector("#submit-btn");
const errorMsg = document.querySelector("#error-msg");
const loggingMsg = document.querySelector("#logging-msg");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  errorMsg.innerHTML = ""; // Clear any previous error messages

  // Validate email and password fields
  if (email.value.trim() === "") {
    errorMsg.innerHTML = "Please enter your email.";
    return;
  }

  if (password.value.trim() === "") {
    errorMsg.innerHTML = "Please enter your password.";
    return;
  }

  // Validation passed, submit the form to the backend
  submitBtn.disabled = true; // Disable the submit button to prevent multiple submissions
  document.querySelector("#login-form").submit();
});
