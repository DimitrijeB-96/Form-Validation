const emailInput = document.getElementById('email');
const emailError = document.querySelector('.email-error');

const countryInput = document.getElementById('country');
const countryError = document.querySelector('.country-error');

const zipInput = document.getElementById('zip');
const zipError = document.querySelector('.zip-error');

const passwordInput = document.getElementById('password');
const passwordError = document.querySelector('.password-error');

const confirmInput = document.getElementById('confirm');
const confirmError = document.querySelector('.confirm-error');

// If field is blank when click button to submit it should have error messages display "This field is required".
const form = document.getElementById('form');

const btn = document.querySelector('.btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  if (emailInput.value === '') {
    invalidField(emailInput, emailError);
    isValid = false;
  } 

  if (countryInput.value === '') {
    invalidField(countryInput, countryError);
    isValid = false;
  }

  if (zipInput.value === '') {
    invalidField(zipInput, zipError);
    isValid = false;
  }

  if (passwordInput.value === '') {
    invalidField(passwordInput, passwordError);
    isValid = false;
  }
  
  if (confirmInput.value === '' || (confirmInput.value !== passwordInput.value)) {
    invalidField(confirmInput);
    confirmError.textContent = "Password doesn't match.";
    isValid = false;
  }

  if (isValid) {
    formSubmitted();
  }
});

function validField(input, message) {
  const parent = input.parentElement;
  const label = parent.children[1];

  if (label.className === 'not-valid-label') {
    label.classList.remove('not-valid-label');
  }
  
  if (input.className === 'not-valid-input') {
    input.classList.remove('not-valid-input');
  }
  
  message.textContent = '';
}

function invalidField(input, message) {
  const parent = input.parentElement;
  const label = parent.children[1];

  label.classList.add('not-valid-label');
  input.classList.add('not-valid-input');

  if (message) {
    message.textContent = 'This field is required.';
  }
}

function passwordNotMatching() {
  const parent = confirmInput.parentElement;
  const label = parent.children[1];

  confirmInput.classList.add('not-valid-input');
  label.classList.add('not-valid-label');
}

emailInput.addEventListener('input', () => {
  if (emailInput.validity.valid) {
    validField(emailInput, emailError);
  } else if (!emailInput.validity.patternMismatch) {
    emailError.textContent = 'This is not valid email address.';
  } 
});

countryInput.addEventListener('input', () => {
  if (countryInput.validity.valid) {
    validField(countryInput, countryError);
  } else if (countryInput.validity.tooShort) {
    countryError.textContent = `Minimum length is 3 characters, you entered ${countryInput.value.length}.`;
  } else if (countryInput.validity.patternMismatch) {
    countryError.textContent = 'Country name must start with uppercase latter.';
  }
});

zipInput.addEventListener('input', () => {
  if (zipInput.validity.valid) {
    validField(zipInput, zipError);
  } else if (!zipInput.validity.rangeUnderflow) {
    zipError.textContent = 'Zip code has to be 5 digit number';
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.validity.valid) {
    validField(passwordInput, passwordError);
  } else if (!passwordInput.validity.rangeUnderflow && passwordInput.value.length < 8) {
    passwordError.textContent = `Minimum length is 8 characters, you entered ${passwordInput.value.length}`;
  } else if (passwordInput.validity.patternMismatch && passwordInput.value.length >= 8) {
    passwordError.textContent = 'Your password need to contain uppercase latter and number.';
  }
});

confirmInput.addEventListener('input', () => {
  if (passwordInput.value !== confirmInput.value) {
    passwordNotMatching();
    confirmError.textContent = "Password doesn't match.";
  } else {
    validField(confirmInput, confirmError);
  }
});

function formSubmitted() {
  const div = document.createElement('div');
  div.classList.add('congratulation');
  const background = document.createElement('div');
  background.classList.add('black-background');

  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const ok = document.createElement('button');
  ok.classList.add('ok');

  h2.textContent = 'Congratulation';
  p.textContent = 'Your account has been created!';
  ok.textContent = 'OK';

  div.append(h2, p, ok);
  document.body.append(div, background);
}

document.addEventListener('click', (e) => {
  if (e.target.className === 'ok') {
    removeCongratulationWindow();
    clearInputFields();
  }
});

function removeCongratulationWindow() {
  const div = document.querySelector('.congratulation');
  const background = document.querySelector('.black-background');

  div.remove();
  background.remove();
}

function clearInputFields() {
  emailInput.value = '';
  countryInput.value = '';
  zipInput.value = '';
  passwordInput.value = '';
  confirmInput.value = '';
}



