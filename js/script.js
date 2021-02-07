
const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');

const jobRoleTitle = document.querySelector('#title');
const jobRoleField = document.querySelector('#other-job-role');

const shirtDesignField = document.querySelector('#design');
const shirtColorField = document.querySelector('#color');
const shirtColorOptions = shirtColorField.children;

const activityOptions = document.querySelector('#activities-box');
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
    const nameRegex = /^([a-z]|[A-Z])+ ?([a-z]|[A-Z])+? ?([a-z]|[A-Z])+?$/;
    return nameRegex.test(name);
};

const emailValidator = email => {
    const emailRegex = /^[^@]+@[^@]+\.com$/;
    return emailRegex.test(email);
};

const activitiesValidator = activitiesChecked => activitiesChecked >= 1;

const creditCardValidator = ccNumber => {
    const ccNumRegex = /\d{13,16}/;
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



nameField.focus();
jobRoleField.style.display = 'none';
shirtColorField.disabled = true;
paymentMethod.value = payment_CreditCard;
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
    } else if (shirtDesignField.value === 'heart js') {
        shirtColorOptions[0].setAttribute('hidden', true);
        for (let i = 1; i < shirtColorOptions.length; i++) {
            if (shirtColorOptions[i].getAttribute('data-theme') === 'js puns') {
                shirtColorOptions[i].setAttribute('hidden', true);
            } else {
                shirtColorOptions[i].removeAttribute('hidden');
            }
        }
    }
    shirtColorField.value = shirtColorOptions[0];
});


// Update totalCost based on activities that have been selected
activityOptions.addEventListener('change', e => {
    let activityCost = e.target.getAttribute('data-cost');
    
    if (e.target.tagName === 'INPUT' && e.target.checked === true) {
        updatedCost += parseInt(activityCost);
        totalActivities++;
    } else if (e.target.tagName === 'INPUT' && e.target.checked === false) {
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

// Validate that the form has all the required information, and in the correct format
form.addEventListener('submit', e => {
    if (!nameValidator(nameField.value)) {
        e.preventDefault();
        console.log('Invalid name entry. Please try again.');
    } else if (!emailValidator(emailField.value)) {
        e.preventDefault();
        console.log('Invalid email entry. Please try again.');
    } else if (!activitiesValidator(totalActivities)) {
        e.preventDefault();
        console.log('Please select AT LEAST one activity.');
    } else if (paymentMethod.value === '') {
        e.preventDefault();
        console.log('Please select a payment method.');
    } else if (paymentMethod.value === 'credit-card' && !creditCardValidator(creditCardNum.value)) {
        e.preventDefault();
        console.log('Please enter a valid credit card number.');
    } else if (paymentMethod.value === 'credit-card' && !zipCodeValidator(zipCode.value)) {
        e.preventDefault();
        console.log('Please enter a valid zip code.');
    } else if (paymentMethod.value === 'credit-card' && !cvvValidator(cvv.value)) {
        e.preventDefault();
        console.log('Please enter a valid CVV.');
    }

/* NEED TO ADD FUNCTIONALITY FOR CHECKING VALID EXPIRY DATE ON CREDIT CARD */    
    
});







       
// e.preventDefault();
// console.log('Please enter a valid credit card number.');
// } else if (!zipCodeValidator(zipCode.value)) {
// e.preventDefault();
// console.log('Please enter a valid zipcode.');
// }