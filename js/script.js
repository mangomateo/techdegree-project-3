
const nameField = document.querySelector('#name');
const jobRoleTitle = document.querySelector('#title');
const jobRoleField = document.querySelector('#other-job-role');
const shirtDesignField = document.querySelector('#design');
const shirtColorField = document.querySelector('#color');
const shirtColorOptions = shirtColorField.children;
const activityOptions = document.querySelector('#activities-box');
const totalCost = document.querySelector('#activities-cost');
let updatedCost = 0;
const paymentMethod = document.querySelector('#payment');
const payment_CreditCard = document.querySelector('#credit-card');
const payment_Paypal = document.querySelector('#paypal');
const payment_Bitcoin = document.querySelector('#bitcoin');

nameField.focus();
paymentMethod.value = payment_CreditCard;

jobRoleField.style.display = 'none';

jobRoleTitle.addEventListener('change', () => {
    jobRoleTitle.value === 'other' ? jobRoleField.style.display = 'inline-block' : jobRoleField.style.display = 'none';
});

shirtColorField.disabled = true;

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
    } else if (e.target.tagName === 'INPUT' && e.target.checked === false) {
        updatedCost -= parseInt(activityCost);
    }
    
    totalCost.innerHTML = `Total: $${ updatedCost }`
});

payment_Bitcoin.style.display = 'none';
payment_Paypal.style.display = 'none';

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

    /* 
    set default behaviour for CC payment
    if bitcoin payment, show bitcoin data and hide everything else
    if paypal payment, show paypal data and hide everything else
    */
});