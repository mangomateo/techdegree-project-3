
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');

const jobRoleTitle = document.querySelector('#title');
const jobRoleField = document.querySelector('#other-job-role');

const shirtDesignField = document.querySelector('#design');
const shirtColorField = document.querySelector('#color');
const shirtColorOptions = shirtColorField.children;

const activityOptions = document.querySelector('#activities-box');
const dayActivity = activityOptions.children;
const activityCheckboxes = document.querySelectorAll('label > input[type="checkbox"]');
const totalCost = document.querySelector('#activities-cost');
let updatedCost = 0;
let totalActivities = 0;

const paymentMethod = document.querySelector('#payment');
const payment_CreditCard = document.querySelector('#credit-card');
const creditCardNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

const payment_Paypal = document.querySelector('#paypal');
const payment_Bitcoin = document.querySelector('#bitcoin');

const nameValidator = name => {
    const nameRegex = /^([a-z]|[A-Z])* ?([a-z]|[A-Z])*? ?([a-z]|[A-Z])*?$/;
    return nameRegex.test(name);
};

const emailValidator = email => {
    const emailRegex = /^[^@]+@[^@]+\.com$/;
    return emailRegex.test(email);
};

const activitiesValidator = activitiesChecked => activitiesChecked >= 1;

const creditCardValidator = ccNumber => {
    const ccNumRegex = /^\d{13,16}$/;
    return ccNumRegex.test(ccNumber);
}

const zipCodeValidator = zip => {
    const zipCodeRegex = /^\d{5}$/;
    return zipCodeRegex.test(zip);
}

const cvvValidator = cvv => {
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
}


// Set default form values when the page loads
nameField.focus();
jobRoleField.style.display = 'none';
shirtColorField.disabled = true;
paymentMethod.selectedIndex = 1;
payment_Bitcoin.style.display = 'none';
payment_Paypal.style.display = 'none';


jobRoleTitle.addEventListener('change', () => {
    jobRoleTitle.value === 'other' ? jobRoleField.style.display = 'inline-block' : jobRoleField.style.display = 'none';
});


// Listen for any changes to the T-Shirt design field, and update color choices accordingly
shirtDesignField.addEventListener('change', () => {
    shirtColorField.disabled = false;
    

    // Check for which value was selected and set or remove the hidden attribute on color options accordingly
    if (shirtDesignField.value === 'js puns') {
        shirtColorOptions[0].setAttribute('hidden', true);
        for (let i = 1; i < shirtColorOptions.length; i++) {
            if (shirtColorOptions[i].getAttribute('data-theme') === 'heart js') {
                shirtColorOptions[i].setAttribute('hidden', true);
            } else {
                shirtColorOptions[i].removeAttribute('hidden');
            }
        }
        shirtColorField.selectedIndex = 1;

    } else if (shirtDesignField.value === 'heart js') {
        shirtColorOptions[0].setAttribute('hidden', true);
        for (let i = 1; i < shirtColorOptions.length; i++) {
            if (shirtColorOptions[i].getAttribute('data-theme') === 'js puns') {
                shirtColorOptions[i].setAttribute('hidden', true);
            } else {
                shirtColorOptions[i].removeAttribute('hidden');
            }
        }
        shirtColorField.selectedIndex = 4;
    }
});


// Check for what activities have been selected and disable conflicting activities
// Update totalCost based on activities that have been selected
activityOptions.addEventListener('change', e => {
    let activityCost = e.target.getAttribute('data-cost');
    let selectionDate = e.target.dataset.dayAndTime;
    let selectionName = e.target.name;
    
    if (e.target.tagName === 'INPUT' && e.target.checked === true) {
        for (let i = 0; i < dayActivity.length; i++) {
            if (selectionDate === dayActivity[i].firstElementChild.dataset.dayAndTime &&
                selectionName !== dayActivity[i].firstElementChild.name) {
                    dayActivity[i].classList.add('disabled');
                    dayActivity[i].firstElementChild.disabled = true;
             }
        }; 
        updatedCost += parseInt(activityCost);
        totalActivities++;
    } else if (e.target.tagName === 'INPUT' && e.target.checked === false) {
        for (let i = 0; i < dayActivity.length; i++) {
            if (selectionDate === dayActivity[i].firstElementChild.dataset.dayAndTime &&
                selectionName !== dayActivity[i].firstElementChild.name) {
                    dayActivity[i].classList.remove('disabled');
                    dayActivity[i].firstElementChild.disabled = false;
             }
        }; 
        updatedCost -= parseInt(activityCost);
        totalActivities--;
    }
    
    totalCost.innerHTML = `Total: $${ updatedCost }`
});



