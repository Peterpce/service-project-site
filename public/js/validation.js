// validation.js

document.addEventListener("DOMContentLoaded", () => {
  
  // Get all forms that need validation
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      
      let isValid = true;

      // Get all required inputs
      const requiredInputs = form.querySelectorAll("[required]");

      requiredInputs.forEach((input) => {
        const value = input.value.trim();

        // Remove previous error style
        input.style.border = "";

        // Check empty fields
        if (value === "") {
          isValid = false;
          showError(input, "This field is required");
        }

        // Minimum length check (if set)
        if (input.getAttribute("minlength")) {
          const minLength = parseInt(input.getAttribute("minlength"));

          if (value.length < minLength) {
            isValid = false;
            showError(input, `Minimum ${minLength} characters required`);
          }
        }
      });

      // If not valid, stop form submission
      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Function to show error
  function showError(input, message) {
    input.style.border = "2px solid red";

    // Remove existing error message
    const existingError = input.parentElement.querySelector(".error-msg");
    if (existingError) {
      existingError.remove();
    }

    // Create error message
    const error = document.createElement("small");
    error.className = "error-msg";
    error.style.color = "red";
    error.innerText = message;

    input.parentElement.appendChild(error);
  }

});