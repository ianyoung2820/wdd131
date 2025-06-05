// form-demo.js

(function() {
  // 1. Cache references to all relevant elements
  const form = document.getElementById('checkoutForm');
  const paymentMethodSelect = document.getElementById('paymentMethod');
  const creditCardSection = document.getElementById('creditCardSection');
  const ccNumberInput = document.getElementById('ccNumber');
  const paypalSection = document.getElementById('paypalSection');
  const paypalInput = document.getElementById('paypalUsername');

  // Error‐message containers
  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const addressError = document.getElementById('addressError');
  const paymentMethodError = document.getElementById('paymentMethodError');
  const ccNumberError = document.getElementById('ccNumberError');
  const paypalUsernameError = document.getElementById('paypalUsernameError');

  // Utility: Show/Hide an element
  function showElement(el) {
    el.classList.remove('hidden');
  }
  function hideElement(el) {
    el.classList.add('hidden');
  }

  // 2. Whenever payment method changes, toggle visibility & required on conditional fields
  paymentMethodSelect.addEventListener('change', () => {
    const choice = paymentMethodSelect.value;

    // Clear any previous error text for payment‐specific fields
    paymentMethodError.textContent = '';
    ccNumberError.textContent = '';
    paypalUsernameError.textContent = '';

    if (choice === 'creditcard') {
      // Show credit card, hide PayPal
      showElement(creditCardSection);
      hideElement(paypalSection);

      // Make CC field required; remove required from PayPal
      ccNumberInput.setAttribute('required', 'required');
      ccNumberInput.setAttribute('aria-required', 'true');
      paypalInput.removeAttribute('required');
      paypalInput.removeAttribute('aria-required');
    }
    else if (choice === 'paypal') {
      // Show PayPal, hide credit card
      showElement(paypalSection);
      hideElement(creditCardSection);

      // Make PayPal field required; remove required from CC
      paypalInput.setAttribute('required', 'required');
      paypalInput.setAttribute('aria-required', 'true');
      ccNumberInput.removeAttribute('required');
      ccNumberInput.removeAttribute('aria-required');
    }
    else {
      // No valid choice (e.g. they re-clicked placeholder): hide both
      hideElement(creditCardSection);
      hideElement(paypalSection);
      ccNumberInput.removeAttribute('required');
      ccNumberInput.removeAttribute('aria-required');
      paypalInput.removeAttribute('required');
      paypalInput.removeAttribute('aria-required');
    }
  });

  // 3. On form submit, perform custom validation and show inline errors
  form.addEventListener('submit', function(event) {
    // Clear all error messages up front
    [
      fullNameError,
      emailError,
      addressError,
      paymentMethodError,
      ccNumberError,
      paypalUsernameError
    ].forEach(el => (el.textContent = ''));

    let formIsValid = true;

    // A) Full Name required
    const fullNameVal = form.fullName.value.trim();
    if (fullNameVal === '') {
      fullNameError.textContent = 'Full Name is required.';
      formIsValid = false;
    }

    // B) Email required & must be valid
    const emailVal = form.email.value.trim();
    if (emailVal === '') {
      emailError.textContent = 'Email is required.';
      formIsValid = false;
    } else if (!form.email.checkValidity()) {
      emailError.textContent = 'Please enter a valid email address.';
      formIsValid = false;
    }

    // C) Address required
    const addressVal = form.address.value.trim();
    if (addressVal === '') {
      addressError.textContent = 'Address is required.';
      formIsValid = false;
    }

    // D) Payment Method required
    const paymentVal = form.paymentMethod.value;
    if (!paymentVal) {
      paymentMethodError.textContent = 'Please select a payment method.';
      formIsValid = false;
    }

    // E) If “Credit Card” chosen → CC # must be non-blank & exactly 16 digits
    if (paymentVal === 'creditcard') {
      const ccVal = ccNumberInput.value.trim();
      if (ccVal === '') {
        ccNumberError.textContent = 'Credit card number is required.';
        formIsValid = false;
      } else {
        const ccPattern = /^\d{16}$/;
        if (!ccPattern.test(ccVal)) {
          ccNumberError.textContent = 'Credit card must be exactly 16 digits.';
          formIsValid = false;
        }
      }
    }

    // F) If “PayPal” chosen → PayPal username must be non-blank
    if (paymentVal === 'paypal') {
      const ppVal = paypalInput.value.trim();
      if (ppVal === '') {
        paypalUsernameError.textContent = 'PayPal username is required.';
        formIsValid = false;
      }
    }

    // If any check failed, block the native submit
    if (!formIsValid) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Otherwise, form will submit naturally to “completed.html”
  });
})();