// Listen for changes to the payment method selection, and display the corresponding information
paymentMethod.addEventListener('change', () => {
    if (paymentMethod.value === 'paypal') {
        payment_CreditCard.style.display = 'none';
        payment_Paypal.style.display = 'block';
        payment_Bitcoin.style.display = 'none';
    } else if (paymentMethod.value === 'bitcoin') {
        payment_CreditCard.style.display = 'none';
        payment_Paypal.style.display = 'none';
        payment_Bitcoin.style.display = 'block';
    } else {
        payment_CreditCard.style.display = 'block';
        payment_Paypal.style.display = 'none';
        payment_Bitcoin.style.display = 'none';
    }
});


// Real-time validation for the name field 
nameField.addEventListener('keyup', e => {
    if (!nameValidator(nameField.value) || nameField.value === '') {
        e.preventDefault();
        nameField.parentNode.classList.add('not-valid');
        nameField.parentNode.classList.remove('valid');
        nameField.nextElementSibling.style.display = "block";
    } else {
        nameField.parentNode.classList.add('valid');
        nameField.parentNode.classList.remove('not-valid');
        nameField.nextElementSibling.style.display = "none";
    }
});


// Validate that the form has all the required information, and in the correct format
form.addEventListener('submit', e => {
    if (!emailValidator(emailField.value)) {
        e.preventDefault();
        emailField.parentNode.classList.add('not-valid');
        emailField.parentNode.classList.remove('valid');
        emailField.nextElementSibling.style.display = "block";
    } else {
        emailField.parentNode.classList.add('valid');
        emailField.parentNode.classList.remove('not-valid');
        emailField.nextElementSibling.style.display = "none";
    }
    
    if (!activitiesValidator(totalActivities)) {
        e.preventDefault();
        activityOptions.parentNode.classList.add('not-valid');
        activityOptions.parentNode.classList.remove('valid');
        document.querySelector('#activities-hint').style.display = "block";
    } else {
        activityOptions.parentNode.classList.add('valid');
        activityOptions.parentNode.classList.remove('not-valid');
        document.querySelector('#activities-hint').style.display = "none";
    } 

    if (paymentMethod.value === 'credit-card' && !creditCardValidator(creditCardNum.value)) {
        e.preventDefault();
        creditCardNum.parentNode.classList.add('not-valid');
        creditCardNum.parentNode.classList.remove('valid');
        creditCardNum.nextElementSibling.style.display = "block";
    } else {
        creditCardNum.parentNode.classList.add('valid');
        creditCardNum.parentNode.classList.remove('not-valid');
        creditCardNum.nextElementSibling.style.display = "none";        
    } 
    
    if (paymentMethod.value === 'credit-card' && !zipCodeValidator(zipCode.value)) {
        e.preventDefault();
        zipCode.parentNode.classList.add('not-valid');
        zipCode.parentNode.classList.remove('valid');
        zipCode.nextElementSibling.style.display = "block";
    } else {
        zipCode.parentNode.classList.add('valid');
        zipCode.parentNode.classList.remove('not-valid');
        zipCode.nextElementSibling.style.display = "none";
    } 
    
    if (paymentMethod.value === 'credit-card' && !cvvValidator(cvv.value)) {
        e.preventDefault();
        cvv.parentNode.classList.add('not-valid');
        cvv.parentNode.classList.remove('valid');
        cvv.nextElementSibling.style.display = "block";
    } else {
        cvv.parentNode.classList.add('valid');
        cvv.parentNode.classList.remove('not-valid');
        cvv.nextElementSibling.style.display = "none";
    }
});


// Event listeners to add more visible focus classes to activity checkboxes
for (let i = 0; i < activityCheckboxes.length; i++) {
    activityCheckboxes[i].addEventListener('focus', e => {
        if (e.target.tagName === 'INPUT') {
            e.target.parentNode.classList.add('focus');
        }
    });
    activityCheckboxes[i].addEventListener('blur', e => {
        if (e.target.tagName === 'INPUT') {
            e.target.parentNode.classList.remove('focus');
        }
    });
}