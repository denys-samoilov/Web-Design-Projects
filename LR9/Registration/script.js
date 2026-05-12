const form = document.forms.registrationForm;
const nameInput = form.elements.fNameInput;
const lastNameInput = form.elements.lNameInput;
const emailInput = form.elements.emailInput;
const passwordInput = form.elements.passwordInput;
const confirmPasswordInput = form.elements.confirmPasswordInput;
const phoneInput = form.elements.phoneInput;
const dateOfBirthInput = form.elements.dateOfBirthInput;
const sexInput = form.elements.sexInput;
const countryInput = form.elements.countryInput;
const cityInput = form.elements.cityInput;


const fNameError = document.getElementById('fNameError');
const lNameError = document.getElementById('lNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const phoneError = document.getElementById('phoneError');
const dateOfBirthError = document.getElementById('dateOfBirthError');
const sexError = document.getElementById('sexError');
const countryError = document.getElementById('countryError');
const cityError = document.getElementById('cityError');


const passwordImage = document.getElementById('passwordImage');
const confirmPasswordImage = document.getElementById('confirmPasswordImage');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const submitButton = form.elements.submitButton;

const citiesUkraine = ['Chernivtsi', 'Lviv', 'Odesa'];
const citiesPoland = ['Warsaw', 'Krakow', 'Krakow'];
const citiesCanada = ['Toronto', 'Vancouver', 'Montreal'];

form.addEventListener('input', () => {
    validateForm();
});

togglePassword.addEventListener('click', () => {
    showPassword(passwordInput, passwordImage);
});

toggleConfirmPassword.addEventListener('click', () => {
    showPassword(confirmPasswordInput, confirmPasswordImage);
});

countryInput.addEventListener('change', () => { 
    createCityOptions(countryInput.value);
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validateForm()) {
        alert('Registration successful!');
        form.reset();
    }
});

function validateForm() {
    let isNameValid = validateName(nameInput, fNameError);
    let isLastNameValid = validateName(lastNameInput, lNameError);
    let isEmailValid = validateEmail(emailInput, emailError);
    let isPasswordValid = validatePassword(passwordInput, passwordError);
    let isConfirmPasswordValid = validatePasswordMatch(passwordInput, confirmPasswordInput, confirmPasswordError);
    let isPhoneValid = validatePhone(phoneInput, phoneError);
    let isDateOfBirthValid = validateDateOfBirth(dateOfBirthInput, dateOfBirthError);
    let isSexValid = validateField(sexInput, sexError);
    let isCountryValid = validateField(countryInput, countryError);
    let isCityValid = validateField(cityInput, cityError);
    if (isNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid && isDateOfBirthValid && isSexValid && isCountryValid && isCityValid) {
        return true;
    }
    return false;
}

function validateField(input, errorElement) {
    if (!input.value) {
        changeField(input, false);
        errorElement.textContent = 'This field is required.';
        return false;
    }
    else {
        changeField(input, true);
        errorElement.textContent = '';
        return true;
    }
}

function validateName(nameInput, errorElement) {
    if(nameInput.value.length < 3 || nameInput.value.length > 15) {
        changeField(nameInput, false);
        errorElement.textContent = 'Must be between 3 and 15 characters.';
        return false;
    } else {
        changeField(nameInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function validateEmail(emailInput, errorElement) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value)) {
        changeField(emailInput, false);
        errorElement.textContent = 'Please enter a valid email address.';
        return false;
    }
    else {
        changeField(emailInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function validatePassword(passwordInput, errorElement) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
        changeField(passwordInput, false);
        errorElement.textContent = 'Invalid password.';
        return false;
    }
    else {
        changeField(passwordInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function validatePasswordMatch(passwordInput, confirmPasswordInput, errorElement) {
    if (passwordInput.value !== confirmPasswordInput.value) {
        changeField(confirmPasswordInput, false);
        errorElement.textContent = 'Passwords do not match.';
        return false;
    } else {
        changeField(confirmPasswordInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function validatePhone(phoneInput, errorElement) {
    const phoneRegex = /^\+380?\d{9}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        changeField(phoneInput, false);
        errorElement.textContent = 'Please enter a valid ukrainian phone number.';
        return false;
    }
    else {
        changeField(phoneInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function validateDateOfBirth(dateOfBirthInput, errorElement) {
    const dateOfBirth = new Date(dateOfBirthInput.value);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    if (age < 12 || dateOfBirthInput.value == '') {
        changeField(dateOfBirthInput, false);
        errorElement.textContent = 'You must be at least 12 years old.';
        return false;
    }
    else {        
        changeField(dateOfBirthInput, true);
        errorElement.textContent = '';
        return true;
    }
}

function changeField(input, isValid) {
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }
}

function showPassword(input, image) {
    if (input.type === 'password') {
        input.type = 'text';
        image.src = 'images/opened eye.jpg';
    } else {
        input.type = 'password';
        image.src = 'images/closed eye.jpg';
    }
}

function createCityOptions(country) {
    if (countryInput.value === 'ukraine') {
        cityInput.innerHTML = citiesUkraine.map(city => `<option value="${city}">${city}</option>`).join('');
    } 
    else if (countryInput.value === 'poland') {
        cityInput.innerHTML = citiesPoland.map(city => `<option value="${city}">${city}</option>`).join('');
    }
    else if (countryInput.value === 'canada') {
        cityInput.innerHTML = citiesCanada.map(city => `<option value="${city}">${city}</option>`).join('');
    }
}


createCityOptions(countryInput.value);

